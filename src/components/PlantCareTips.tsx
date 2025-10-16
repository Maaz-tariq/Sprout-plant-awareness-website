import { Card } from "@/components/ui/card";
import { Droplets, Sun, Wind, Sprout } from "lucide-react";
import plantCareImage from "@/assets/plant-care.jpg";

export const PlantCareTips = () => {
  const tips = [
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Light Requirements",
      description: "Most plants need 6-8 hours of sunlight. Observe your plant's leaves - yellowing may indicate too much light, while leggy growth suggests too little.",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Watering Wisdom",
      description: "Water when the top inch of soil is dry. Overwatering is more harmful than underwatering. Ensure proper drainage to prevent root rot.",
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Air Circulation",
      description: "Good airflow prevents fungal diseases and strengthens stems. Open windows or use a fan to promote healthy growth.",
    },
    {
      icon: <Sprout className="w-6 h-6" />,
      title: "Nutrient Balance",
      description: "Feed plants during growing season with balanced fertilizer. Organic compost enriches soil and promotes healthy microbial life.",
    },
  ];

  return (
    <section id="plant-care" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Plant Care Tips
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the essentials of nurturing healthy, thriving plants
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            {tips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="relative">
            <img 
              src={plantCareImage} 
              alt="Plant care with water droplets on leaves" 
              className="rounded-lg shadow-soft w-full h-auto"
            />
            <div className="absolute inset-0 rounded-lg bg-primary/5 hover:bg-transparent transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};
