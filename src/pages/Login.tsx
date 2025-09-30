import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to your AyuAahaar dashboard",
      });
      navigate('/dashboard');
    }, 1000);
  };

  const handlePractitionerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login and redirect to practitioner dashboard
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Practitioner Login Successful",
        description: "Redirecting to practitioner dashboard...",
      });
      window.location.href = 'http://localhost:8082';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AyuAahaar
          </h1>
          <p className="text-muted-foreground">Welcome back to your wellness journey</p>
        </div>

        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="practitioner">Practitioner</TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <Card>
              <CardHeader>
                <CardTitle>Patient Login</CardTitle>
                <CardDescription>Access your personalized wellness dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input 
                      id="patient-email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <Input 
                      id="patient-password" 
                      type="password" 
                      placeholder="Enter your password"
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="ayurvedic"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practitioner">
            <Card>
              <CardHeader>
                <CardTitle>Practitioner Login</CardTitle>
                <CardDescription>Access your practice management system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePractitionerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-email">Email</Label>
                    <Input 
                      id="practitioner-email" 
                      type="email" 
                      placeholder="doctor@example.com"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-password">Password</Label>
                    <Input 
                      id="practitioner-password" 
                      type="password" 
                      placeholder="Enter your password"
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="healing"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/register-doctor')}
                  >
                    Register as Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-sm"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;