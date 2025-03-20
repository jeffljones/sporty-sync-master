import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, Medal, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,rgba(56,189,248,0.05)_0%,rgba(255,255,255,0)_100%)]" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-secondary text-sm font-medium mb-6 appear fade-in">
              <Clock className="h-4 w-4" />
              <span>Launching Fall 2025</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 appear fade-in" style={{ animationDelay: '0.1s' }}>
              Simplify Your <span className="relative">
                <span className="text-gradient">Tournament</span>
                <svg className="absolute -bottom-1 left-0 right-0 w-full" height="5" viewBox="0 0 500 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3C126.845 3 146.751 3 248.391 3C350.032 3 372.003 3 498 3" stroke="url(#paint0_linear_375_12)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_375_12" x1="2" y1="3.00159" x2="498" y2="3.00014" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA"/>
                      <stop offset="1" stopColor="#3B82F6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span> Management
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 appear fade-in" style={{ animationDelay: '0.2s' }}>
              A comprehensive sports tournament management app for recreational, amateur, and semi-professional sports organizers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start appear fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="group">
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Request a Demo
              </Button>
            </div>
            
            <div className="flex gap-6 mt-12 justify-center lg:justify-start appear fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1.5">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Easy Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1.5">
                  <Medal className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Live Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-100 p-1.5">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium">11+ Sports</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none appear slide-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-8 border-white shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <h3 className="text-2xl font-bold mb-4">Your Tournament Dashboard</h3>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {[
                    { name: "Active Tournaments", value: "5" },
                    { name: "Players Registered", value: "128" },
                    { name: "Matches Completed", value: "47" },
                    { name: "Next Match", value: "2:30 PM" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm font-medium text-white/80">{stat.name}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
