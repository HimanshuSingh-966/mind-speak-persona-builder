
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, BarChart3, Users, Brain, Zap } from "lucide-react";
import InterviewDomain from "@/components/InterviewDomain";

const Index = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const domains = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'React, JavaScript, CSS, and UI/UX skills assessment',
      icon: Code,
      color: 'bg-blue-500',
      persona: {
        persona_id: "p3f85b2723cc",
        replica_id: "re0eae1fbe11",
        name: "Claire Dalton"
      },
      questionCount: 20,
      duration: '45-60 min'
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      description: 'APIs, databases, server architecture, and scalability',
      icon: Database,
      color: 'bg-green-500',
      persona: {
        persona_id: "p87da90823bb",
        replica_id: "r4dcf31b60e1",
        name: "Evelyn Cross"
      },
      questionCount: 20,
      duration: '45-60 min'
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'SQL, data visualization, statistics, and insights',
      icon: BarChart3,
      color: 'bg-purple-500',
      persona: {
        persona_id: "p2e3bf82d71f",
        replica_id: "re10607e3db7",
        name: "Eric Thompson"
      },
      questionCount: 20,
      duration: '45-60 min'
    }
  ];

  if (selectedDomain) {
    const domain = domains.find(d => d.id === selectedDomain);
    return (
      <InterviewDomain 
        domain={domain!} 
        onBack={() => setSelectedDomain(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mirror Mind</h1>
                <p className="text-gray-600">AI-Powered Technical Interview Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Powered by Tavus AI
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Interview Domain
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with AI personas that simulate real interview scenarios. 
            Get personalized feedback and improve your technical skills.
          </p>
        </div>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {domains.map((domain) => {
            const IconComponent = domain.icon;
            return (
              <Card 
                key={domain.id} 
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => setSelectedDomain(domain.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`${domain.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {domain.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {domain.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Questions:</span>
                      <Badge variant="outline">{domain.questionCount}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Duration:</span>
                      <Badge variant="outline">{domain.duration}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>AI Persona:</span>
                      <Badge variant="outline">{domain.persona.name}</Badge>
                    </div>
                  </div>
                  <Button 
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDomain(domain.id);
                    }}
                  >
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Why Choose Mirror Mind?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Personas</h4>
              <p className="text-gray-600">Interactive AI interviewers with unique personalities and expertise</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Feedback</h4>
              <p className="text-gray-600">Personalized insights and improvement suggestions</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Practice</h4>
              <p className="text-gray-600">Immediate responses and dynamic conversation flow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
