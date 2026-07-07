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
import { deleteSubscriberAction } from "@/app/admin/(dashboard)/subscribers/actions";
import type { SubscriberDTO } from "@/lib/services/subscribers";

export function SubscribersAdminClient({ subscribers }: { subscribers: SubscriberDTO[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<SubscriberDTO | null>(null);

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteSubscriberAction(deleting.id);
      toast.success("Subscriber removed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove subscriber");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-[var(--forest-deep)]">Subscribers</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{subscribers.length} total</span>
          <Button asChild variant="outline" size="sm">
            <a href="/api/admin/subscribers/export" download>
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.email}</TableCell>
                <TableCell>{s.source}</TableCell>
                <TableCell>{new Date(s.subscribed_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={s.status === "active" ? "default" : "secondary"}>{s.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setDeleting(s)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {subscribers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No subscribers yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove &ldquo;{deleting?.email}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
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
