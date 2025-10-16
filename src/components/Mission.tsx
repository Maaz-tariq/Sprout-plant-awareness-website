import { Card } from "@/components/ui/card";
import { Leaf, Heart, Globe } from "lucide-react";

export const Mission = () => {
  return (
    <section id="mission" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            To inspire a deeper understanding and appreciation of plants, fostering a global movement toward sustainability and environmental stewardship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 bg-card border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Educate</h3>
            <p className="text-muted-foreground">
              Share knowledge about the crucial role plants play in our ecosystems, from oxygen production to climate regulation.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 bg-card border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Inspire</h3>
            <p className="text-muted-foreground">
              Connect people emotionally with nature, highlighting the beauty and importance of every plant species.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 bg-card border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Act</h3>
            <p className="text-muted-foreground">
              Empower individuals to take meaningful action through planting, conservation, and sustainable practices.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
