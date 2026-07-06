"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/admin/FileUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { TagsInput } from "@/components/admin/TagsInput";
import { newsArticleSchema, type NewsArticleFormValues } from "@/lib/validation/news-article";
import { createNewsArticleAction, updateNewsArticleAction } from "@/app/admin/(dashboard)/news/actions";
import type { NewsArticleDTO } from "@/lib/services/news";
import type { TeamMemberDTO } from "@/lib/services/team";
import { slugify } from "@/lib/utils";

const EMPTY: NewsArticleFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  body_html: "",
  featured_image_url: "",
  author_id: "",
  category: "",
  tags: [],
  status: "draft",
  is_featured: false,
};

export function NewsArticleFormDialog({
  open,
  onOpenChange,
  article,
  teamMembers,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: NewsArticleDTO | null;
  teamMembers: TeamMemberDTO[];
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const form = useForm<NewsArticleFormValues>({
    resolver: zodResolver(newsArticleSchema),
    defaultValues: EMPTY,
  });

  const titleValue = form.watch("title");
  useEffect(() => {
    if (!slugTouched) {
      form.setValue("slug", slugify(titleValue || ""), { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, slugTouched]);

  useEffect(() => {
    if (open) {
      setSlugTouched(!!article);
      form.reset(
        article
          ? {
              slug: article.slug,
              title: article.title,
              excerpt: article.excerpt,
              body_html: article.body_html,
              featured_image_url: article.featured_image_url ?? "",
              author_id: article.author_id ?? "",
              category: article.category,
              tags: article.tags,
              status: article.status,
              is_featured: article.is_featured,
            }
          : EMPTY,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, article]);

  async function onSubmit(values: NewsArticleFormValues) {
    setSubmitting(true);
    try {
      if (article) {
        await updateNewsArticleAction(article.id, values);
        toast.success("Article updated");
      } else {
        await createNewsArticleAction(values);
        toast.success("Article created");
      }
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save article");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? "Edit Article" : "New Article"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="my-article-slug"
                        onChange={(e) => {
                          setSlugTouched(true);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body_html"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <RichTextEditor value={field.value} onChange={field.onChange} uploadFolder="news-images" placeholder="Write the article…" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Announcements" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <Select value={field.value || undefined} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teamMembers.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <TagsInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      folder="news-images"
                      accept="image/*"
                      label="Upload Image"
                      value={field.value}
                      onUploaded={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-sm border border-border p-3">
                    <FormLabel className="!m-0">Featured / pinned</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={submitting} className="mt-2">
              {submitting ? "Saving…" : article ? "Save changes" : "Create article"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
