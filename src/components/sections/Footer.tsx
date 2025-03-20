
import { Trophy } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="bg-primary rounded-lg p-1.5">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TourneyTi.me</span>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#sports" className="hover:text-primary transition-colors">Sports</a>
            <a href="#formats" className="hover:text-primary transition-colors">Formats</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} TourneyTi.me. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
