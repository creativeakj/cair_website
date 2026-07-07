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
import { NewsArticleFormDialog } from "@/components/admin/NewsArticleFormDialog";
import { deleteNewsArticleAction, notifyNewsSubscribersAction } from "@/app/admin/(dashboard)/news/actions";
import type { NewsArticleDTO } from "@/lib/services/news";
import type { TeamMemberDTO } from "@/lib/services/team";

export function NewsAdminClient({
  articles,
  teamMembers,
}: {
  articles: NewsArticleDTO[];
  teamMembers: TeamMemberDTO[];
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<NewsArticleDTO | null>(null);
  const [deleting, setDeleting] = useState<NewsArticleDTO | null>(null);
  const [notifying, setNotifying] = useState<NewsArticleDTO | null>(null);
  const [sending, setSending] = useState(false);

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteNewsArticleAction(deleting.id);
      toast.success("Article deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete article");
    } finally {
      setDeleting(null);
    }
  }

  async function confirmNotify() {
    if (!notifying) return;
    setSending(true);
    try {
      const count = await notifyNewsSubscribersAction(notifying.id);
      toast.success(count > 0 ? `Notified ${count} subscriber${count === 1 ? "" : "s"}` : "No active subscribers to notify");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send notification");
    } finally {
      setSending(false);
      setNotifying(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-[var(--forest-deep)]">News</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          New Article
        </Button>
      </div>

      <div className="rounded-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{a.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={a.status === "published" ? "default" : "secondary"}>{a.status}</Badge>
                </TableCell>
                <TableCell>{a.is_featured ? "Yes" : "—"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditing(a);
                      setFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setNotifying(a)}>
                    Notify
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleting(a)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {articles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No articles yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <NewsArticleFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        article={editing}
        teamMembers={teamMembers}
      />

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{deleting?.title}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!notifying} onOpenChange={(open) => !open && setNotifying(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Notify subscribers about &ldquo;{notifying?.title}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              This emails every active subscriber right away. It can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNotify} disabled={sending}>
              {sending ? "Sending…" : "Send notification"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
