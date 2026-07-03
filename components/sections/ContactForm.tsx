"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  org: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", org: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.org ? `${values.name} (${values.org})` : values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          source_page: "/contact",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong");
      }
      toast.success("Thank you. The Executive Secretariat will be in touch.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your message");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]">
                  Full name
                </FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none border-border bg-background focus-visible:ring-[var(--gold)]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]">
                  Organization
                </FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none border-border bg-background focus-visible:ring-[var(--gold)]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]">
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} className="rounded-none border-border bg-background focus-visible:ring-[var(--gold)]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]">
                Subject
              </FormLabel>
              <FormControl>
                <Input {...field} className="rounded-none border-border bg-background focus-visible:ring-[var(--gold)]" />
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
              <FormLabel className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]">
                Message
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} className="rounded-none border-border bg-background focus-visible:ring-[var(--gold)]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={submitting}
          className="justify-self-start rounded-sm bg-[var(--forest)] px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--primary-foreground)] hover:bg-[var(--forest-deep)]"
        >
          {submitting ? "Sending…" : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
}
