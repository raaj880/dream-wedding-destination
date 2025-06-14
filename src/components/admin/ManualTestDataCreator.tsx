
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const ManualTestDataCreator: React.FC = () => {
  const [emailPasswordData, setEmailPasswordData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResults(null);
    
    try {
      // Parse the input data
      const lines = emailPasswordData.trim().split('\n');
      const userData: { email: string; password: string; fullName?: string }[] = [];
      
      for (const line of lines) {
        const parts = line.trim().split(',').map(part => part.trim());
        if (parts.length >= 2) {
          userData.push({
            email: parts[0],
            password: parts[1],
            fullName: parts[2] || parts[0].split('@')[0] // Use email prefix if no name provided
          });
        }
      }

      if (userData.length === 0) {
        throw new Error('No valid email/password pairs found');
      }

      const results = {
        success: 0,
        failed: 0,
        errors: [] as string[]
      };

      for (const user of userData) {
        try {
          console.log(`📝 Creating user: ${user.email}`);
          
          // Create user in Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
              emailRedirectTo: `${window.location.origin}/`,
              data: {
                full_name: user.fullName
              }
            }
          });

          if (authError) {
            console.error(`❌ Auth error for ${user.email}:`, authError);
            results.failed++;
            results.errors.push(`Auth error for ${user.email}: ${authError.message}`);
            continue;
          }

          if (!authData.user) {
            console.error(`❌ No user returned for ${user.email}`);
            results.failed++;
            results.errors.push(`No user returned for ${user.email}`);
            continue;
          }

          // Wait a bit for the user to be created
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Create basic profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              full_name: user.fullName,
              profile_visibility: 'everyone'
            });

          if (profileError) {
            console.error(`❌ Profile error for ${user.email}:`, profileError);
            results.failed++;
            results.errors.push(`Profile error for ${user.email}: ${profileError.message}`);
            continue;
          }

          console.log(`✅ Successfully created ${user.email}`);
          results.success++;

        } catch (error) {
          console.error(`❌ Unexpected error for ${user.email}:`, error);
          results.failed++;
          results.errors.push(`Unexpected error for ${user.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      console.log('🎉 Manual user creation complete!');
      setResults(results);

    } catch (error) {
      console.error('Error processing manual data:', error);
      setResults({
        success: 0,
        failed: 0,
        errors: [`Failed to process data: ${error instanceof Error ? error.message : 'Unknown error'}`]
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Manual Test Data Creator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">
            Enter email and password pairs, one per line. Format:
          </p>
          <code className="text-sm bg-gray-100 p-2 rounded block mb-2">
            email@example.com, password123<br/>
            user2@example.com, mypassword, Optional Full Name
          </code>
        </div>
        
        <Textarea
          placeholder="user1@example.com, password123, John Doe&#10;user2@example.com, mypass456, Jane Smith&#10;..."
          value={emailPasswordData}
          onChange={(e) => setEmailPasswordData(e.target.value)}
          rows={10}
          className="font-mono text-sm"
        />
        
        <Button 
          onClick={handleProcess} 
          disabled={isProcessing || !emailPasswordData.trim()}
          className="w-full"
        >
          {isProcessing ? 'Creating Users...' : 'Create Users from Data'}
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Creation Results:</h3>
            <div className="space-y-2">
              <p className="text-green-600">✅ Successfully created: {results.success} users</p>
              <p className="text-red-600">❌ Failed: {results.failed} users</p>
              
              {results.errors.length > 0 && (
                <div>
                  <p className="font-medium text-red-600 mb-1">Errors:</p>
                  <ul className="list-disc list-inside text-sm text-red-500 space-y-1 max-h-40 overflow-y-auto">
                    {results.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p><strong>Note:</strong> Users will be created with basic profiles. You can add more details later.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualTestDataCreator;
