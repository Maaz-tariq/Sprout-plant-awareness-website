import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Leaf, Users, BookOpen, HandHeart } from "lucide-react";
import plantingImage from "@/assets/planting.jpg";
import { useState } from "react";
import { toast } from "sonner";

export const JoinMovement = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for joining our movement!");
      setEmail("");
    }
  };

  const actions = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Plant a Tree",
      description: "Start with one tree in your yard, neighborhood, or through a reforestation program.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educate Others",
      description: "Share what you've learned about plants with friends, family, and your community.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Volunteer",
      description: "Join local conservation groups and participate in community planting events.",
    },
    {
      icon: <HandHeart className="w-6 h-6" />,
      title: "Support Conservation",
      description: "Contribute to organizations working to protect forests and plant species worldwide.",
    },
  ];

  return (
    <section id="join" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join the Movement
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of a global community committed to nurturing our planet's green life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
          <div className="relative order-2 lg:order-1">
            <img 
              src={plantingImage} 
              alt="Hands planting a seedling in soil" 
              className="rounded-lg shadow-soft w-full h-auto"
            />
            <div className="absolute inset-0 rounded-lg bg-primary/5 hover:bg-transparent transition-all duration-300" />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-3xl font-semibold text-foreground mb-6">Ways to Make a Difference</h3>
            {actions.map((action, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-foreground">{action.title}</h4>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-border shadow-glow">
            <h3 className="text-2xl font-semibold text-center mb-4 text-foreground">
              Stay Connected
            </h3>
            <p className="text-center text-muted-foreground mb-6">
              Subscribe to receive tips, updates, and inspiration for your plant awareness journey
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" variant="hero" size="lg">
                Subscribe
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
