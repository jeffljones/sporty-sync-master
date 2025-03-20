
import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit this to a backend
    console.log('Form submitted:', { name, email });
    
    setSubmitted(true);
    toast({
      title: "Success!",
      description: "Thanks for signing up for early access!",
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,rgba(56,189,248,0.05)_0%,rgba(255,255,255,0)_100%)]" />
      
      <div className="section-container max-w-5xl">
        <SectionTitle
          subtitle="Get Early Access"
          title="Be Among the First to Try TourneyTi.me"
          description="Sign up now for early access and exclusive updates on our launch."
        />
        
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="p-8 md:p-10 md:col-span-3">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thanks for signing up!</h3>
                  <p className="text-muted-foreground mb-6">
                    We'll be in touch soon with updates on our launch and early access information.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Sign up another email
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">Join our waitlist</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to know when TourneyTi.me launches and get exclusive early access.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Get Early Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
            
            <div className="bg-primary text-white p-8 md:p-10 md:col-span-2">
              <h3 className="text-xl font-semibold mb-6">Why sign up early?</h3>
              
              <ul className="space-y-4">
                {[
                  "Exclusive beta access before public launch",
                  "Free premium features during testing period",
                  "Direct input on feature development",
                  "Priority support from our team"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
