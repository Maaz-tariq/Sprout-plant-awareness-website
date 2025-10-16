import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  currentUserId?: string;
  onUpdate: () => void;
}

export const CommentsSection = ({
  postId,
  comments,
  currentUserId,
  onUpdate,
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("comments").insert({
        user_id: currentUserId,
        post_id: postId,
        content: newComment.trim(),
      });

      if (error) throw error;

      setNewComment("");
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-3 border-t pt-3">
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-secondary/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">{comment.profiles.username}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      {currentUserId && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            maxLength={300}
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={submitting || !newComment.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
};
