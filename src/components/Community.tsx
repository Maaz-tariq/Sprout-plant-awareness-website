import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UploadForm } from "./community/UploadForm";
import { PostGallery } from "./community/PostGallery";
import { ShoutoutsSection } from "./community/ShoutoutsSection";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const Community = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
            Community Green Actions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your journey of making the planet greener. Upload photos of your tree plantings,
            garden projects, and environmental initiatives.
          </p>
        </div>

        {user ? (
          <div className="flex justify-end mb-6">
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="text-center mb-12">
            <Button onClick={() => navigate("/auth")} variant="hero" size="lg">
              Join the Community
            </Button>
          </div>
        )}

        <ShoutoutsSection key={`shoutouts-${refreshTrigger}`} />

        {user && <UploadForm onPostCreated={handlePostCreated} />}

        <PostGallery key={`gallery-${refreshTrigger}`} currentUserId={user?.id} />
      </div>
    </section>
  );
};
