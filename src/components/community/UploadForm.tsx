import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadFormProps {
  onPostCreated: () => void;
}

export const UploadForm = ({ onPostCreated }: UploadFormProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please add both an image and a message",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload image to storage
      const fileExt = image.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(fileName);

      // Create post
      const { error: postError } = await supabase.from("posts").insert({
        user_id: user.id,
        image_url: publicUrl,
        message: message.trim(),
      });

      if (postError) throw postError;

      toast({
        title: "Post created!",
        description: "Your green action has been shared with the community.",
      });

      // Reset form
      setMessage("");
      setImage(null);
      setImagePreview("");
      onPostCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="mb-12 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Share Your Green Action
        </CardTitle>
        <CardDescription>
          Upload a photo and tell us about your contribution to a greener planet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <Textarea
              placeholder="Describe your green action... (e.g., 'Planted 5 trees in the local park today!')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">{message.length}/500 characters</p>
          </div>
          <Button type="submit" className="w-full" disabled={uploading} variant="hero">
            {uploading ? "Uploading..." : "Share with Community"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
