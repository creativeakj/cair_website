"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  markMerchEnquiryReadAction,
  deleteMerchEnquiryAction,
} from "@/app/admin/(dashboard)/merch-enquiries/actions";
import type { MerchEnquiryDTO } from "@/lib/services/merch-enquiries";

export function MerchEnquiriesAdminClient({ enquiries }: { enquiries: MerchEnquiryDTO[] }) {
  const router = useRouter();
  const [viewing, setViewing] = useState<MerchEnquiryDTO | null>(null);
  const [deleting, setDeleting] = useState<MerchEnquiryDTO | null>(null);

  async function openEnquiry(enquiry: MerchEnquiryDTO) {
    setViewing(enquiry);
    if (!enquiry.is_read) {
      await markMerchEnquiryReadAction(enquiry.id, true);
      router.refresh();
    }
  }

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteMerchEnquiryAction(deleting.id);
      toast.success("Enquiry deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete enquiry");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-[var(--forest-deep)]">Merch Enquiries</h1>

      <div className="rounded-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">
                  {e.name}
                  <div className="text-xs text-muted-foreground">{e.email}</div>
                </TableCell>
                <TableCell>{e.product_name}</TableCell>
                <TableCell>{new Date(e.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={e.is_read ? "secondary" : "default"}>{e.is_read ? "Read" : "New"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEnquiry(e)}>
                    View
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleting(e)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {enquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No merch enquiries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.product_name}</DialogTitle>
            <DialogDescription>
              From {viewing?.name} ({viewing?.email})
            </DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm text-foreground/80">
            {viewing?.message || "No message provided."}
          </p>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this enquiry?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
