import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const RegisterDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your application has been submitted for review. You will receive confirmation within 24-48 hours.",
      });
      navigate('/login');
    }, 2000);
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Delhi', 'Lakshadweep', 'Puducherry'
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Doctor Registration
          </h1>
          <p className="text-muted-foreground">Join our network of Ayurvedic practitioners</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Registration</CardTitle>
            <CardDescription>
              Please provide your professional details for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Dr. Rajesh" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Sharma" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="doctor@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" required />
                  </div>
                </div>
              </div>

              {/* Professional Credentials */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Professional Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emrId">EMR ID</Label>
                    <Input id="emrId" placeholder="EMR-XXXX-XXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Medical Registration Number</Label>
                    <Input id="registrationNumber" placeholder="MCI/SMC Registration No." required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Highest Qualification</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bams">BAMS</SelectItem>
                        <SelectItem value="md-ayurveda">MD (Ayurveda)</SelectItem>
                        <SelectItem value="ms-ayurveda">MS (Ayurveda)</SelectItem>
                        <SelectItem value="phd-ayurveda">PhD (Ayurveda)</SelectItem>
                        <SelectItem value="diploma-ayurveda">Diploma in Ayurveda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfPassing">Year of Passing</Label>
                    <Input id="yearOfPassing" type="number" placeholder="2020" min="1950" max="2024" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input id="college" placeholder="Name of Ayurvedic College" required />
                </div>
              </div>

              {/* Practice Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Practice Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Practice</SelectItem>
                        <SelectItem value="panchakarma">Panchakarma</SelectItem>
                        <SelectItem value="kayachikitsa">Kayachikitsa</SelectItem>
                        <SelectItem value="shalya">Shalya Tantra</SelectItem>
                        <SelectItem value="prasuti">Prasuti Tantra</SelectItem>
                        <SelectItem value="kaumarbhritya">Kaumarbhritya</SelectItem>
                        <SelectItem value="rasayana">Rasayana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic/Hospital Name</Label>
                    <Input id="clinicName" placeholder="Name of your practice" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Practice Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Complete address of your clinic/hospital"
                    rows={3}
                    required 
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Additional Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Brief description of your practice philosophy and approach"
                    rows={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="healing"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting Application..." : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-sm"
          >
            ← Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterDoctor;