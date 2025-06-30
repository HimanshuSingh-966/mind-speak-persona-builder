
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, Pause, RotateCcw, MessageCircle } from "lucide-react";
import TavusPersona from "@/components/TavusPersona";
import { getQuestionsForDomain } from "@/utils/questionData";

interface Domain {
  id: string;
  title: string;
  description: string;
  color: string;
  persona: {
    persona_id: string;
    replica_id: string;
    name: string;
  };
  questionCount: number;
  duration: string;
}

interface InterviewDomainProps {
  domain: Domain;
  onBack: () => void;
}

const InterviewDomain: React.FC<InterviewDomainProps> = ({ domain, onBack }) => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const domainQuestions = getQuestionsForDomain(domain.id);
    setQuestions(domainQuestions);
  }, [domain.id]);

  const handleStartInterview = () => {
    setIsInterviewStarted(true);
    console.log(`🎤 Starting interview for ${domain.title} with ${domain.persona.name}`);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsInterviewStarted(false);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Domains</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{domain.title}</h1>
                <p className="text-gray-600">AI Interviewer: {domain.persona.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isInterviewStarted && (
                <>
                  <Button
                    variant="outline"
                    onClick={handlePauseResume}
                    className="flex items-center space-x-2"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </Button>
                </>
              )}
              <Badge variant="secondary" className="px-3 py-1">
                {questions.length} Questions Total
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Persona Section - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>AI Interviewer - {domain.persona.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isInterviewStarted ? (
              <TavusPersona 
                persona={domain.persona}
                isActive={!isPaused}
                context={{
                  domain: domain.id,
                  questions: questions,
                  questionIndex: 0
                }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to meet {domain.persona.name}?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your AI interviewer will ask you {questions.length} carefully selected questions 
                    for the {domain.title} position. No need to read questions - 
                    {domain.persona.name} will guide you through the entire interview.
                  </p>
                  <Button 
                    onClick={handleStartInterview}
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Interview</span>
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 space-y-2">
                  <p>• {questions.filter(q => q.type === 'technical').length} Technical Questions</p>
                  <p>• {questions.filter(q => q.type === 'behavioral').length} Behavioral Questions</p>
                  <p>• Estimated duration: {domain.duration}</p>
                  <p>• Interactive conversation with {domain.persona.name}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewDomain;
