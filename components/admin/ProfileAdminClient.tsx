"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  adminProfileSchema,
  adminPasswordSchema,
  type AdminProfileFormValues,
  type AdminPasswordFormValues,
} from "@/lib/validation/admin-user";
import { updateProfileAction, changePasswordAction } from "@/app/admin/(dashboard)/profile/actions";
import type { AdminUserDTO } from "@/lib/services/admin-users";

function reauth(message: string) {
  toast.success(message);
  signOut({ callbackUrl: "/admin/login" });
}

function ProfileForm({ admin }: { admin: AdminUserDTO }) {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<AdminProfileFormValues>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: { name: admin.name, email: admin.email },
  });

  async function onSubmit(values: AdminProfileFormValues) {
    setSubmitting(true);
    try {
      await updateProfileAction(values);
      reauth("Profile updated. Please sign in again.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update profile");
      setSubmitting(false);
    }
  }

  return (
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
        <Button type="submit" disabled={submitting} className="mt-2 w-fit">
          {submitting ? "Saving…" : "Save profile"}
        </Button>
      </form>
    </Form>
  );
}

function PasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<AdminPasswordFormValues>({
    resolver: zodResolver(adminPasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: AdminPasswordFormValues) {
    setSubmitting(true);
    try {
      await changePasswordAction(values);
      reauth("Password updated. Please sign in again.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting} className="mt-2 w-fit">
          {submitting ? "Updating…" : "Change password"}
        </Button>
      </form>
    </Form>
  );
}

export function ProfileAdminClient({ admin }: { admin: AdminUserDTO }) {
  return (
    <div className="grid max-w-2xl gap-6">
      <h1 className="font-display text-2xl text-[var(--forest-deep)]">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1 text-sm text-foreground/80">
          <div>
            <span className="text-muted-foreground">Name:</span> {admin.name}
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span> {admin.email}
          </div>
          <div>
            <span className="text-muted-foreground">Admin since:</span>{" "}
            {new Date(admin.created_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Update profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm admin={admin} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
