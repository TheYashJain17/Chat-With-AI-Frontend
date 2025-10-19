"use client"

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

import Image from 'next/image';
import { errorMsg, extractErrorMessage } from '@/utils/utilities';
import ChatService from '@/services/chat.service';
import { ChatMessageChunkType, ChatMessageType } from '@/types/types';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Terminal, TypingAnimation } from '../magicui/terminal';
import AiInput from '../ui/ai-input';
import { useAuthStore } from '@/store/store';

import { useRouter } from 'next/navigation';


interface TypingMarkdownProps {
  text: string;
  speed?: number;
}

const TypingMarkdown: React.FC<TypingMarkdownProps> = ({ text, speed = 30 }) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="prose prose-sm sm:prose md:prose-lg prose-white">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {currentText}
      </ReactMarkdown>
    </div>
  );
}

const SpecificChatSection: React.FC<{ chatId: string }> = ({ chatId }): React.JSX.Element => {

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { token } = useAuthStore();


  const chatService = new ChatService(token as string)


  const _addMessageToDB = async ({ role, message, chatId }: { role: string, message: string, chatId?: string }): Promise<string | void> => {

    try {
      
      const response = await chatService.addChatMessagesToDB({ messageObj: { role, message }, chatId });

      console.log("The chat response i am getting from this function is", response?.data);

    } catch (error) {

      console.log(error);

    }

  }


  const handleSend = async (e: FormEvent<HTMLFormElement>): Promise<void> => {

    e.preventDefault();

    try {


      if (!input?.trim()) {

        errorMsg("Please Provide Your Query");
        return;

      }

      setMessages(prev => [...prev, { role: "user", message: input }])

      await _addMessageToDB({ role: "user", message: input, chatId }) as string;

      setInput("");

      const response = await chatService.sendYourQuery(input);

      console.log("The Response we are getting from the chat send your query function is", response);

      const { role, message } = response?.data as ChatMessageType;

      const chunks: ChatMessageChunkType[] = message as unknown as ChatMessageChunkType[];

      console.log("The chunks we are getting are", chunks);

      const finalMessage: string = chunks?.map((chunk: ChatMessageChunkType) => chunk?.pageContent?.toString()).join("\n");

      const cleanedMessage = finalMessage
        .replace(/[○●◆]/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .trim();

      setMessages(prev => [...prev, { message: cleanedMessage, role: role }])

      _addMessageToDB({ role, message: cleanedMessage, chatId })



    } catch (error) {

      console.log(error);

      const errMsg = extractErrorMessage(error);

      errorMsg(errMsg);

    }

  }

  useEffect(() => {

    if (!chatId) return;

    const userQueryObj = JSON.parse(sessionStorage.getItem("latestUserInput") as string) as ChatMessageType;

    if(!userQueryObj) return;

    const handleInitialMessage = async (): Promise<void> => {

      try {


        setMessages((prev) => [...prev, userQueryObj]);

        const response = await chatService.sendYourQuery(userQueryObj?.message);

        console.log("The Response we are getting from the chat send your query function is", response);

        const { role, message } = response?.data as ChatMessageType;

        const chunks: ChatMessageChunkType[] = message as unknown as ChatMessageChunkType[];

        console.log("The chunks we are getting are", chunks);

        const finalMessage: string = chunks?.map((chunk: ChatMessageChunkType) => chunk?.pageContent?.toString()).join("\n");

        const cleanedMessage = finalMessage
          .replace(/[○●◆]/g, '')
          .replace(/^\s*[\r\n]/gm, '')
          .trim();

        setMessages(prev => [...prev, { message: cleanedMessage, role: role }])

        _addMessageToDB({ role, message: cleanedMessage, chatId })

        sessionStorage.removeItem("latestUserInput");

      } catch (error) {

        console.log(error);

      }

    }

    handleInitialMessage();


  }, [chatId]);

  useEffect(() => {

    chatEndRef?.current?.scrollIntoView({ behavior: "smooth" })

  }, [messages])

  return (

    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center">
        {messages.map((msg: ChatMessageType, index: number) => (
          <div
            key={index}
            className={cn(
              'flex w-full md:max-w-[90%]',
              msg?.role?.toLowerCase() === 'ai'
                ? 'justify-start items-start'
                : 'justify-end items-end'
            )}
          >
            <div
              className={cn(
                'rounded-2xl cursor-pointer px-5 py-3 my-3 shadow-2xl text-white text-wrap ',
                msg?.role?.toLowerCase() === 'ai'
                  ? 'bg-gray-500 text-left max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%]'
                  : 'bg-blue-500 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%]'
              )}
            >
              {

                msg?.role?.toLowerCase() === "ai"
                  ?
                  <TypingMarkdown text={msg.message} />

                  :
                  msg?.message
              }

              {/* <Terminal>

                <div className='prose prose-sm sm:prose md:prose-lg prose-white'>

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}

                  >
                      {msg.message}

                  </ReactMarkdown>
                </div>
              </Terminal> */}
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="sticky bottom-0 bg-gray-100 py-4 px-4 border-t"
      >
        <div className="relative w-full max-w-[90%] mx-auto">
          <Input
            className={cn(
              'h-[3.5rem] w-full rounded-full pr-14 bg-white shadow-xl text-black placeholder:text-lg md:placeholder:text-xl placeholder:text-black'
            )}
            placeholder="What's in your mind?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">
            <Image
              src="/assets/ChatPage/SendButton.png"
              height={500}
              width={500}
              alt="Send"
              className="h-12 w-12 rounded-xl absolute top-1 right-1 cursor-pointer"
            />
          </button>
        </div>
      </form>

      {/* <AiInput setMessages={setMessages}/> */}
    </div>
  );
};




export default SpecificChatSection