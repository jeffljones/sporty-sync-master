
import SectionTitle from '@/components/ui/SectionTitle';
import FormatCard from '@/components/ui/FormatCard';

const Formats = () => {
  const formats = [
    {
      title: "Tournament Formats",
      description: "Structured competition with predefined brackets and advancement rules",
      features: [
        "Single & Double Elimination",
        "Round Robin & Pool Play",
        "Ladder & Pyramid structures",
        "King of the Court dynamics"
      ]
    },
    {
      title: "League Formats",
      description: "Extended multi-week competitions with standings and playoffs",
      features: [
        "Weekly matchups with standings",
        "Flexible season duration",
        "Optional playoff systems",
        "Customizable point structures"
      ]
    },
    {
      title: "Pickup Mode",
      description: "Casual gameplay with randomized or balanced teams",
      features: [
        "Skill-based team assignments",
        "Team reshuffling between rounds",
        "Manual admin adjustments",
        "Separate tracking from official play"
      ]
    },
    {
      title: "Points-Based Play",
      description: "Individual ranking system for casual competitive sessions",
      features: [
        "Individual point accumulation",
        "Live leaderboard updates",
        "Configurable point awards",
        "Admin override for bonuses"
      ]
    }
  ];

  return (
    <section id="formats" className="py-20 bg-secondary">
      <div className="section-container">
        <SectionTitle
          subtitle="Competition Structures"
          title="Flexible Format Options"
          description="TourneyTi.me offers versatile competition structures to suit the needs of any organization or event."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((format, index) => (
            <FormatCard
              key={index}
              title={format.title}
              description={format.description}
              features={format.features}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formats;
