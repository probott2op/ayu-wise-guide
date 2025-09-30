import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AIChat } from './AIChat';
import { DoshaCard } from './DoshaCard';
import { MessageCircle, User, BookOpen, Calendar, Settings, Sparkles, Apple, Leaf, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [showDietDialog, setShowDietDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);

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

  // Mock food data
  const foodItems = [
    {
      id: 1,
      name: "Coconut Rice",
      portion: "100g",
      nutrients: {
        calories: 165,
        protein: 3.2,
        carbs: 28.5,
        fats: 4.8,
        fiber: 1.2,
        vitamins: ["B1", "B6", "Folate", "Vitamin E"],
        minerals: ["Iron", "Magnesium", "Zinc"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Pacifies Pitta, Balances Vata",
        qualities: ["Grounding", "Nourishing", "Calming"]
      }
    },
    {
      id: 2,
      name: "Cucumber Salad",
      portion: "100g",
      nutrients: {
        calories: 16,
        protein: 0.7,
        carbs: 3.6,
        fats: 0.1,
        fiber: 0.5,
        vitamins: ["Vitamin C", "Vitamin K", "B Vitamins"],
        minerals: ["Potassium", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent"],
        potency: "Cooling",
        effect: "Highly Pitta-pacifying",
        qualities: ["Hydrating", "Light", "Refreshing"]
      }
    },
    {
      id: 3,
      name: "Sweet Mango",
      portion: "100g",
      nutrients: {
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fats: 0.4,
        fiber: 1.6,
        vitamins: ["Vitamin C", "Vitamin A", "Vitamin E", "B6"],
        minerals: ["Potassium", "Copper"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Balances Pitta, Nourishes all doshas",
        qualities: ["Rejuvenating", "Strengthening", "Satisfying"]
      }
    },
    {
      id: 4,
      name: "Mint Chutney",
      portion: "100g",
      nutrients: {
        calories: 44,
        protein: 3.8,
        carbs: 8.4,
        fats: 0.7,
        fiber: 6.8,
        vitamins: ["Vitamin A", "Vitamin C", "Folate"],
        minerals: ["Iron", "Calcium", "Manganese"]
      },
      ayurvedic: {
        taste: ["Pungent", "Bitter"],
        potency: "Cooling",
        effect: "Cools Pitta, Stimulates digestion",
        qualities: ["Digestive", "Aromatic", "Cleansing"]
      }
    },
    {
      id: 5,
      name: "Basmati Rice Porridge",
      portion: "100g",
      nutrients: {
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fats: 0.3,
        fiber: 0.4,
        vitamins: ["B Vitamins", "Folate"],
        minerals: ["Iron", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Balances all doshas, Easy to digest",
        qualities: ["Soothing", "Nourishing", "Light"]
      }
    }
  ];

  const alternativeFoods = [
    {
      id: 6,
      name: "Coconut Water",
      portion: "100ml",
      nutrients: {
        calories: 19,
        protein: 0.7,
        carbs: 3.7,
        fats: 0.2,
        fiber: 1.1,
        vitamins: ["Vitamin C", "B Vitamins"],
        minerals: ["Potassium", "Sodium", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Highly Pitta-pacifying, Hydrating",
        qualities: ["Electrolyte-rich", "Refreshing", "Light"]
      }
    },
    {
      id: 7,
      name: "Almond Milk",
      portion: "100ml",
      nutrients: {
        calories: 17,
        protein: 0.6,
        carbs: 1.5,
        fats: 1.1,
        fiber: 0.2,
        vitamins: ["Vitamin E", "Vitamin D", "B12"],
        minerals: ["Calcium", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Nourishes all doshas, Calming",
        qualities: ["Strengthening", "Soothing", "Nutritive"]
      }
    },
    {
      id: 8,
      name: "Fennel Tea",
      portion: "100ml",
      nutrients: {
        calories: 1,
        protein: 0,
        carbs: 0.2,
        fats: 0,
        fiber: 0,
        vitamins: ["Vitamin C"],
        minerals: ["Potassium", "Calcium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Pungent"],
        potency: "Cooling",
        effect: "Digestive, Pitta-pacifying",
        qualities: ["Calming", "Aromatic", "Soothing"]
      }
    }
  ];

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
                      {rec.category === "Diet" && (
                        <div className="mt-4 flex items-center gap-3">
                          <Button 
                            variant="ayurvedic" 
                            size="sm"
                            onClick={() => setShowDietDialog(true)}
                            className="gap-2"
                          >
                            <Apple className="w-4 h-4" />
                            View Diet Plan
                          </Button>
                          <span className="text-xs text-muted-foreground italic">
                            Viewing from 8000+ recipes
                          </span>
                        </div>
                      )}
                    </div>
                    {rec.category !== "Diet" && (
                      <Button variant="outline" size="sm" className="ml-4">
                        Learn More
                      </Button>
                    )}
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

      {/* Diet Plan Dialog */}
      <Dialog open={showDietDialog} onOpenChange={setShowDietDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Your Personalized Diet Plan</DialogTitle>
            <DialogDescription>
              Viewing from 8000+ Ayurvedic recipes • Click on any food item to see detailed information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 mt-4">
            {foodItems.map((food) => (
              <Card 
                key={food.id} 
                className="p-4 hover:shadow-medium transition-all cursor-pointer hover:border-primary"
                onClick={() => {
                  setSelectedFood(food);
                  setShowAlternatives(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Apple className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{food.name}</h4>
                      <p className="text-xs text-muted-foreground">{food.portion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {food.nutrients.calories} cal
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {food.ayurvedic.potency}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Food Details Dialog */}
      <Dialog open={selectedFood !== null} onOpenChange={() => setSelectedFood(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedFood && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <Apple className="w-6 h-6 text-primary" />
                  {selectedFood.name}
                </DialogTitle>
                <DialogDescription>
                  Portion size: {selectedFood.portion}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Nutritional Information */}
                <Card className="p-5 bg-gradient-subtle">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                    <Flame className="w-5 h-5 text-healing" />
                    Nutritional Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Calories</span>
                      <span className="font-semibold text-foreground">{selectedFood.nutrients.calories} kcal</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="font-semibold text-foreground">{selectedFood.nutrients.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Carbohydrates</span>
                      <span className="font-semibold text-foreground">{selectedFood.nutrients.carbs}g</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Fats</span>
                      <span className="font-semibold text-foreground">{selectedFood.nutrients.fats}g</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Fiber</span>
                      <span className="font-semibold text-foreground">{selectedFood.nutrients.fiber}g</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium text-foreground mb-2">Vitamins:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFood.nutrients.vitamins.map((vitamin: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {vitamin}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium text-foreground mb-2">Minerals:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFood.nutrients.minerals.map((mineral: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {mineral}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Ayurvedic Composition */}
                <Card className="p-5 bg-gradient-subtle">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                    <Leaf className="w-5 h-5 text-vata" />
                    Ayurvedic Composition
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Taste (Rasa):</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFood.ayurvedic.taste.map((taste: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="border-vata text-vata">
                            {taste}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Potency (Virya):</p>
                      <Badge variant="outline" className="border-pitta text-pitta">
                        {selectedFood.ayurvedic.potency}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Effect on Doshas:</p>
                      <p className="text-sm text-foreground bg-background/50 p-3 rounded-lg">
                        {selectedFood.ayurvedic.effect}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Qualities (Guna):</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFood.ayurvedic.qualities.map((quality: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="border-kapha text-kapha">
                            {quality}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Alternative Foods Section */}
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAlternatives(!showAlternatives)}
                >
                  {showAlternatives ? 'Hide' : 'View'} Alternative Foods
                </Button>
                
                {showAlternatives && (
                  <div className="grid gap-3 mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Similar Ayurvedic alternatives with comparable benefits:
                    </p>
                    {alternativeFoods.map((food) => (
                      <Card 
                        key={food.id} 
                        className="p-4 hover:shadow-medium transition-all cursor-pointer hover:border-primary"
                        onClick={() => {
                          setSelectedFood(food);
                          setShowAlternatives(false);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                              <Apple className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{food.name}</h4>
                              <p className="text-xs text-muted-foreground">{food.portion}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {food.nutrients.calories} cal
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {food.ayurvedic.potency}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};