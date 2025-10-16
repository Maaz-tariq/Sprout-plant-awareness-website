import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-semibold">Plant Awareness</span>
          </div>
          <p className="text-center text-primary-foreground/80 max-w-md">
            Every breath begins with a plant. Together, we can nurture a greener, healthier planet.
          </p>
          <div className="text-sm text-primary-foreground/60">
            © 2025 Plant Awareness Movement. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
