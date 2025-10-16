import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { WhyPlantsMatter } from "@/components/WhyPlantsMatter";
import { PlantCareTips } from "@/components/PlantCareTips";
import { EnvironmentalImpact } from "@/components/EnvironmentalImpact";
import { Community } from "@/components/Community";
import { JoinMovement } from "@/components/JoinMovement";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <WhyPlantsMatter />
      <PlantCareTips />
      <EnvironmentalImpact />
      <Community />
      <JoinMovement />
      <Footer />
    </div>
  );
};

export default Index;
