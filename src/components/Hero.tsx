import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Brain, Zap, Leaf, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-foreground rounded-full animate-pulse-soft" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-primary-foreground rounded-full animate-float" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary-foreground rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-primary-foreground rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Login Button at Top */}
          <div className="flex justify-end mb-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/login'}
              className="text-lg px-8 py-3 h-auto bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Leaf className="w-5 h-5 mr-2" />
              Login
            </Button>
          </div>

          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/30">
                  <Sparkles className="w-10 h-10 text-primary-foreground animate-pulse-soft" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-kapha animate-float" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tight">
              AyuAahaar
            </h1>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                Ancient Wisdom • Modern AI
              </Badge>
            </div>
          </div>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl text-primary-foreground/90 font-medium leading-relaxed">
              Your Personal Ayurvedic Intelligence System
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Discover your unique constitution, balance your doshas, and receive personalized 
              dietary and lifestyle recommendations based on 5,000 years of Ayurvedic wisdom, 
              powered by cutting-edge AI technology.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-vata-light flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5 text-vata" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground">Constitutional Analysis</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Comprehensive Prakriti assessment using AI-powered analysis of your physical, mental, and behavioral patterns.
              </p>
            </Card>

            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-pitta-light flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-pitta" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground">Personalized Nutrition</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Custom dietary plans based on your dosha, seasonal factors, and individual health goals with recipe suggestions.
              </p>
            </Card>

            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-kapha-light flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-kapha" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground">Lifestyle Guidance</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Holistic recommendations for daily routines, exercise, meditation, and seasonal adjustments for optimal balance.
              </p>
            </Card>
          </div>


          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">Ancient Wisdom</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Personalized Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span className="text-sm">Natural Healing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};