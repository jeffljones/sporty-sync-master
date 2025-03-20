
import SectionTitle from '@/components/ui/SectionTitle';
import SportCard from '@/components/ui/SportCard';
import { 
  Volleyball, 
  User, 
  Users 
} from 'lucide-react';

// Custom icon for Tennis since Lucide doesn't have a Tennis icon
const TennisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M18 12.5a1 1 0 100-2v2zm-12-2a1 1 0 100 2v-2z" />
    <path d="M5 5c1 1.5 2.5 3 7 3s6-1.5 7-3" />
    <path d="M5 19c1-1.5 2.5-3 7-3s6 1.5 7 3" />
  </svg>
);

// Custom icon for Table Tennis (Ping Pong)
const TableTennisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M4 7h.01" />
    <path d="M20 7h.01" />
    <path d="M4 17h.01" />
    <path d="M20 17h.01" />
    <path d="M8 3h8" />
    <path d="M8 21h8" />
    <path d="M7 18l10-12" />
  </svg>
);

// Custom icon since Lucide doesn't have all sports icons
const PickleballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14L16 10" />
    <path d="M8 10L16 14" />
  </svg>
);

const BadmintonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 3L6 14l4 4L21 7l-4-4z" />
    <path d="M9 14l-5 5m5-5l3-3" />
  </svg>
);

const SquashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="6" cy="6" r="2" />
    <path d="M5 20a1 1 0 102 0V8a2 2 0 11-2 0v12z" />
    <path d="M14 20a1 1 0 102 0V8a2 2 0 11-2 0v12z" />
    <path d="M17 4h1a2 2 0 012 2v2a2 2 0 01-2 2h-1a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);

const SpikeBallIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6a2 2 0 012 2v8a2 2 0 11-4 0V8a2 2 0 012-2z" />
    <path d="M6 12h12" />
  </svg>
);

// Create a specific RacquetballIcon to avoid reusing TennisIcon
const RacquetballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M5 5l3 3" />
    <path d="M19 19l-3-3" />
    <path d="M19 5l-3 3" />
    <path d="M5 19l3-3" />
  </svg>
);

const Sports = () => {
  const sports = [
    { name: "Tennis", icon: TennisIcon },
    { name: "Volleyball", icon: Volleyball },
    { name: "Pickleball", icon: PickleballIcon },
    { name: "Badminton", icon: BadmintonIcon },
    { name: "Table Tennis", icon: TableTennisIcon },
    { name: "Squash", icon: SquashIcon },
    { name: "Racquetball", icon: RacquetballIcon },
    { name: "Spikeball", icon: SpikeBallIcon },
  ];

  const playStyles = [
    { name: "Singles", icon: User },
    { name: "Doubles", icon: Users },
    { name: "Team Play", icon: Users },
  ];

  return (
    <section id="sports" className="py-20">
      <div className="section-container">
        <SectionTitle
          subtitle="Supported Sports"
          title="Versatile Sport Coverage"
          description="TourneyTi.me supports a wide range of net and racquet sports, each with customizable scoring and rules."
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {sports.map((sport, index) => (
            <SportCard
              key={index}
              name={sport.name}
              icon={sport.icon}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Play Styles Available for All Sports</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {playStyles.map((style, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm border border-border appear scale-in"
                style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
              >
                <style.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{style.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sports;
