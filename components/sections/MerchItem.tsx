"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export type MerchItemData = {
  slug: string;
  name: string;
  category: string;
  image: string;
};

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().optional(),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

export function MerchItem({ item }: { item: MerchItemData }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: EnquiryValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/merch/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_slug: item.slug,
          product_name: item.name,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Something went wrong");
      toast.success("Enquiry sent. The merch team will follow up by email.");
      form.reset();
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your enquiry");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="group relative w-full overflow-hidden rounded-sm border border-border bg-[var(--secondary)] text-left">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div className="absolute left-3 top-3 rounded-full bg-[var(--forest-deep)]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
              {item.category.split(" · ").at(-1)}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border bg-background px-5 py-4">
            <div>
              <div className="font-display text-lg text-[var(--forest-deep)]">{item.name}</div>
              <div className="mt-0.5 text-xs uppercase tracking-[0.16em] text-foreground/55">{item.category}</div>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">Enquire</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enquire — {item.name}</DialogTitle>
          <DialogDescription>
            Tell us how many you need and we&apos;ll follow up with pricing and sizing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Quantity, sizes, chapter/event…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send enquiry"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
