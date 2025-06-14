import { supabase } from '@/integrations/supabase/client';

interface TestUser {
  email: string;
  password: string;
  fullName: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  religion: string;
  community: string;
  profession: string;
  education: string;
  bio: string;
  photos: string[];
  verified: boolean;
}

const femaleProfiles: Omit<TestUser, 'email' | 'password'>[] = [
  {
    fullName: 'Ananya Sharma',
    age: 27,
    gender: 'female',
    location: 'Mumbai, India',
    religion: 'Hindu',
    community: 'Kayastha',
    profession: 'Product Manager',
    education: 'MBA',
    bio: 'Love traveling, reading, and trying new cuisines. Looking for a life partner ready for marriage 😇',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Kavya Reddy',
    age: 26,
    gender: 'female',
    location: 'Hyderabad, India',
    religion: 'Hindu',
    community: 'Reddy',
    profession: 'Doctor',
    education: 'MBBS',
    bio: 'Passionate about healthcare. Love classical music and dancing.',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Priya Mehra',
    age: 25,
    gender: 'female',
    location: 'Delhi, India',
    religion: 'Sikh',
    community: 'Khatri',
    profession: 'Designer',
    education: 'B.Des',
    bio: 'Into art, minimalism, and coffee.',
    photos: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Simran Kaur',
    age: 29,
    gender: 'female',
    location: 'Chandigarh, India',
    religion: 'Sikh',
    community: 'Bedi',
    profession: 'Teacher',
    education: 'B.Ed',
    bio: 'Finding happiness in small moments.',
    photos: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Neha Gupta',
    age: 30,
    gender: 'female',
    location: 'Kolkata, India',
    religion: 'Hindu',
    community: 'Gupta',
    profession: 'Chartered Accountant',
    education: 'CA',
    bio: 'Balance in work and life.',
    photos: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Pooja Desai',
    age: 28,
    gender: 'female',
    location: 'Ahmedabad, India',
    religion: 'Jain',
    community: 'Oswal',
    profession: 'Entrepreneur',
    education: 'M.Com',
    bio: 'Growth mindset. Looking for a meaningful partnership.',
    photos: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Mansi Singh',
    age: 24,
    gender: 'female',
    location: 'Lucknow, India',
    religion: 'Hindu',
    community: 'Rajput',
    profession: 'Software Engineer',
    education: 'B.Tech',
    bio: 'Code, tea, and indie music.',
    photos: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Ritika Verma',
    age: 25,
    gender: 'female',
    location: 'Pune, India',
    religion: 'Hindu',
    community: 'Brahmin',
    profession: 'Digital Marketer',
    education: 'MBA',
    bio: 'Creativity is my superpower.',
    photos: ['https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Juhi Chawla',
    age: 28,
    gender: 'female',
    location: 'Jaipur, India',
    religion: 'Jain',
    community: 'Agarwal',
    profession: 'Architect',
    education: 'B.Arch',
    bio: 'Interested in history and travel.',
    photos: ['https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Shreya Das',
    age: 27,
    gender: 'female',
    location: 'Bhubaneswar, India',
    religion: 'Hindu',
    community: 'Kayastha',
    profession: 'Journalist',
    education: 'MA',
    bio: 'Stories shape the world.',
    photos: ['https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=400&fit=crop&crop=face'],
    verified: true
  }
];

const maleProfiles: Omit<TestUser, 'email' | 'password'>[] = [
  {
    fullName: 'Rahul Gupta',
    age: 29,
    gender: 'male',
    location: 'Bangalore, India',
    religion: 'Hindu',
    community: 'Gupta',
    profession: 'Software Engineer',
    education: 'B.Tech',
    bio: 'Tech enthusiast, fitness lover, family-oriented.',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Aman Singh',
    age: 31,
    gender: 'male',
    location: 'Delhi, India',
    religion: 'Sikh',
    community: 'Singh',
    profession: 'Investment Banker',
    education: 'MBA',
    bio: 'Ambitious, loves cricket and photography.',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Rohit Shetty',
    age: 28,
    gender: 'male',
    location: 'Mumbai, India',
    religion: 'Hindu',
    community: 'Shetty',
    profession: 'Event Manager',
    education: 'BBA',
    bio: 'Always up for new adventures.',
    photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Manav Patel',
    age: 27,
    gender: 'male',
    location: 'Ahmedabad, India',
    religion: 'Jain',
    community: 'Patel',
    profession: 'Accountant',
    education: 'CA',
    bio: 'Simple and sincere. Searching for a meaningful bond.',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Samar Verma',
    age: 32,
    gender: 'male',
    location: 'Pune, India',
    religion: 'Hindu',
    community: 'Brahmin',
    profession: 'Civil Engineer',
    education: 'M.Tech',
    bio: 'Nature, books, and building things.',
    photos: ['https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Iqbal Khan',
    age: 26,
    gender: 'male',
    location: 'Hyderabad, India',
    religion: 'Muslim',
    community: 'Khan',
    profession: 'Business Analyst',
    education: 'MBA',
    bio: 'Solving puzzles, calculation, and chess.',
    photos: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Karan Mehta',
    age: 28,
    gender: 'male',
    location: 'Chandigarh, India',
    religion: 'Hindu',
    community: 'Mehta',
    profession: 'Graphic Designer',
    education: 'BFA',
    bio: 'Making the world more colorful.',
    photos: ['https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face'],
    verified: false
  },
  {
    fullName: 'Mohit Suri',
    age: 29,
    gender: 'male',
    location: 'Lucknow, India',
    religion: 'Hindu',
    community: 'Suri',
    profession: 'Doctor',
    education: 'MBBS',
    bio: 'Helping people feel their best.',
    photos: ['https://images.unsplash.com/photo-1478199222138-5c5b6fcf0dd8?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Abhishek Jain',
    age: 30,
    gender: 'male',
    location: 'Jaipur, India',
    religion: 'Jain',
    community: 'Jain',
    profession: 'Entrepreneur',
    education: 'M.Com',
    bio: 'Dreamer & doer, building my dreams brick by brick.',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face'],
    verified: true
  },
  {
    fullName: 'Harsh Vyas',
    age: 29,
    gender: 'male',
    location: 'Kolkata, India',
    religion: 'Hindu',
    community: 'Vyas',
    profession: 'Journalist',
    education: 'MA',
    bio: 'Love to ask questions and write answers. :)',
    photos: ['https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=400&h=400&fit=crop&crop=face'],
    verified: false
  }
];

export const generateTestUsers = async () => {
  console.log('🚀 Starting test user generation...');
  
  // Use example.com domain which is valid and commonly accepted
  const allProfiles = [
    ...femaleProfiles.map((profile, index) => ({
      ...profile,
      email: `female${index + 1}@example.com`,
      password: 'TestUser123!'
    })),
    ...maleProfiles.map((profile, index) => ({
      ...profile,
      email: `male${index + 1}@example.com`,
      password: 'TestUser123!'
    }))
  ];

  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[]
  };

  for (const userProfile of allProfiles) {
    try {
      console.log(`📝 Creating user: ${userProfile.fullName} (${userProfile.email})`);
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userProfile.email,
        password: userProfile.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userProfile.fullName
          }
        }
      });

      if (authError) {
        console.error(`❌ Auth error for ${userProfile.fullName}:`, authError);
        results.failed++;
        results.errors.push(`Auth error for ${userProfile.fullName}: ${authError.message}`);
        continue;
      }

      if (!authData.user) {
        console.error(`❌ No user returned for ${userProfile.fullName}`);
        results.failed++;
        results.errors.push(`No user returned for ${userProfile.fullName}`);
        continue;
      }

      // Wait a bit for the user to be created
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: userProfile.fullName,
          age: userProfile.age,
          gender: userProfile.gender,
          location: userProfile.location,
          religion: userProfile.religion,
          community: userProfile.community,
          profession: userProfile.profession,
          education: userProfile.education,
          bio: userProfile.bio,
          photos: userProfile.photos,
          verified: userProfile.verified,
          profile_visibility: 'everyone'
        });

      if (profileError) {
        console.error(`❌ Profile error for ${userProfile.fullName}:`, profileError);
        results.failed++;
        results.errors.push(`Profile error for ${userProfile.fullName}: ${profileError.message}`);
        continue;
      }

      console.log(`✅ Successfully created ${userProfile.fullName}`);
      results.success++;

    } catch (error) {
      console.error(`❌ Unexpected error for ${userProfile.fullName}:`, error);
      results.failed++;
      results.errors.push(`Unexpected error for ${userProfile.fullName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  console.log('🎉 Test user generation complete!');
  console.log(`✅ Success: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('Errors:', results.errors);
  }

  return results;
};
