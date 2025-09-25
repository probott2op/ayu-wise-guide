import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wind, Flame, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoshaCardProps {
  type: 'vata' | 'pitta' | 'kapha';
  level: number;
  description: string;
  characteristics: string[];
  className?: string;
}

const doshaConfig = {
  vata: {
    name: 'Vata',
    element: 'Air & Space',
    icon: Wind,
    color: 'vata',
    description: 'Movement, creativity, and communication',
    qualities: ['Light', 'Dry', 'Cold', 'Mobile', 'Rough']
  },
  pitta: {
    name: 'Pitta',
    element: 'Fire & Water',
    icon: Flame,
    color: 'pitta',
    description: 'Transformation, digestion, and metabolism',
    qualities: ['Hot', 'Sharp', 'Light', 'Oily', 'Penetrating']
  },
  kapha: {
    name: 'Kapha',
    element: 'Earth & Water',
    icon: Mountain,
    color: 'kapha',
    description: 'Structure, stability, and immunity',
    qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth']
  }
};

export const DoshaCard: React.FC<DoshaCardProps> = ({ 
  type, 
  level, 
  description, 
  characteristics,
  className 
}) => {
  const config = doshaConfig[type];
  const IconComponent = config.icon;

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-medium group cursor-pointer border-l-4",
      `border-l-${config.color}`,
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
            `bg-${config.color}-light`
          )}>
            <IconComponent className={cn("w-6 h-6", `text-${config.color}`)} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{config.name}</h3>
            <p className="text-sm text-muted-foreground">{config.element}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn(`border-${config.color}`, `text-${config.color}`)}>
          {level}%
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Dosha Level</span>
            <span className="text-sm text-muted-foreground">{level}%</span>
          </div>
          <Progress 
            value={level} 
            className="h-2"
            style={{
              backgroundColor: `hsl(var(--${config.color}-light))`,
            }}
          />
        </div>

        <div>
          <p className="text-sm text-foreground mb-2 font-medium">Description</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div>
          <p className="text-sm text-foreground mb-2 font-medium">Key Qualities</p>
          <div className="flex flex-wrap gap-1">
            {config.qualities.map((quality) => (
              <Badge 
                key={quality} 
                variant="secondary" 
                className="text-xs"
              >
                {quality}
              </Badge>
            ))}
          </div>
        </div>

        {characteristics.length > 0 && (
          <div>
            <p className="text-sm text-foreground mb-2 font-medium">Your Characteristics</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {characteristics.slice(0, 3).map((char, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", `bg-${config.color}`)} />
                  {char}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};