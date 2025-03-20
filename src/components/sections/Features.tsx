
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from '@/components/ui/FeatureCard';
import { 
  Brackets, Calendar, Users, Award, 
  BarChart, Shield, Shuffle, Settings
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Competition Types",
      description: "Support for tournaments, leagues, pickup games, and points-based play with customizable settings.",
      icon: Brackets
    },
    {
      title: "Scheduling Tools",
      description: "Automated match scheduling with real-time updates, court assignments, and calendar integration.",
      icon: Calendar
    },
    {
      title: "Team Management",
      description: "Player profiles with skill levels, team formation options, and admin override capabilities.",
      icon: Users
    },
    {
      title: "Scoring Systems",
      description: "Flexible scoring options specific to each sport with automatic updates and rule configurations.",
      icon: Award
    },
    {
      title: "Live Results",
      description: "Real-time score updates, standings, and rankings visible to all participants and spectators.",
      icon: BarChart
    },
    {
      title: "Admin Controls",
      description: "Powerful tools for tournament organizers including score adjustments and bracket management.",
      icon: Shield
    },
    {
      title: "Pickup Mode",
      description: "Randomized or skill-based team assignments that can be reshuffled between rounds.",
      icon: Shuffle
    },
    {
      title: "Customization",
      description: "Configure tournament structures, scoring rules, and formats to match your specific needs.",
      icon: Settings
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="section-container">
        <SectionTitle
          subtitle="Features"
          title="Powerful Tournament Management"
          description="TourneyTi.me provides comprehensive tools to simplify every aspect of sports competition organization."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
