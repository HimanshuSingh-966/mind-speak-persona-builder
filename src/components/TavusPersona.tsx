
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Mic, MicOff } from "lucide-react";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  useEffect(() => {
    if (isActive) {
      initializeTavusPersona();
    }
  }, [persona.persona_id, persona.replica_id, isActive]);

  const initializeTavusPersona = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`🎤 Initializing Tavus persona: ${persona.name}`);
      
      // Load the embed with question context
      loadTavusEmbed();
      
    } catch (err) {
      console.error("❌ Tavus initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize AI persona");
      setIsLoading(false);
    }
  };

  const loadTavusEmbed = () => {
    if (iframeRef.current) {
      // Create the embed URL with questions as context
      const baseUrl = `https://embed.tavus.io/${persona.persona_id}`;
      const params = new URLSearchParams({
        replica_id: persona.replica_id,
        user_name: "Candidate",
        domain: context?.domain || "general",
        persona_name: persona.name,
        // Pass questions as context so persona can ask them
        questions: JSON.stringify(context?.questions || []),
        total_questions: context?.questions?.length?.toString() || "0"
      });
      
      const embedUrl = `${baseUrl}?${params.toString()}`;
      
      console.log("🔗 Loading Tavus embed:", embedUrl);
      
      iframeRef.current.src = embedUrl;
      
      // Set up iframe event listeners
      iframeRef.current.onload = () => {
        console.log("✅ Tavus persona loaded successfully");
        setIsLoading(false);
        setIsConnected(true);
      };
      
      iframeRef.current.onerror = (event) => {
        console.error("❌ Iframe loading error:", event);
        setError("Failed to load AI persona interface");
        setIsLoading(false);
      };

      // Fallback timeout
      setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setIsConnected(true);
        }
      }, 5000);
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
      
      {/* Tavus Embed */}
      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        <iframe
          ref={iframeRef}
          title={`${persona.name} - AI Interviewer`}
          className="w-full h-[600px] rounded-lg border-0"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen; display-capture"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          style={{
            minHeight: '600px',
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
