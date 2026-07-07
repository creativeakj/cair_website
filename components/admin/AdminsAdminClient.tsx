"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog";
import { deleteAdminAction } from "@/app/admin/(dashboard)/admins/actions";
import type { AdminUserDTO } from "@/lib/services/admin-users";

export function AdminsAdminClient({
  admins,
  currentAdminId,
}: {
  admins: AdminUserDTO[];
  currentAdminId: string;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<AdminUserDTO | null>(null);

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteAdminAction(deleting.id);
      toast.success("Admin removed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove admin");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-[var(--forest-deep)]">Admins</h1>
        <Button onClick={() => setCreating(true)}>Add admin</Button>
      </div>

      <div className="rounded-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">
                  {a.name}
                  {a.id === currentAdminId && (
                    <Badge variant="secondary" className="ml-2">
                      You
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{new Date(a.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={a.id === currentAdminId}
                    title={a.id === currentAdminId ? "You cannot remove your own account" : undefined}
                    onClick={() => setDeleting(a)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminFormDialog open={creating} onOpenChange={setCreating} />

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deleting?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              They will immediately lose access to the admin panel. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
