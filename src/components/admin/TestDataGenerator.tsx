
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTestUsers } from '@/utils/generateTestData';

const TestDataGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults(null);
    
    try {
      const generationResults = await generateTestUsers();
      setResults(generationResults);
    } catch (error) {
      console.error('Error generating test data:', error);
      setResults({
        success: 0,
        failed: 20,
        errors: [`Failed to generate test data: ${error instanceof Error ? error.message : 'Unknown error'}`]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test Data Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          This will create 20 test users (10 male, 10 female) with complete profiles in your Supabase database.
          Each user will have a unique email and password (TestUser123!).
        </p>
        
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? 'Generating Test Users...' : 'Generate 20 Test Users'}
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Generation Results:</h3>
            <div className="space-y-2">
              <p className="text-green-600">✅ Successfully created: {results.success} users</p>
              <p className="text-red-600">❌ Failed: {results.failed} users</p>
              
              {results.errors.length > 0 && (
                <div>
                  <p className="font-medium text-red-600 mb-1">Errors:</p>
                  <ul className="list-disc list-inside text-sm text-red-500 space-y-1">
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
          <p><strong>Note:</strong> Test users will have emails like female1@wedder.app, male1@wedder.app, etc.</p>
          <p>All passwords are: <code>TestUser123!</code></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestDataGenerator;
