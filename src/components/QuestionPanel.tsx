
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, HelpCircle, Star } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestionPanelProps {
  questions: Question[];
  currentQuestionIndex: number;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  domain: any;
  isInterviewStarted: boolean;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questions,
  currentQuestionIndex,
  onNextQuestion,
  onPrevQuestion,
  domain,
  isInterviewStarted
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'technical' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  if (!isInterviewStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>Question Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What to Expect</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {questions.filter(q => q.type === 'technical').length} Technical Questions</li>
                <li>• {questions.filter(q => q.type === 'behavioral').length} Behavioral Questions</li>
                <li>• Mix of easy, medium, and hard difficulty levels</li>
                <li>• Interactive discussion with AI persona</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Sample Questions:</h4>
              {questions.slice(0, 3).map((question, index) => (
                <div key={question.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>
                    <div className="flex space-x-1">
                      <Badge className={`text-xs ${getTypeColor(question.type)}`}>
                        {question.type}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{question.question}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Current Question</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Badge className={`text-xs ${getTypeColor(currentQuestion?.type || 'technical')}`}>
                {currentQuestion?.type || 'Technical'}
              </Badge>
              <Badge className={`text-xs ${getDifficultyColor(currentQuestion?.difficulty || 'medium')}`}>
                {currentQuestion?.difficulty || 'Medium'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Badge variant="outline" className="mb-3">
              {currentQuestion?.category || 'General'}
            </Badge>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <p className="text-lg text-gray-900 leading-relaxed">
                {currentQuestion?.question || 'Loading question...'}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={onPrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              
              <Button
                variant="outline"
                onClick={onNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Progress Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-sm text-gray-600">Current</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {questions.length - currentQuestionIndex - 1}
                </div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPanel;
