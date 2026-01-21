import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Zap, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate a temporary user ID for anonymous registrations
      const tempUserId = crypto.randomUUID();
      
      const { error } = await supabase
        .from('Form_Applicants')
        .insert([
          {
            user_id: tempUserId,
            name: formData.name,
            email: formData.email
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Registration Failed",
          description: "There was an error submitting your registration. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: "You're signed up for the Emergency Mastermind. Prepare to initiate the better you!",
        });
        
        setFormData({ name: "", email: "" });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-blue opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-600/30">
              <Zap className="w-4 h-4" />
              URGENT OPPORTUNITY
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
                EMERGENCY
              </span>
              <br />
              <span className="text-blue-400">MASTERMIND</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Realtors, lenders, and real estate partners, get ready to <span className="text-blue-400 font-bold" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)' }}>INITIATE THE BETTER YOU</span>
              <br />
              This is your moment to breakthrough.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-3 text-gray-200">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">July 8th, 2024</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">7:00 PM</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-gray-200 mb-8">
              <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span className="font-semibold">Online | Google meet</span>
            </div>
          </div>
          
          {/* Registration Form */}
          <Card className="bg-dark-blue-900/80 border-dark-blue-700 backdrop-blur-sm animate-fade-in delay-300">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Secure Your Spot</h2>
                <p className="text-gray-400">Join elite agents who are ready to transform</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-semibold">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-blue-800/50 border-dark-blue-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-blue-800/50 border-dark-blue-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter your email"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-accent hover:opacity-90 text-white font-bold py-4 text-lg transition-all duration-300 animate-pulse-glow"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Securing Spot...
                    </div>
                  ) : (
                    "CLAIM YOUR SPOT NOW"
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Limited seats available • Registration closes soon
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-blue-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            What You'll Experience
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-blue border-dark-blue-600 hover:border-blue-400 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-3">Strategic Breakthrough</h3>
                <p className="text-gray-300">Discover the exact strategies top agents use to dominate their markets</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-blue border-dark-blue-600 hover:border-blue-400 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-3">Elite Network</h3>
                <p className="text-gray-300">Connect with high-performing agents and build powerful partnerships</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-blue border-dark-blue-600 hover:border-blue-400 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-3">Immediate Results</h3>
                <p className="text-gray-300">Walk away with actionable tactics you can implement immediately</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Urgency Section */}
      <section className="py-20 px-4 bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-6 py-3 rounded-full text-lg font-semibold mb-8 border border-red-600/30 animate-pulse-glow">
            <Zap className="w-5 h-5" />
            TIME SENSITIVE OPPORTUNITY
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Don't Let This Moment Pass
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The agents who show up on July 8th will be the ones who 
            <span className="text-blue-400 font-bold"> initiate the better version of themselves</span>. 
            Will you be one of them?
          </p>
          
          <div className="flex justify-center">
            <Button
              onClick={() => document.getElementById('name')?.focus()}
              className="bg-gradient-accent hover:opacity-90 text-white font-bold px-8 py-4 text-lg transition-all duration-300 animate-pulse-glow"
            >
              SECURE YOUR TRANSFORMATION
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
