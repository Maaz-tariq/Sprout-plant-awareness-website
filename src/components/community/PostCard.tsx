import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { CommentsSection } from "./CommentsSection";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
    id: string;
    user_id: string;
    image_url: string;
    message: string;
    created_at: string;
    profiles: {
      username: string;
      avatar_url: string | null;
    };
    likes: { id: string; user_id: string }[];
    comments: {
      id: string;
      content: string;
      created_at: string;
      profiles: {
        username: string;
      };
    }[];
  };
  currentUserId?: string;
  onUpdate: () => void;
}

export const PostCard = ({ post, currentUserId, onUpdate }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

  const hasLiked = post.likes.some((like) => like.user_id === currentUserId);
  const likesCount = post.likes.length;
  const commentsCount = post.comments.length;

  const handleLike = async () => {
    if (!currentUserId) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts",
        variant: "destructive",
      });
      return;
    }

    try {
      if (hasLiked) {
        // Unlike
        const likeToDelete = post.likes.find((like) => like.user_id === currentUserId);
        if (likeToDelete) {
          const { error } = await supabase.from("likes").delete().eq("id", likeToDelete.id);
          if (error) throw error;
        }
      } else {
        // Like
        const { error } = await supabase.from("likes").insert({
          user_id: currentUserId,
          post_id: post.id,
        });
        if (error) throw error;
      }
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) throw error;
      
      toast({
        title: "Post deleted",
        description: "Your post has been removed",
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-primary/10">
      <div className="relative aspect-square">
        <img
          src={post.image_url}
          alt={post.message}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary/20 text-primary">
              {post.profiles.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{post.profiles.username}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
          {currentUserId === post.user_id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-foreground">{post.message}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-0">
        <div className="flex items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={hasLiked ? "text-red-500 hover:text-red-600" : ""}
          >
            <Heart className={`w-5 h-5 mr-1 ${hasLiked ? "fill-current" : ""}`} />
            {likesCount}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="w-5 h-5 mr-1" />
            {commentsCount}
          </Button>
        </div>
        {showComments && (
          <CommentsSection
            postId={post.id}
            comments={post.comments}
            currentUserId={currentUserId}
            onUpdate={onUpdate}
          />
        )}
      </CardFooter>
    </Card>
  );
};
