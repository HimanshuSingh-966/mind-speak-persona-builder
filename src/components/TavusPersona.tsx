
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";

interface TavusPersonaProps {
  persona: {
    persona_id: string;
    replica_id: string;
    name: string;
  };
  isActive: boolean;
  context?: {
    domain: string;
    currentQuestion: any;
    questionIndex: number;
  };
}

const TavusPersona: React.FC<TavusPersonaProps> = ({ persona, isActive, context }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initializeTavusPersona();
  }, [persona.persona_id, persona.replica_id]);

  const initializeTavusPersona = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize Tavus persona with API call
      const response = await fetch(`https://api.tavus.io/v2/personas/${persona.persona_id}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "ad5d3448d9d24478b8d2175b9b4a821e"
        },
        body: JSON.stringify({
          "replica_id": persona.replica_id,
          "context": {
            "user_name": "Candidate",
            "interview_domain": context?.domain || "general",
            "current_question_index": context?.questionIndex || 0,
            "persona_name": persona.name
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to initialize persona: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🎤 Tavus persona initialized:", data);
      
      // Load the Tavus embed
      loadTavusEmbed();
      setIsConnected(true);
      
    } catch (err) {
      console.error("❌ Tavus initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize AI persona");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTavusEmbed = () => {
    if (iframeRef.current) {
      const embedUrl = `https://embed.tavus.io/persona/${persona.persona_id}/replica/${persona.replica_id}`;
      iframeRef.current.src = embedUrl;
      
      iframeRef.current.onload = () => {
        setIsLoading(false);
      };
      
      iframeRef.current.onerror = () => {
        setError("Failed to load AI persona interface");
        setIsLoading(false);
      };
    }
  };

  const handleRetry = () => {
    initializeTavusPersona();
  };

  if (error) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Connection Error</h3>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button onClick={handleRetry} variant="outline">
              Try Again
            </Button>
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
              Initializing {persona.name}...
            </p>
          </div>
        </div>
      )}
      
      {/* Tavus Embed */}
      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        <iframe
          ref={iframeRef}
          title={`${persona.name} - AI Interviewer`}
          className="w-full h-96 rounded-lg border-0"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen"
          style={{
            minHeight: '400px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />
      </div>
      
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isConnected ? '🟢 Connected' : '🟡 Connecting...'}
        </div>
      </div>
    </div>
  );
};

export default TavusPersona;
