import React, { useState, useEffect, useRef } from 'react';
import { Character, Message } from '../types';
import { initializeChat, sendMessageToGemini } from '../services/geminiService';
import { PLACEHOLDER_QUESTIONS } from '../constants';

interface ChatInterfaceProps {
  character: Character | null;
  onBack: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ character, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (character) {
      initializeChat(character.name, character.systemInstruction);
      setMessages([{
        role: 'model',
        content: `*加密连接已建立* \n\n${character.quote}`,
        timestamp: Date.now()
      }]);
    }
  }, [character]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      setMessages(prev => [...prev, {
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!character) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col text-gray-500 bg-stone-900">
        <p className="font-tech text-xl mb-4">未检测到信号</p>
        <button onClick={onBack} className="text-desert-gold underline font-western">返回图库</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-stone-900">
      {/* Chat Header */}
      <div className="bg-black border-b border-stone-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
           <button 
            onClick={onBack}
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            ← 返回
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-stone-700">
            <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className={`font-bold font-sans text-xl ${character.themeColor}`}>{character.name}</h3>
            <p className="text-xs text-gray-500 font-tech uppercase tracking-widest">加密频道</p>
          </div>
        </div>
        <div className="text-xs font-tech text-green-500 animate-pulse">在线</div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] md:max-w-[60%] rounded-lg p-4 shadow-md ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-gray-200 border-l-4 border-stone-600' 
                  : `bg-black/80 text-gray-100 border-l-4 ${character.themeColor.replace('text-', 'border-')}`
              }`}
            >
              <p className="whitespace-pre-wrap font-sans text-lg leading-relaxed">{msg.content}</p>
              <span className="text-[10px] opacity-40 mt-2 block font-tech text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black/50 rounded-lg p-4 border border-stone-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-desert-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-desert-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <div className="w-2 h-2 bg-desert-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black border-t border-stone-800 p-4">
        {messages.length < 3 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {PLACEHOLDER_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="whitespace-nowrap px-3 py-1 rounded-full border border-stone-700 text-stone-400 text-sm hover:border-desert-gold hover:text-desert-gold transition-colors font-sans"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex gap-4 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="在此输入消息..."
            className="flex-1 bg-stone-900 border border-stone-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-desert-gold font-sans placeholder-stone-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-desert-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans uppercase tracking-wider"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};