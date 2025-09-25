import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIChat } from './AIChat';
import { DoshaCard } from './DoshaCard';
import { MessageCircle, User, BookOpen, Calendar, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('chat');

  // Mock data - in real app this would come from AI analysis
  const doshaAnalysis = {
    vata: {
      level: 35,
      description: "Your Vata dosha shows moderate activity. You likely have good creativity and adaptability, but may need attention to grounding practices.",
      characteristics: ["Quick thinking", "Creative mind", "Variable energy", "Sensitive to change"]
    },
    pitta: {
      level: 45,
      description: "Pitta is your primary dosha, indicating strong digestive fire and leadership qualities. Balance with cooling practices.",
      characteristics: ["Strong digestion", "Goal-oriented", "Natural leader", "Intense focus"]
    },
    kapha: {
      level: 20,
      description: "Lower Kapha suggests you may benefit from more grounding and stability practices to build endurance and calm.",
      characteristics: ["Steady nature", "Good immunity", "Calm disposition", "Strong endurance"]
    }
  };

  const recommendations = [
    {
      category: "Diet",
      title: "Pitta-Pacifying Foods",
      description: "Focus on cooling, sweet, and bitter tastes. Include cucumber, coconut, leafy greens, and sweet fruits.",
      priority: "high"
    },
    {
      category: "Lifestyle",
      title: "Morning Meditation",
      description: "Practice 10-15 minutes of cooling pranayama (breathing exercises) each morning.",
      priority: "medium"
    },
    {
      category: "Exercise",
      title: "Gentle Yoga",
      description: "Moon salutations and restorative yoga poses in the evening to balance your Pitta energy.",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">AyuAahaar Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Your personal Ayurvedic wellness center</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-healing text-healing">
                Pitta Dominant
              </Badge>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              AI Consultation
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Constitution
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Guidance
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIChat />
              </div>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">Quick Tips</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Ask about your specific symptoms</p>
                    <p>• Share your daily routine for personalized advice</p>
                    <p>• Request seasonal dietary adjustments</p>
                    <p>• Inquire about herbal remedies</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">Today's Insight</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With your Pitta constitution, this autumn season is perfect for incorporating more grounding practices and warming spices like ginger and cinnamon.
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <DoshaCard 
                type="vata" 
                level={doshaAnalysis.vata.level}
                description={doshaAnalysis.vata.description}
                characteristics={doshaAnalysis.vata.characteristics}
              />
              <DoshaCard 
                type="pitta" 
                level={doshaAnalysis.pitta.level}
                description={doshaAnalysis.pitta.description}
                characteristics={doshaAnalysis.pitta.characteristics}
              />
              <DoshaCard 
                type="kapha" 
                level={doshaAnalysis.kapha.level}
                description={doshaAnalysis.kapha.description}
                characteristics={doshaAnalysis.kapha.characteristics}
              />
            </div>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Your Constitutional Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2 text-foreground">Primary Constitution (Prakriti)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You have a Pitta-dominant constitution with moderate Vata and lower Kapha. This suggests you're naturally driven, 
                    focused, and have strong digestive capacity, but may need to balance intensity with cooling and grounding practices.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-foreground">Current Imbalances (Vikriti)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your current state shows elevated Pitta, which may manifest as irritability, acid reflux, or skin sensitivity. 
                    Focus on cooling foods, moderate exercise, and stress management techniques.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.category}
                        </Badge>
                        <Badge 
                          variant={rec.priority === 'high' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{rec.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Wellness Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Track your daily symptoms, energy levels, and how well you're following your personalized recommendations.
                </p>
                <Button variant="ayurvedic" className="w-full">
                  Start Daily Check-in
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Progress Insights</h3>
                <p className="text-muted-foreground mb-4">
                  View your wellness journey over time and see how your dosha balance changes with your lifestyle adjustments.
                </p>
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};