import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { AIChat } from './AIChat';
import { DoshaCard } from './DoshaCard';
import { MessageCircle, User, BookOpen, Calendar, Settings, Sparkles, Apple, Leaf, Flame, Award, TrendingUp, Target, Zap, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [showDietDialog, setShowDietDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Check-in state
  const [energyLevel, setEnergyLevel] = useState([5]);
  const [digestionLevel, setDigestionLevel] = useState([5]);
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [moodLevel, setMoodLevel] = useState([5]);
  
  // Gamification data
  const [streak, setStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(340);
  const [wellnessScore, setWellnessScore] = useState(78);
  
  const badges = [
    { name: "7-Day Streak", icon: "🔥", earned: true },
    { name: "Diet Master", icon: "🥗", earned: true },
    { name: "Meditation Pro", icon: "🧘", earned: false },
    { name: "Early Bird", icon: "🌅", earned: true }
  ];

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

  // Mock food data - Comprehensive meal plan (~2000 calories)
  const foodItems = [
    // Breakfast
    {
      id: 1,
      name: "Moong Dal Khichdi",
      meal: "Breakfast",
      portion: "200g",
      nutrients: {
        calories: 280,
        protein: 12,
        carbs: 48,
        fats: 4,
        fiber: 8,
        vitamins: ["B1", "B6", "Folate", "Vitamin K"],
        minerals: ["Iron", "Magnesium", "Zinc", "Potassium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent"],
        potency: "Cooling",
        effect: "Tridoshic - Balances all doshas",
        qualities: ["Light", "Easy to digest", "Nourishing"]
      }
    },
    {
      id: 2,
      name: "Coconut Chutney",
      meal: "Breakfast",
      portion: "50g",
      nutrients: {
        calories: 95,
        protein: 2,
        carbs: 6,
        fats: 7,
        fiber: 3,
        vitamins: ["Vitamin C", "Vitamin E", "B Vitamins"],
        minerals: ["Calcium", "Iron", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent"],
        potency: "Cooling",
        effect: "Pacifies Pitta, Balances Vata",
        qualities: ["Cooling", "Hydrating", "Soothing"]
      }
    },
    // Mid-morning Snack
    {
      id: 3,
      name: "Sweet Mango",
      meal: "Mid-morning Snack",
      portion: "150g",
      nutrients: {
        calories: 90,
        protein: 1.2,
        carbs: 22.5,
        fats: 0.6,
        fiber: 2.4,
        vitamins: ["Vitamin C", "Vitamin A", "Vitamin E", "B6"],
        minerals: ["Potassium", "Copper", "Folate"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Balances Pitta, Nourishes all doshas",
        qualities: ["Rejuvenating", "Strengthening", "Satisfying"]
      }
    },
    // Lunch
    {
      id: 4,
      name: "Coconut Rice",
      meal: "Lunch",
      portion: "250g",
      nutrients: {
        calories: 412,
        protein: 8,
        carbs: 71,
        fats: 12,
        fiber: 3,
        vitamins: ["B1", "B6", "Folate", "Vitamin E"],
        minerals: ["Iron", "Magnesium", "Zinc", "Manganese"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Pacifies Pitta, Balances Vata",
        qualities: ["Grounding", "Nourishing", "Calming"]
      }
    },
    {
      id: 5,
      name: "Cucumber Raita",
      meal: "Lunch",
      portion: "150g",
      nutrients: {
        calories: 75,
        protein: 4.5,
        carbs: 8,
        fats: 2.5,
        fiber: 1.5,
        vitamins: ["Vitamin C", "Vitamin K", "B12", "Riboflavin"],
        minerals: ["Calcium", "Potassium", "Magnesium", "Phosphorus"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent"],
        potency: "Cooling",
        effect: "Highly Pitta-pacifying",
        qualities: ["Hydrating", "Light", "Refreshing"]
      }
    },
    {
      id: 6,
      name: "Bottle Gourd Dal",
      meal: "Lunch",
      portion: "200g",
      nutrients: {
        calories: 168,
        protein: 11,
        carbs: 24,
        fats: 3,
        fiber: 7,
        vitamins: ["Vitamin C", "B Vitamins", "Folate"],
        minerals: ["Iron", "Potassium", "Magnesium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent"],
        potency: "Cooling",
        effect: "Calms Pitta, Balances Kapha",
        qualities: ["Light", "Cooling", "Digestive"]
      }
    },
    // Evening Snack
    {
      id: 7,
      name: "Almond & Date Energy Balls",
      meal: "Evening Snack",
      portion: "60g (3 balls)",
      nutrients: {
        calories: 180,
        protein: 5,
        carbs: 20,
        fats: 9,
        fiber: 4,
        vitamins: ["Vitamin E", "B Vitamins", "Vitamin K"],
        minerals: ["Magnesium", "Calcium", "Iron", "Potassium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Warming",
        effect: "Nourishes Vata, Strengthens tissues",
        qualities: ["Grounding", "Strengthening", "Satisfying"]
      }
    },
    // Dinner
    {
      id: 8,
      name: "Roti (Whole Wheat)",
      meal: "Dinner",
      portion: "2 rotis (100g)",
      nutrients: {
        calories: 264,
        protein: 9,
        carbs: 50,
        fats: 3.5,
        fiber: 8,
        vitamins: ["B Vitamins", "Vitamin E"],
        minerals: ["Iron", "Magnesium", "Zinc", "Selenium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Warming",
        effect: "Balances Vata, Grounds energy",
        qualities: ["Nourishing", "Grounding", "Strengthening"]
      }
    },
    {
      id: 9,
      name: "Palak Paneer (Spinach & Cottage Cheese)",
      meal: "Dinner",
      portion: "200g",
      nutrients: {
        calories: 240,
        protein: 15,
        carbs: 12,
        fats: 15,
        fiber: 4,
        vitamins: ["Vitamin A", "Vitamin C", "Vitamin K", "Folate"],
        minerals: ["Calcium", "Iron", "Magnesium", "Potassium"]
      },
      ayurvedic: {
        taste: ["Sweet", "Astringent", "Bitter"],
        potency: "Cooling",
        effect: "Calms Pitta, Nourishes blood",
        qualities: ["Strengthening", "Building", "Calming"]
      }
    },
    {
      id: 10,
      name: "Mint Chutney",
      meal: "Dinner",
      portion: "30g",
      nutrients: {
        calories: 13,
        protein: 1.1,
        carbs: 2.5,
        fats: 0.2,
        fiber: 2,
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
    // Bedtime
    {
      id: 11,
      name: "Warm Almond Milk with Saffron",
      meal: "Bedtime",
      portion: "200ml",
      nutrients: {
        calories: 85,
        protein: 3,
        carbs: 8,
        fats: 4.5,
        fiber: 1,
        vitamins: ["Vitamin E", "Vitamin D", "B12"],
        minerals: ["Calcium", "Magnesium", "Potassium"]
      },
      ayurvedic: {
        taste: ["Sweet"],
        potency: "Cooling",
        effect: "Calms Vata & Pitta, Promotes sleep",
        qualities: ["Nourishing", "Calming", "Grounding"]
      }
    }
  ];

  // Calculate daily totals
  const dailyTotals = foodItems.reduce((acc, food) => ({
    calories: acc.calories + food.nutrients.calories,
    protein: acc.protein + food.nutrients.protein,
    carbs: acc.carbs + food.nutrients.carbs,
    fats: acc.fats + food.nutrients.fats,
    fiber: acc.fiber + food.nutrients.fiber
  }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });

  // Collect all unique Ayurvedic properties
  const ayurvedicSummary = {
    dominantTastes: ["Sweet", "Astringent", "Cooling"],
    dominantPotency: "Cooling",
    overallEffect: "Pitta-pacifying with balance for all doshas",
    dominantQualities: ["Nourishing", "Cooling", "Grounding", "Digestive"]
  };

  // Meaningful alternatives grouped by food type
  const getAlternatives = (foodId: number) => {
    const alternatives: { [key: number]: any[] } = {
      // Moong Dal Khichdi alternatives
      1: [
        {
          id: 101,
          name: "Oats Upma",
          portion: "200g",
          nutrients: { calories: 290, protein: 10, carbs: 52, fats: 5, fiber: 9, vitamins: ["B1", "B6", "Iron"], minerals: ["Magnesium", "Zinc", "Phosphorus"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Balances Vata & Kapha", qualities: ["Grounding", "Strengthening", "Light"] }
        },
        {
          id: 102,
          name: "Quinoa Pongal",
          portion: "200g",
          nutrients: { calories: 295, protein: 13, carbs: 46, fats: 6, fiber: 7, vitamins: ["B2", "B6", "Folate"], minerals: ["Iron", "Magnesium", "Manganese"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Tridoshic", qualities: ["Nourishing", "Strengthening", "Balanced"] }
        }
      ],
      // Coconut Chutney alternatives
      2: [
        {
          id: 103,
          name: "Coriander Chutney",
          portion: "50g",
          nutrients: { calories: 38, protein: 2.5, carbs: 5, fats: 1.5, fiber: 2.5, vitamins: ["Vitamin C", "Vitamin K", "Folate"], minerals: ["Iron", "Calcium", "Magnesium"] },
          ayurvedic: { taste: ["Pungent", "Bitter"], potency: "Cooling", effect: "Pacifies Pitta, Cleanses", qualities: ["Light", "Digestive", "Cooling"] }
        },
        {
          id: 104,
          name: "Peanut Chutney",
          portion: "50g",
          nutrients: { calories: 105, protein: 5, carbs: 7, fats: 8, fiber: 3, vitamins: ["Vitamin E", "B3", "Folate"], minerals: ["Magnesium", "Phosphorus", "Manganese"] },
          ayurvedic: { taste: ["Sweet", "Astringent"], potency: "Warming", effect: "Grounds Vata", qualities: ["Nourishing", "Grounding", "Building"] }
        }
      ],
      // Sweet Mango alternatives
      3: [
        {
          id: 105,
          name: "Sweet Papaya",
          portion: "150g",
          nutrients: { calories: 62, protein: 0.7, carbs: 15.7, fats: 0.4, fiber: 2.5, vitamins: ["Vitamin C", "Vitamin A", "Folate"], minerals: ["Potassium", "Magnesium"] },
          ayurvedic: { taste: ["Sweet"], potency: "Cooling", effect: "Highly digestive, Pitta-pacifying", qualities: ["Light", "Easy to digest", "Cleansing"] }
        },
        {
          id: 106,
          name: "Sweet Pear",
          portion: "150g",
          nutrients: { calories: 86, protein: 0.5, carbs: 23, fats: 0.2, fiber: 4.5, vitamins: ["Vitamin C", "Vitamin K", "Copper"], minerals: ["Potassium", "Copper"] },
          ayurvedic: { taste: ["Sweet", "Astringent"], potency: "Cooling", effect: "Balances all doshas", qualities: ["Cooling", "Hydrating", "Satisfying"] }
        }
      ],
      // Coconut Rice alternatives
      4: [
        {
          id: 107,
          name: "Lemon Rice",
          portion: "250g",
          nutrients: { calories: 390, protein: 7, carbs: 75, fats: 8, fiber: 2.5, vitamins: ["Vitamin C", "B6", "Folate"], minerals: ["Iron", "Magnesium", "Potassium"] },
          ayurvedic: { taste: ["Sour", "Sweet"], potency: "Warming", effect: "Stimulates digestion, Cleanses", qualities: ["Light", "Digestive", "Cleansing"] }
        },
        {
          id: 108,
          name: "Vegetable Pulao",
          portion: "250g",
          nutrients: { calories: 420, protein: 9, carbs: 68, fats: 13, fiber: 4, vitamins: ["Vitamin A", "Vitamin C", "B Vitamins"], minerals: ["Iron", "Potassium", "Magnesium"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Balances Vata, Grounding", qualities: ["Nourishing", "Satisfying", "Grounding"] }
        }
      ],
      // Cucumber Raita alternatives
      5: [
        {
          id: 109,
          name: "Boondi Raita",
          portion: "150g",
          nutrients: { calories: 95, protein: 5, carbs: 12, fats: 3, fiber: 1, vitamins: ["Vitamin B12", "Riboflavin", "Calcium"], minerals: ["Calcium", "Phosphorus", "Potassium"] },
          ayurvedic: { taste: ["Sweet", "Sour"], potency: "Cooling", effect: "Balances Pitta", qualities: ["Cooling", "Light", "Digestive"] }
        },
        {
          id: 110,
          name: "Carrot Raita",
          portion: "150g",
          nutrients: { calories: 82, protein: 4.5, carbs: 10, fats: 2.5, fiber: 2.5, vitamins: ["Vitamin A", "Vitamin K", "B12"], minerals: ["Calcium", "Potassium", "Magnesium"] },
          ayurvedic: { taste: ["Sweet"], potency: "Cooling", effect: "Nourishes Pitta, Good for eyes", qualities: ["Cooling", "Nourishing", "Grounding"] }
        }
      ],
      // Bottle Gourd Dal alternatives
      6: [
        {
          id: 111,
          name: "Spinach Dal",
          portion: "200g",
          nutrients: { calories: 175, protein: 12, carbs: 22, fats: 4, fiber: 8, vitamins: ["Vitamin A", "Vitamin C", "Folate", "Iron"], minerals: ["Iron", "Calcium", "Magnesium"] },
          ayurvedic: { taste: ["Sweet", "Astringent"], potency: "Cooling", effect: "Nourishes blood, Pitta-pacifying", qualities: ["Strengthening", "Cooling", "Building"] }
        },
        {
          id: 112,
          name: "Masoor Dal (Red Lentils)",
          portion: "200g",
          nutrients: { calories: 172, protein: 13, carbs: 26, fats: 2, fiber: 9, vitamins: ["Folate", "B1", "B6"], minerals: ["Iron", "Potassium", "Magnesium"] },
          ayurvedic: { taste: ["Sweet", "Astringent"], potency: "Cooling", effect: "Balances Pitta & Kapha", qualities: ["Light", "Easy to digest", "Nourishing"] }
        }
      ],
      // Almond Date Balls alternatives
      7: [
        {
          id: 113,
          name: "Coconut Ladoo",
          portion: "60g (3 balls)",
          nutrients: { calories: 190, protein: 3, carbs: 24, fats: 10, fiber: 3, vitamins: ["Vitamin E", "B Vitamins"], minerals: ["Manganese", "Copper", "Iron"] },
          ayurvedic: { taste: ["Sweet"], potency: "Cooling", effect: "Nourishes tissues, Cooling", qualities: ["Nourishing", "Satisfying", "Building"] }
        },
        {
          id: 114,
          name: "Walnut Fig Bites",
          portion: "60g (3 balls)",
          nutrients: { calories: 185, protein: 4, carbs: 22, fats: 9.5, fiber: 5, vitamins: ["Vitamin K", "B6", "Folate"], minerals: ["Magnesium", "Calcium", "Potassium"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Strengthens Ojas, Grounding", qualities: ["Nourishing", "Grounding", "Building"] }
        }
      ],
      // Roti alternatives
      8: [
        {
          id: 115,
          name: "Bajra Roti (Millet)",
          portion: "2 rotis (100g)",
          nutrients: { calories: 268, protein: 8, carbs: 52, fats: 4, fiber: 9, vitamins: ["B3", "B6", "Folate"], minerals: ["Iron", "Magnesium", "Phosphorus"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Highly nourishing, Grounds Vata", qualities: ["Warming", "Strengthening", "Grounding"] }
        },
        {
          id: 116,
          name: "Jowar Roti (Sorghum)",
          portion: "2 rotis (100g)",
          nutrients: { calories: 270, protein: 9.5, carbs: 54, fats: 3, fiber: 10, vitamins: ["B1", "B3", "B6"], minerals: ["Iron", "Calcium", "Phosphorus"] },
          ayurvedic: { taste: ["Sweet"], potency: "Cooling", effect: "Balances all doshas", qualities: ["Cooling", "Nourishing", "Light"] }
        }
      ],
      // Palak Paneer alternatives
      9: [
        {
          id: 117,
          name: "Paneer Butter Masala",
          portion: "200g",
          nutrients: { calories: 265, protein: 14, carbs: 15, fats: 17, fiber: 3, vitamins: ["Vitamin A", "Vitamin C", "B12"], minerals: ["Calcium", "Phosphorus", "Potassium"] },
          ayurvedic: { taste: ["Sweet"], potency: "Warming", effect: "Nourishes tissues, Strengthening", qualities: ["Building", "Nourishing", "Satisfying"] }
        },
        {
          id: 118,
          name: "Mixed Vegetable Curry",
          portion: "200g",
          nutrients: { calories: 195, protein: 6, carbs: 22, fats: 10, fiber: 6, vitamins: ["Vitamin A", "Vitamin C", "Folate"], minerals: ["Potassium", "Magnesium", "Iron"] },
          ayurvedic: { taste: ["Sweet", "Pungent"], potency: "Warming", effect: "Balances Vata & Kapha", qualities: ["Warming", "Digestive", "Nourishing"] }
        }
      ],
      // Mint Chutney alternatives
      10: [
        {
          id: 119,
          name: "Tomato Chutney",
          portion: "30g",
          nutrients: { calories: 18, protein: 0.8, carbs: 3.5, fats: 0.5, fiber: 1, vitamins: ["Vitamin C", "Vitamin A", "Lycopene"], minerals: ["Potassium", "Magnesium"] },
          ayurvedic: { taste: ["Sour", "Sweet"], potency: "Warming", effect: "Stimulates digestion", qualities: ["Digestive", "Warming", "Light"] }
        },
        {
          id: 120,
          name: "Garlic Chutney",
          portion: "30g",
          nutrients: { calories: 25, protein: 1.5, carbs: 4, fats: 0.8, fiber: 0.5, vitamins: ["Vitamin C", "B6"], minerals: ["Manganese", "Calcium", "Iron"] },
          ayurvedic: { taste: ["Pungent"], potency: "Heating", effect: "Stimulates Agni, Cleanses", qualities: ["Heating", "Digestive", "Cleansing"] }
        }
      ],
      // Almond Milk alternatives
      11: [
        {
          id: 121,
          name: "Golden Turmeric Milk",
          portion: "200ml",
          nutrients: { calories: 92, protein: 3.5, carbs: 9, fats: 4, fiber: 0.5, vitamins: ["Vitamin D", "B12", "Curcumin"], minerals: ["Calcium", "Magnesium", "Potassium"] },
          ayurvedic: { taste: ["Bitter", "Pungent", "Sweet"], potency: "Warming", effect: "Anti-inflammatory, Calms all doshas", qualities: ["Healing", "Warming", "Calming"] }
        },
        {
          id: 122,
          name: "Ashwagandha Milk",
          portion: "200ml",
          nutrients: { calories: 88, protein: 3.2, carbs: 8.5, fats: 4.5, fiber: 1, vitamins: ["Vitamin D", "B12"], minerals: ["Calcium", "Magnesium", "Iron"] },
          ayurvedic: { taste: ["Bitter", "Sweet"], potency: "Warming", effect: "Deeply nourishing, Adaptogenic", qualities: ["Strengthening", "Calming", "Rejuvenating"] }
        }
      ]
    };
    return alternatives[foodId] || [];
  };

  const handleCheckInSubmit = () => {
    const avgScore = (energyLevel[0] + digestionLevel[0] + sleepQuality[0] + moodLevel[0]) / 4;
    const pointsEarned = Math.round(avgScore * 2);
    
    setStreak(prev => prev + 1);
    setTotalPoints(prev => prev + pointsEarned);
    setWellnessScore(Math.round(avgScore * 10));
    setShowCheckIn(false);
    
    toast({
      title: "Check-in Complete! 🎉",
      description: `You earned ${pointsEarned} points! Current streak: ${streak + 1} days`,
    });
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
            {/* Gamification Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalPoints}</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-healing/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-healing/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-healing" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{streak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-vata/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vata/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-vata" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{wellnessScore}%</p>
                    <p className="text-xs text-muted-foreground">Wellness Score</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-accent/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{badges.filter(b => b.earned).length}/{badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges Earned</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Tracker Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Wellness Tracking
                </h3>
                <p className="text-muted-foreground mb-4">
                  Track your daily symptoms, energy levels, and how well you're following your personalized recommendations.
                </p>
                <Button 
                  variant="ayurvedic" 
                  className="w-full gap-2"
                  onClick={() => setShowCheckIn(true)}
                >
                  <Sparkles className="w-4 h-4" />
                  Start Daily Check-in
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-healing" />
                  Progress Insights
                </h3>
                <p className="text-muted-foreground mb-4">
                  View your wellness journey over time and see how your dosha balance changes with your lifestyle adjustments.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => setShowAnalytics(true)}
                >
                  <TrendingUp className="w-4 h-4" />
                  View Analytics
                </Button>
              </Card>
            </div>

            {/* Badges Section */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, idx) => (
                  <Card 
                    key={idx} 
                    className={cn(
                      "p-4 text-center transition-all",
                      badge.earned ? "bg-gradient-primary border-primary" : "bg-muted/50 opacity-50"
                    )}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="text-sm font-medium text-foreground">{badge.name}</p>
                    {!badge.earned && (
                      <p className="text-xs text-muted-foreground mt-1">Locked</p>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Daily Check-in Dialog */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Daily Wellness Check-in
            </DialogTitle>
            <DialogDescription>
              Rate how you're feeling today (1-10 scale)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Energy Level</label>
                <Badge variant="outline">{energyLevel[0]}/10</Badge>
              </div>
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Digestion Quality</label>
                <Badge variant="outline">{digestionLevel[0]}/10</Badge>
              </div>
              <Slider
                value={digestionLevel}
                onValueChange={setDigestionLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Sleep Quality</label>
                <Badge variant="outline">{sleepQuality[0]}/10</Badge>
              </div>
              <Slider
                value={sleepQuality}
                onValueChange={setSleepQuality}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Mood & Mental Clarity</label>
                <Badge variant="outline">{moodLevel[0]}/10</Badge>
              </div>
              <Slider
                value={moodLevel}
                onValueChange={setMoodLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <Button onClick={handleCheckInSubmit} className="w-full gap-2">
            <Star className="w-4 h-4" />
            Complete Check-in
          </Button>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-healing" />
              Your Wellness Analytics
            </DialogTitle>
            <DialogDescription>
              Track your progress and improvements over time
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Progress Overview */}
            <Card className="p-5 bg-gradient-subtle">
              <h3 className="font-semibold mb-4 text-foreground">Overall Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Wellness Score</span>
                    <span className="text-sm font-semibold text-foreground">{wellnessScore}%</span>
                  </div>
                  <Progress value={wellnessScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Diet Compliance</span>
                    <span className="text-sm font-semibold text-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Exercise Consistency</span>
                    <span className="text-sm font-semibold text-foreground">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Meditation Practice</span>
                    <span className="text-sm font-semibold text-foreground">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Dosha Balance Trends */}
            <Card className="p-5 bg-gradient-subtle">
              <h3 className="font-semibold mb-4 text-foreground">Dosha Balance Trends</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-vata" />
                      Vata
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">35%</span>
                      <Badge variant="outline" className="text-xs border-vata text-vata">↓ 5%</Badge>
                    </div>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Flame className="w-4 h-4 text-pitta" />
                      Pitta
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">45%</span>
                      <Badge variant="outline" className="text-xs border-pitta text-pitta">↓ 8%</Badge>
                    </div>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Apple className="w-4 h-4 text-kapha" />
                      Kapha
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">20%</span>
                      <Badge variant="outline" className="text-xs border-kapha text-kapha">↑ 3%</Badge>
                    </div>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">
                * Positive changes! Your Pitta levels are decreasing, indicating better balance.
              </p>
            </Card>

            {/* Weekly Summary */}
            <Card className="p-5 bg-gradient-subtle">
              <h3 className="font-semibold mb-4 text-foreground">This Week's Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Energy</span>
                    <span className="text-sm font-semibold text-foreground">7.5/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Digestion</span>
                    <span className="text-sm font-semibold text-foreground">8.2/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Sleep</span>
                    <span className="text-sm font-semibold text-foreground">7.8/10</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Mood</span>
                    <span className="text-sm font-semibold text-foreground">8.0/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Check-ins</span>
                    <span className="text-sm font-semibold text-foreground">7/7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Points Earned</span>
                    <span className="text-sm font-semibold text-foreground">105 pts</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diet Plan Dialog */}
      <Dialog open={showDietDialog} onOpenChange={setShowDietDialog}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Your Personalized Diet Plan</DialogTitle>
            <DialogDescription>
              Viewing from 8000+ Ayurvedic recipes • Click on any food item to see detailed information
            </DialogDescription>
          </DialogHeader>

          {/* Daily Totals Summary */}
          <Card className="p-5 bg-gradient-primary border-primary">
            <h3 className="font-semibold text-lg mb-4 text-primary-foreground">Daily Nutritional Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{dailyTotals.calories}</p>
                <p className="text-xs text-primary-foreground/80">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{dailyTotals.protein.toFixed(1)}g</p>
                <p className="text-xs text-primary-foreground/80">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{dailyTotals.carbs.toFixed(1)}g</p>
                <p className="text-xs text-primary-foreground/80">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{dailyTotals.fats.toFixed(1)}g</p>
                <p className="text-xs text-primary-foreground/80">Fats</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{dailyTotals.fiber.toFixed(1)}g</p>
                <p className="text-xs text-primary-foreground/80">Fiber</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <h4 className="font-medium text-sm text-primary-foreground mb-2">Ayurvedic Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-primary-foreground/90">
                <div>
                  <span className="font-medium">Dominant Potency:</span> {ayurvedicSummary.dominantPotency}
                </div>
                <div>
                  <span className="font-medium">Overall Effect:</span> {ayurvedicSummary.overallEffect}
                </div>
              </div>
            </div>
          </Card>

          {/* Meal Plan by Category */}
          <div className="space-y-4 mt-4">
            {['Breakfast', 'Mid-morning Snack', 'Lunch', 'Evening Snack', 'Dinner', 'Bedtime'].map((mealType) => {
              const mealItems = foodItems.filter(f => f.meal === mealType);
              if (mealItems.length === 0) return null;
              
              return (
                <div key={mealType}>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-primary" />
                    {mealType}
                  </h3>
                  <div className="grid gap-2">
                    {mealItems.map((food) => (
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
                </div>
              );
            })}
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
                      Meaningful alternatives with similar nutritional & Ayurvedic properties:
                    </p>
                    {getAlternatives(selectedFood.id).map((food) => (
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
