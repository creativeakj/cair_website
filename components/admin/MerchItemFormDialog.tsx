"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/admin/FileUpload";
import { merchItemSchema, type MerchItemFormValues } from "@/lib/validation/merch-item";
import { createMerchItemAction, updateMerchItemAction } from "@/app/admin/(dashboard)/merch/actions";
import type { MerchItemDTO } from "@/lib/services/merch";

const EMPTY: MerchItemFormValues = {
  slug: "",
  name: "",
  category: "",
  description: "",
  image_url: [],
  is_available: true,
  display_order: 0,
};

export function MerchItemFormDialog({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: MerchItemDTO | null;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<MerchItemFormValues>({
    resolver: zodResolver(merchItemSchema),
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (open) {
      form.reset(
        item
          ? {
              slug: item.slug,
              name: item.name,
              category: item.category,
              description: item.description,
              image_url: item.image_url,
              is_available: item.is_available,
              display_order: item.display_order,
            }
          : EMPTY,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  async function onSubmit(values: MerchItemFormValues) {
    setSubmitting(true);
    try {
      if (item) {
        await updateMerchItemAction(item.id, values);
        toast.success("Merch item updated");
      } else {
        await createMerchItemAction(values);
        toast.success("Merch item created");
      }
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save merch item");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Merch Item" : "New Merch Item"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Apparel · Polo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((url) => (
                      <div key={url} className="flex items-center gap-2 rounded-sm border border-border px-2 py-1 text-xs">
                        <span className="max-w-[10rem] truncate">{url.split("/").pop()}</span>
                        <button
                          type="button"
                          onClick={() => field.onChange(field.value.filter((u) => u !== url))}
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormControl>
                    <FileUpload
                      folder="merch-images"
                      accept="image/*"
                      label="Add image"
                      onUploaded={(url) => field.onChange([...field.value, url])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display order</FormLabel>
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
              <FormField
                control={form.control}
                name="is_available"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-sm border border-border p-3">
                    <FormLabel className="!m-0">Available</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={submitting} className="mt-2">
              {submitting ? "Saving…" : item ? "Save changes" : "Create merch item"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
