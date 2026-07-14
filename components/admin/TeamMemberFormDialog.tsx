"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/admin/FileUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { teamMemberSchema, type TeamMemberFormValues } from "@/lib/validation/team-member";
import { createTeamMemberAction, updateTeamMemberAction } from "@/app/admin/(dashboard)/team/actions";
import type { TeamMemberDTO } from "@/lib/services/team";
import { slugify } from "@/lib/utils";

const EMPTY: TeamMemberFormValues = {
  slug: "",
  name: "",
  title: "",
  department: "",
  bio: "",
  photo_url: "",
  display_order: 0,
  is_active: true,
};

export function TeamMemberFormDialog({
  open,
  onOpenChange,
  member,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: TeamMemberDTO | null;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: EMPTY,
  });

  const nameValue = form.watch("name");
  useEffect(() => {
    if (!slugTouched) {
      form.setValue("slug", slugify(nameValue || ""), { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue, slugTouched]);

  useEffect(() => {
    if (open) {
      setSlugTouched(!!member);
      form.reset(
        member
          ? {
              slug: member.slug,
              name: member.name,
              title: member.title,
              department: member.department,
              bio: member.bio,
              photo_url: member.photo_url ?? "",
              display_order: member.display_order,
              is_active: member.is_active,
            }
          : EMPTY,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, member]);

  async function onSubmit(values: TeamMemberFormValues) {
    setSubmitting(true);
    try {
      if (member) {
        await updateTeamMemberAction(member.id, values);
        toast.success("Team member updated");
      } else {
        await createTeamMemberAction(values);
        toast.success("Team member created");
      }
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save team member");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Team Member" : "New Team Member"}</DialogTitle>
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
                      <Input
                        {...field}
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title / Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Executive / TUM Collaboration / Advisory Council" />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      &quot;Executive&quot; shows under Founding Leadership, &quot;TUM Collaboration&quot; shows under
                      Officers of the Collaboration, anything else shows under Advisors &amp; Fellows.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      uploadFolder="team-bios"
                      placeholder="Write their bio…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo (optional)</FormLabel>
                  <FormControl>
                    <FileUpload
                      folder="team-photos"
                      accept="image/*"
                      label="Upload Photo"
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
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-sm border border-border p-3">
                    <FormLabel className="!m-0">Active</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={submitting} className="mt-2">
              {submitting ? "Saving…" : member ? "Save changes" : "Create team member"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
