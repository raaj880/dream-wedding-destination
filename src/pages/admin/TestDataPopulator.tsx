import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TestDataPopulator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const testUsers = [
    // Male users
    { email: 'arjun.sharma@test.com', password: 'Test@123', fullName: 'Arjun Sharma', age: 28, gender: 'male', location: 'Bangalore, Karnataka', profession: 'Software Engineer', education: 'B.Tech in Computer Science', bio: 'Software engineer passionate about technology and travel. Looking for a life partner who shares similar values.', religion: 'Hindu', community: 'brahmin', height: 175, dob: '1996-03-15', timeOfBirth: '10:30:00', placeOfBirth: 'Mysore', languages: ['Kannada', 'English', 'Hindi'], marryTimeframe: 'within_1_year', partnerAgeMin: 24, partnerAgeMax: 30, partnerLocation: 'Bangalore, Karnataka', rashi: 'Mesha', nakshatra: 'Ashwini', gothra: 'Bharadvaja', dosha: 'None' },
    { email: 'rajesh.kumar@test.com', password: 'Test@123', fullName: 'Rajesh Kumar', age: 32, gender: 'male', location: 'Hubli, Karnataka', profession: 'Business Owner', education: 'MBA in Finance', bio: 'Business owner with strong family values. Enjoy reading and outdoor activities.', religion: 'Hindu', community: 'lingayat', height: 180, dob: '1992-07-20', timeOfBirth: '14:15:00', placeOfBirth: 'Dharwad', languages: ['Kannada', 'English'], marryTimeframe: 'within_2_years', partnerAgeMin: 26, partnerAgeMax: 32, partnerLocation: 'Karnataka', rashi: 'Vrishabha', nakshatra: 'Rohini', gothra: 'Kashyapa', dosha: 'None' },
    { email: 'vikram.reddy@test.com', password: 'Test@123', fullName: 'Vikram Reddy', age: 30, gender: 'male', location: 'Mangalore, Karnataka', profession: 'Doctor', education: 'MBBS, MD', bio: 'Doctor working in a reputed hospital. Love music and cooking.', religion: 'Hindu', community: 'kuruba', height: 178, dob: '1994-11-08', timeOfBirth: '06:45:00', placeOfBirth: 'Udupi', languages: ['Kannada', 'Tulu', 'English'], marryTimeframe: 'within_1_year', partnerAgeMin: 25, partnerAgeMax: 30, partnerLocation: 'South Karnataka', rashi: 'Mithuna', nakshatra: 'Punarvasu', gothra: 'Atri', dosha: 'None' },
    { email: 'sanjay.gowda@test.com', password: 'Test@123', fullName: 'Sanjay Gowda', age: 27, gender: 'male', location: 'Mysore, Karnataka', profession: 'Civil Engineer', education: 'B.E. in Civil Engineering', bio: 'Civil engineer with a passion for sustainable development.', religion: 'Hindu', community: 'others', height: 172, dob: '1997-01-25', timeOfBirth: '08:20:00', placeOfBirth: 'Mandya', languages: ['Kannada', 'English'], marryTimeframe: 'open_to_wait', partnerAgeMin: 23, partnerAgeMax: 29, partnerLocation: 'Karnataka', rashi: 'Karka', nakshatra: 'Pushya', gothra: 'Jamadagni', dosha: 'Mangal' },
    { email: 'anil.patel@test.com', password: 'Test@123', fullName: 'Anil Patel', age: 35, gender: 'male', location: 'Belgaum, Karnataka', profession: 'Chartered Accountant', education: 'CA, B.Com', bio: 'Chartered Accountant with own practice. Value honesty and integrity.', religion: 'Hindu', community: 'brahmin', height: 176, dob: '1989-09-12', timeOfBirth: '11:00:00', placeOfBirth: 'Belgaum', languages: ['Kannada', 'Marathi', 'English'], marryTimeframe: 'within_2_years', partnerAgeMin: 28, partnerAgeMax: 35, partnerLocation: 'North Karnataka', rashi: 'Simha', nakshatra: 'Magha', gothra: 'Vishwamitra', dosha: 'None' },
    // Female users
    { email: 'priya.nair@test.com', password: 'Test@123', fullName: 'Priya Nair', age: 26, gender: 'female', location: 'Bangalore, Karnataka', profession: 'Software Developer', education: 'B.Tech in Information Technology', bio: 'Software developer who loves art and classical dance. Looking for someone with similar interests.', religion: 'Hindu', community: 'brahmin', height: 162, dob: '1998-05-18', timeOfBirth: '09:15:00', placeOfBirth: 'Bangalore', languages: ['Kannada', 'Malayalam', 'English'], marryTimeframe: 'within_1_year', partnerAgeMin: 26, partnerAgeMax: 32, partnerLocation: 'Bangalore, Karnataka', rashi: 'Kanya', nakshatra: 'Hasta', gothra: 'Vashishta', dosha: 'None' },
    { email: 'deepika.rao@test.com', password: 'Test@123', fullName: 'Deepika Rao', age: 29, gender: 'female', location: 'Hubli, Karnataka', profession: 'School Teacher', education: 'M.Ed, B.Ed', bio: 'Teacher with a passion for education and social work.', religion: 'Hindu', community: 'lingayat', height: 158, dob: '1995-12-03', timeOfBirth: '16:30:00', placeOfBirth: 'Gadag', languages: ['Kannada', 'English', 'Hindi'], marryTimeframe: 'within_2_years', partnerAgeMin: 28, partnerAgeMax: 34, partnerLocation: 'Karnataka', rashi: 'Tula', nakshatra: 'Chitra', gothra: 'Gautama', dosha: 'None' },
    { email: 'anjali.hegde@test.com', password: 'Test@123', fullName: 'Anjali Hegde', age: 25, gender: 'female', location: 'Mangalore, Karnataka', profession: 'Pharmacist', education: 'B.Pharm', bio: 'Pharmacist working in a leading hospital. Enjoy cooking and gardening.', religion: 'Hindu', community: 'kuruba', height: 160, dob: '1999-08-22', timeOfBirth: '07:45:00', placeOfBirth: 'Mangalore', languages: ['Kannada', 'Tulu', 'English'], marryTimeframe: 'within_1_year', partnerAgeMin: 25, partnerAgeMax: 30, partnerLocation: 'Coastal Karnataka', rashi: 'Vrischika', nakshatra: 'Anuradha', gothra: 'Bharadvaja', dosha: 'None' },
    { email: 'meera.krishna@test.com', password: 'Test@123', fullName: 'Meera Krishna', age: 31, gender: 'female', location: 'Mysore, Karnataka', profession: 'Architect', education: 'B.Arch, M.Arch', bio: 'Architect with a love for heritage conservation and travel.', religion: 'Hindu', community: 'others', height: 165, dob: '1993-04-10', timeOfBirth: '12:00:00', placeOfBirth: 'Mysore', languages: ['Kannada', 'Tamil', 'English'], marryTimeframe: 'open_to_wait', partnerAgeMin: 30, partnerAgeMax: 36, partnerLocation: 'South India', rashi: 'Dhanu', nakshatra: 'Moola', gothra: 'Kashyapa', dosha: 'None' },
    { email: 'kavya.shetty@test.com', password: 'Test@123', fullName: 'Kavya Shetty', age: 24, gender: 'female', location: 'Udupi, Karnataka', profession: 'Fashion Designer', education: 'B.Design', bio: 'Fashion designer running my own boutique. Creative and ambitious.', religion: 'Hindu', community: 'brahmin', height: 163, dob: '2000-02-14', timeOfBirth: '05:30:00', placeOfBirth: 'Udupi', languages: ['Kannada', 'Tulu', 'English'], marryTimeframe: 'within_2_years', partnerAgeMin: 24, partnerAgeMax: 30, partnerLocation: 'Karnataka', rashi: 'Makara', nakshatra: 'Uttara Ashadha', gothra: 'Atri', dosha: 'Mangal' },
  ];

  const handlePopulateData = async () => {
    setIsProcessing(true);
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const user of testUsers) {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: user.fullName,
              age: user.age,
              gender: user.gender,
              location: user.location
            }
          }
        });

        if (authError) {
          failCount++;
          errors.push(`${user.email}: ${authError.message}`);
          continue;
        }

        if (!authData.user) {
          failCount++;
          errors.push(`${user.email}: No user returned`);
          continue;
        }

        // Wait for trigger to create profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update profile with detailed information
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            age: user.age,
            gender: user.gender,
            location: user.location,
            profession: user.profession,
            education: user.education,
            bio: user.bio,
            religion: user.religion,
            community: user.community,
            height: user.height,
            date_of_birth: user.dob,
            time_of_birth: user.timeOfBirth,
            place_of_birth: user.placeOfBirth,
            languages: user.languages,
            marry_timeframe: user.marryTimeframe,
            partner_age_range_min: user.partnerAgeMin,
            partner_age_range_max: user.partnerAgeMax,
            partner_location: user.partnerLocation,
            rashi: user.rashi,
            nakshatra: user.nakshatra,
            gothra: user.gothra,
            dosha: user.dosha,
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }

        successCount++;
      } catch (error) {
        failCount++;
        errors.push(`${user.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    setIsProcessing(false);

    toast({
      title: 'Test Data Population Complete',
      description: `✅ ${successCount} users created, ❌ ${failCount} failed`,
      variant: successCount === testUsers.length ? 'default' : 'destructive',
    });

    if (errors.length > 0) {
      console.error('Errors during population:', errors);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test Data Populator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm mb-2">This will create 10 test users:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>5 male users (Software Engineer, Business Owner, Doctor, Civil Engineer, CA)</li>
            <li>5 female users (Software Developer, Teacher, Pharmacist, Architect, Fashion Designer)</li>
          </ul>
          <p className="text-sm mt-3 text-muted-foreground">
            All users will have password: <code className="px-2 py-1 bg-background rounded">Test@123</code>
          </p>
        </div>

        <Button 
          onClick={handlePopulateData} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Creating Test Users...' : 'Populate Test Data'}
        </Button>

        <p className="text-xs text-muted-foreground">
          Note: Users will be created with complete profiles including jathaka details.
        </p>
      </CardContent>
    </Card>
  );
};

export default TestDataPopulator;
