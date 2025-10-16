import { Card } from "@/components/ui/card";
import { Trees, Waves, ThermometerSun, Award } from "lucide-react";

export const EnvironmentalImpact = () => {
  const impacts = [
    {
      icon: <Trees className="w-8 h-8" />,
      title: "Carbon Sequestration",
      stat: "48 lbs",
      description: "Average CO₂ absorbed by a tree per year",
      detail: "A mature tree can sequester about 48 pounds of CO₂ annually, helping combat climate change.",
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Water Cycle",
      stat: "100 gallons",
      description: "Water recycled by a large tree daily",
      detail: "Trees release water vapor through transpiration, contributing to rainfall and climate regulation.",
    },
    {
      icon: <ThermometerSun className="w-8 h-8" />,
      title: "Urban Cooling",
      stat: "9°F",
      description: "Temperature reduction in shaded areas",
      detail: "Trees can lower urban temperatures by up to 9°F through shade and evapotranspiration.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Air Quality",
      stat: "60%",
      description: "Reduction in particulate matter",
      detail: "Urban forests can reduce particulate matter by up to 60%, improving respiratory health.",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Environmental Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The measurable benefits of plant life on our planet's health and human wellbeing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {impacts.map((impact, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-glow transition-all duration-300 bg-card border-border"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  {impact.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">{impact.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{impact.stat}</div>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">{impact.description}</p>
                  <p className="text-muted-foreground">{impact.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-primary/5 p-8 rounded-lg border border-primary/20">
          <h3 className="text-2xl font-semibold mb-4 text-center text-foreground">
            The Power of Collective Action
          </h3>
          <p className="text-center text-muted-foreground text-lg">
            If every person on Earth planted just one tree, we could add 8 billion trees to our planet - 
            enough to absorb 384 billion pounds of CO₂ annually and make a significant impact on climate change.
          </p>
        </div>
      </div>
    </section>
  );
};
