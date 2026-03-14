import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, MessageSquare } from 'lucide-react';
import { GoogleGenAI, Type, LiveServerMessage, Modality } from '@google/genai';
import { useCart } from '../context/CartContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PRODUCTS = {
  caja1: { id: 'caja1', name: 'CAJA 1 - Special Day', price: 35, image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773437294/Cajas_con_regalos_flotando_azul_fh7fun.jpg' },
  caja2: { id: 'caja2', name: 'CAJA 2 - Celebrations', price: 35, image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773437279/Cajas_con_regalos_flotando_blanca_t7bfw6.jpg' },
  caja3: { id: 'caja3', name: 'CAJA 3 - Novelty', price: 30, image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773439647/Cajas_con_regalos_flotando_rosa_s88aff.jpg' },
};

export default function VoiceAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<{role: 'user' | 'agent', text: string}[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const { addItem } = useCart();
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playbackQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inactivityTimerRef.current = setTimeout(() => {
      if (!isRecording) setShowTooltip(true);
    }, 10000);
    return () => clearTimeout(inactivityTimerRef.current!);
  }, [isRecording]);

  const resetInactivityTimer = () => {
    setShowTooltip(false);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!isRecording) setShowTooltip(true);
    }, 10000);
  };

  const playNextAudio = () => {
    if (playbackQueueRef.current.length === 0 || !audioContextRef.current) {
      isPlayingRef.current = false;
      return;
    }
    isPlayingRef.current = true;
    const buffer = playbackQueueRef.current.shift()!;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = playNextAudio;
    source.start();
    sourceNodeRef.current = source;
  };

  const decodeAndPlayAudio = async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    try {
      const binaryString = window.atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const pcmData = new Int16Array(bytes.buffer);
      const audioBuffer = audioContextRef.current.createBuffer(1, pcmData.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < pcmData.length; i++) {
        channelData[i] = pcmData[i] / 32768.0;
      }
      
      playbackQueueRef.current.push(audioBuffer);
      if (!isPlayingRef.current) {
        playNextAudio();
      }
    } catch (e) {
      console.error("Error decoding audio", e);
    }
  };

  const startRecording = async () => {
    try {
      setIsConnecting(true);
      resetInactivityTimer();
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
          systemInstruction: "Eres Padme, una asistente de voz amigable y eficiente para la tienda CONCARIÑO, que vende cajas de regalos personalizadas. Saluda diciendo: '¡Hola! Bienvenido a CONCARIÑO. ¿Te gustaría saber más acerca de opciones de regalos para tu persona especial?'. Puedes agregar productos al carrito usando la herramienta addToCart. Los productos son: CAJA 1 (special day, $35), CAJA 2 (celebrations, $35), CAJA 3 (novelty, $30). Confirma siempre la cantidad antes de agregar.",
          tools: [{
            functionDeclarations: [
              {
                name: 'addToCart',
                description: 'Agrega un producto al carrito de compras.',
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    productId: { type: Type.STRING, description: 'ID del producto (caja1, caja2, caja3)' },
                    quantity: { type: Type.NUMBER, description: 'Cantidad a agregar' }
                  },
                  required: ['productId', 'quantity']
                }
              }
            ]
          }],
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsRecording(true);
            
            sessionPromise.then(session => {
              session.sendRealtimeInput({
                clientContent: {
                  turns: [{ role: 'user', parts: [{ text: "Hola" }] }],
                  turnComplete: true
                }
              } as any);
            });

            processorRef.current!.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
              }
              
              const buffer = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < buffer.byteLength; i++) {
                binary += String.fromCharCode(buffer[i]);
              }
              const base64Data = btoa(binary);

              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  }
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            resetInactivityTimer();
            
            if (message.serverContent?.modelTurn) {
              const parts = message.serverContent.modelTurn.parts;
              for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                  decodeAndPlayAudio(part.inlineData.data);
                }
                if (part.text) {
                  setTranscript(prev => [...prev, { role: 'agent', text: part.text! }]);
                }
              }
            }
            
            if (message.serverContent?.interrupted) {
              if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
              }
              playbackQueueRef.current = [];
              isPlayingRef.current = false;
            }

            if (message.toolCall) {
              const calls = message.toolCall.functionCalls;
              const responses = [];
              for (const call of calls) {
                if (call.name === 'addToCart') {
                  const { productId, quantity } = call.args as any;
                  const product = PRODUCTS[productId as keyof typeof PRODUCTS];
                  if (product) {
                    addItem({ ...product, quantity });
                    responses.push({
                      id: call.id,
                      name: call.name,
                      response: { result: `Agregado ${quantity} de ${product.name} al carrito exitosamente.` }
                    });
                  } else {
                    responses.push({
                      id: call.id,
                      name: call.name,
                      response: { error: `Producto no encontrado: ${productId}` }
                    });
                  }
                }
              }
              if (responses.length > 0) {
                sessionPromise.then(session => {
                  session.sendToolResponse({ functionResponses: responses });
                });
              }
            }
          },
          onclose: () => {
            stopRecording();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            stopRecording();
          }
        }
      });
      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error("Failed to start recording:", err);
      setIsConnecting(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsConnecting(false);
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close());
      sessionRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
    }
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
  };

  const toggleRecording = () => {
    if (isRecording || isConnecting) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start">
      <AnimatePresence>
        {showTooltip && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-xs text-sm text-white"
          >
            <p>¡Hola! ¡Regala alegría, regala un detalle para recordar! Haz clic en el micrófono para pedir hablando conmigo.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRecording && transcript.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 w-80 max-h-64 overflow-y-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
              <MessageSquare size={16} className="text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Padme IA</span>
            </div>
            {transcript.slice(-3).map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === 'agent' ? 'text-cyan-100' : 'text-gray-300 text-right'}`}>
                {msg.text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleRecording}
        disabled={isConnecting}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        {isConnecting ? (
          <Loader2 className="animate-spin" size={24} />
        ) : isRecording ? (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></span>
            <MicOff size={24} className="text-white relative z-10" />
          </>
        ) : (
          <Mic size={24} className="relative z-10" />
        )}
      </button>
    </div>
  );
}
