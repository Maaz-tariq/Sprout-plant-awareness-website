import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostCard } from "./PostCard";
import { Loader2 } from "lucide-react";

interface Post {
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
}

interface PostGalleryProps {
  currentUserId?: string;
}

export const PostGallery = ({ currentUserId }: PostGalleryProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:user_id (username, avatar_url),
          likes (id, user_id),
          comments (
            id,
            content,
            created_at,
            profiles:user_id (username)
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No posts yet. Be the first to share your green action!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onUpdate={fetchPosts}
        />
      ))}
    </div>
  );
};
