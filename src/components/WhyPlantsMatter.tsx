export const WhyPlantsMatter = () => {
  const facts = [
    {
      stat: "20%",
      label: "of Earth's oxygen comes from the Amazon rainforest alone",
    },
    {
      stat: "80%",
      label: "of terrestrial biodiversity lives in forests",
    },
    {
      stat: "3 Trillion",
      label: "trees exist on Earth, down from 6 trillion since human civilization",
    },
    {
      stat: "50%",
      label: "of plant species are at risk of extinction",
    },
  ];

  return (
    <section id="why-plants" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Plants Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plants are the foundation of life on Earth. They produce oxygen, regulate climate, provide food and medicine, and support countless ecosystems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {facts.map((fact, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-primary mb-2">{fact.stat}</div>
              <p className="text-muted-foreground">{fact.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-card p-8 rounded-lg shadow-soft border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">The Essential Role of Plants</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong className="text-foreground">Oxygen Production:</strong> Through photosynthesis, plants convert CO₂ into oxygen, making Earth habitable.</li>
              <li><strong className="text-foreground">Climate Regulation:</strong> Forests and vegetation absorb carbon dioxide, helping mitigate climate change.</li>
              <li><strong className="text-foreground">Biodiversity Support:</strong> Plants provide habitat and food for millions of species.</li>
              <li><strong className="text-foreground">Human Wellbeing:</strong> Plants supply food, medicine, materials, and improve mental health.</li>
              <li><strong className="text-foreground">Soil Protection:</strong> Root systems prevent erosion and maintain soil health.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
