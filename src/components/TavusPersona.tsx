
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Mic, MicOff, Play } from "lucide-react";

interface TavusPersonaProps {
  persona: {
    persona_id: string;
    replica_id: string;
    name: string;
  };
  isActive: boolean;
  context?: {
    domain: string;
    questions: any[];
    questionIndex: number;
  };
}

const TavusPersona: React.FC<TavusPersonaProps> = ({ persona, isActive, context }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [personaData, setPersonaData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (isActive) {
      initializeTavusPersona();
    }
  }, [persona.persona_id, isActive]);

  const initializeTavusPersona = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`🎤 Initializing Tavus persona: ${persona.name}`);
      
      // Fetch persona data from Tavus API
      await fetchPersonaData();
      
    } catch (err) {
      console.error("❌ Tavus initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize AI persona");
      setIsLoading(false);
    }
  };

  const fetchPersonaData = async () => {
    try {
      const options = {
        method: 'GET', 
        headers: {'x-api-key': 'ad5d3448d9d24478b8d2175b9b4a821e'}
      };

      const response = await fetch(`https://tavusapi.com/v2/personas/${persona.persona_id}`, options);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch persona: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Persona data fetched:", data);
      
      setPersonaData(data);
      setIsLoading(false);
      setIsConnected(true);
      
    } catch (err) {
      console.error("❌ Failed to fetch persona data:", err);
      throw err;
    }
  };

  const handleRetry = () => {
    setError(null);
    initializeTavusPersona();
  };

  const toggleMicrophone = async () => {
    try {
      if (!isMicEnabled) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicEnabled(true);
        console.log("🎙️ Microphone enabled");
        stream.getTracks().forEach(track => track.stop());
      } else {
        setIsMicEnabled(false);
        console.log("🔇 Microphone disabled");
      }
    } catch (err) {
      console.error("❌ Microphone access error:", err);
      setError("Microphone access denied. Please enable microphone permissions.");
    }
  };

  const startConversation = () => {
    if (context?.questions && context.questions.length > 0) {
      console.log("🗣️ Starting conversation with first question:", context.questions[0]);
      // Here you would typically start the actual conversation with Tavus
      // For now, we'll simulate the conversation flow
    }
  };

  if (error) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Connection Error</h3>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="space-x-2">
              <Button onClick={handleRetry} variant="outline">
                Try Again
              </Button>
              <Button onClick={toggleMicrophone} variant="outline">
                <Mic className="h-4 w-4 mr-2" />
                Enable Mic
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 rounded-lg">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-sm text-gray-600">
              Loading {persona.name}...
            </p>
            <p className="text-xs text-gray-500">
              Please allow microphone access when prompted
            </p>
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleMicrophone}
          className={`bg-white/90 ${isMicEnabled ? 'text-green-600' : 'text-gray-600'}`}
        >
          {isMicEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Persona Interface */}
      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        <div className="w-full h-[600px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
             style={{
               minHeight: '600px',
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
             }}>
          {isConnected && personaData ? (
            <div className="text-center text-white space-y-4">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
                <div className="text-4xl">🤖</div>
              </div>
              <h3 className="text-2xl font-bold">{persona.name}</h3>
              <p className="text-lg opacity-90">AI Interview Assistant</p>
              
              {!isMicEnabled ? (
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="mb-3">Enable your microphone to start the interview</p>
                  <Button onClick={toggleMicrophone} className="bg-white text-purple-600 hover:bg-gray-100">
                    <Mic className="h-4 w-4 mr-2" />
                    Enable Microphone
                  </Button>
                </div>
              ) : (
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="mb-3">Ready to start your interview!</p>
                  <Button onClick={startConversation} className="bg-white text-purple-600 hover:bg-gray-100">
                    <Play className="h-4 w-4 mr-2" />
                    Begin Interview
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-white">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p>Connecting to {persona.name}...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isConnected ? '🟢 Connected' : '🟡 Loading...'}
        </div>
      </div>

      {/* Instructions */}
      {isConnected && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Interview Instructions</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {persona.name} will ask you {context?.questions?.length || 0} questions</li>
            <li>• Speak clearly and naturally</li>
            <li>• Take your time to think before answering</li>
            <li>• The AI will guide you through each question</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TavusPersona;
