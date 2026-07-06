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
import { publicationSchema, type PublicationFormValues } from "@/lib/validation/publication";
import { createPublicationAction, updatePublicationAction } from "@/app/admin/(dashboard)/publications/actions";
import type { PublicationDTO } from "@/lib/services/publications";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["Policy", "Research", "Report", "Data", "Other"] as const;

export function PublicationFormDialog({
  open,
  onOpenChange,
  publication,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication?: PublicationDTO | null;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      slug: "",
      title: "",
      summary: "",
      abstract: "",
      authors: [],
      category: "Research",
      file_url: "",
      cover_image_url: "",
      published_date: "",
      year: 0,
      is_featured: false,
    },
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
      setSlugTouched(!!publication);
      form.reset(
        publication
          ? {
              slug: publication.slug,
              title: publication.title,
              summary: publication.summary,
              abstract: publication.abstract,
              authors: publication.authors,
              category: publication.category,
              file_url: publication.file_url,
              cover_image_url: publication.cover_image_url ?? "",
              published_date: publication.published_date.slice(0, 10),
              year: publication.year,
              is_featured: publication.is_featured,
            }
          : {
              slug: "",
              title: "",
              summary: "",
              abstract: "",
              authors: [],
              category: "Research",
              file_url: "",
              cover_image_url: "",
              published_date: new Date().toISOString().slice(0, 10),
              year: new Date().getFullYear(),
              is_featured: false,
            },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, publication]);

  async function onSubmit(values: PublicationFormValues) {
    setSubmitting(true);
    try {
      if (publication) {
        await updatePublicationAction(publication.id, values);
        toast.success("Publication updated");
      } else {
        await createPublicationAction(values);
        toast.success("Publication created");
      }
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save publication");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{publication ? "Edit Publication" : "New Publication"}</DialogTitle>
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
                        placeholder="my-publication-slug"
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
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abstract</FormLabel>
                  <FormControl>
                    <RichTextEditor value={field.value} onChange={field.onChange} uploadFolder="publication-covers" placeholder="Write the abstract…" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authors (comma-separated)</FormLabel>
                  <FormControl>
                    <TagsInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="file_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PDF File</FormLabel>
                  <FormControl>
                    <FileUpload
                      folder="publication-files"
                      accept="application/pdf"
                      label="Upload PDF"
                      value={field.value}
                      onUploaded={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image (optional)</FormLabel>
                  <FormControl>
                    <FileUpload
                      folder="publication-covers"
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

            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-sm border border-border p-3">
                  <FormLabel className="!m-0">Featured on /publications</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting} className="mt-2">
              {submitting ? "Saving…" : publication ? "Save changes" : "Create publication"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
