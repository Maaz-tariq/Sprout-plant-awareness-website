import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Heart } from "lucide-react";
import { Loader2 } from "lucide-react";

interface TopPost {
  id: string;
  image_url: string;
  message: string;
  profiles: {
    username: string;
  };
  likes_count: number;
}

export const ShoutoutsSection = () => {
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopPosts();
  }, []);

  const fetchTopPosts = async () => {
    try {
      // Fetch posts with their likes count
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          image_url,
          message,
          profiles:user_id (username),
          likes (id)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate likes count and sort
      const postsWithLikesCount = (data || []).map((post) => ({
        ...post,
        likes_count: post.likes?.length || 0,
      }));

      // Sort by likes count and take top 5
      const sorted = postsWithLikesCount
        .sort((a, b) => b.likes_count - a.likes_count)
        .slice(0, 5);

      setTopPosts(sorted);
    } catch (error) {
      console.error("Error fetching top posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (topPosts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="w-8 h-8 text-primary" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Shoutouts of the Week
          </h3>
        </div>
        <p className="text-muted-foreground">
          Celebrating our most inspiring community members
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topPosts.map((post, index) => (
          <Card
            key={post.id}
            className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={post.image_url}
                alt={post.message}
                className="w-full aspect-square object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                #{index + 1}
              </Badge>
            </div>
            <CardContent className="p-3">
              <p className="font-semibold text-sm mb-1 truncate">{post.profiles.username}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.message}</p>
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-xs font-semibold">{post.likes_count}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
