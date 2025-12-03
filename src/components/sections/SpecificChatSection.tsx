"use client"

import { cn } from '@/lib/utils';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

import ChatService from '@/services/chat.service';
import { ChatMessageChunkType, ChatMessageType } from '@/types/types';
import { errorMsg, extractErrorMessage } from '@/utils/utilities';
import Image from 'next/image';

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { useQuery } from '@tanstack/react-query';


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
  const [intialResponseDone, setInitialResponseDone] = useState<boolean>(false);


  const chatService = new ChatService()


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

      const tokenState = JSON.parse(localStorage.getItem("token") as string) as { state: { token: string } };

      const token = tokenState.state.token;

      // console.log("The token we are getting is", token);



      const response = await fetch(`http://localhost:8006/api/v1/rag/chat?userQuery=${input}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response?.body) throw new Error("No response body received from stream endpoint")

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      let aiMessage = "";
      setMessages(prev => [...prev, { role: "AI", message: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(line => line.trimStart().startsWith("data:"));

        for (const line of lines) {
          const token = line.replace(/^data:\s*/, "");

          if (token === "[DONE]") {
            reader.cancel();
            break;
          }

          aiMessage += token;
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1].message = aiMessage; // update last AI message progressively
            return copy;
          });
        }
      }



      _addMessageToDB({ role: "AI", message: aiMessage, chatId })



    } catch (error) {

      console.log(error);

      const errMsg = extractErrorMessage(error);

      errorMsg(errMsg);

    }

  }


  const { data, isSuccess } = useQuery({

    queryKey: ["getAllMessages", chatId],
    queryFn: () => chatService.getAllMessagesForAParticularChat(chatId),
    enabled: !!chatId,

  })


  // const getAllMessages = async (): Promise<void> => {

  //   try {

  //     const response = await chatService.getAllMessagesForAParticularChat(chatId);

  //     console.log("all messages for this chat are", response);

  //     setMessages(response as ChatMessageType[]);





  //   } catch (error) {

  //     console.log(error);

  //   }

  // }

  // const handleInitialMessage = async (userQueryObj: ChatMessageType): Promise<void> => {

  //   try {


  //     setMessages((prev) => [...prev, userQueryObj]);

  //     const tokenState = JSON.parse(localStorage.getItem("token") as string) as { state: { token: string } };

  //     const token = tokenState.state.token;

  //     // console.log("The token we are getting is", token);

  //     const input = userQueryObj?.message;
  //     // const input = message;


  //     sessionStorage.removeItem("latestUserInput");

  //     const response = await fetch(`http://localhost:8006/api/v1/rag/chat?userQuery=${input}`, {
  //       method: "GET",
  //       headers: { "Authorization": `Bearer ${token}` }
  //     });

  //     if (!response?.body) throw new Error("No response body received from stream endpoint")


  //     const reader = response.body!.getReader();
  //     const decoder = new TextDecoder();

  //     let aiMessage = "";
  //     setMessages(prev => [...prev, { role: "AI", message: "" }]);
  //             setMessages(prev => {
  //       // prevent duplicate AI bubble
  //       if (prev.some(m => m.role === "AI" && m.message === "")) return prev;
  //       return [...prev, { role: "AI", message: "" }];
  //     });

    

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;

  //       let chunkText = decoder.decode(value);


  //       let lines = chunkText
  //         .split(/(?=data:)/g)
  //         .filter(line => line.trim().startsWith("data:"))
  //         .map(line => line.replace(/^data:\s*/, "").trim());


  //       if (lines.length === 0 && chunkText.trim().length > 0) {
  //         lines = [chunkText.trim()];
  //       }

  //       for (const token of lines) {
  //         if (token === "[DONE]") {
  //           reader.cancel();
  //           break;
  //         }

  //         aiMessage += token;

  //         setMessages(prev => {
  //           const copy = [...prev];
  //           copy[copy.length - 1].message = aiMessage;
  //           return copy;
  //         });


  //       }

  //     }




  //     await _addMessageToDB({ role: "AI", message: aiMessage, chatId });


  //   } catch (error) {

  //     console.log(error);

  //   }

  // }

  // const testFunction = () => { sessionStorage.removeItem("latestUserInput"); console.log("Testing function") };

  useEffect(() => {

    chatEndRef?.current?.scrollIntoView({ behavior: "smooth" })

  }, [messages])


  useEffect(() => {

    if(!data || !isSuccess) return; 

      setMessages(data as ChatMessageType[])


  }, [chatId])



  // useEffect(() => {

  //   const userQueryObj = JSON.parse(sessionStorage.getItem("latestUserInput") as string) as ChatMessageType;

  //   if (!userQueryObj?.message) return;

  //   // console.log("Inside useEffect for user query object");

  //   handleInitialMessage(userQueryObj);


  // }, []);



  return (

    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center">
        {messages
          ?.filter(Boolean)
          .map((msg: ChatMessageType, index: number) => (
            <div
              key={index}
              className={cn(
                "flex w-full md:max-w-[90%]",
                msg?.role?.toLocaleLowerCase() === "system" ? "items-center justify-center"
                :
                msg.role?.toLowerCase() === "ai"
                  ? "justify-start items-start"
                  : "justify-end items-end"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl cursor-pointer px-5 py-3 my-3 text-wrap",
                  msg?.role?.toLocaleLowerCase() === "system" ? "max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-gray-500 font-bold"
                  :
                  msg.role?.toLowerCase() === "ai"
                    ? "bg-gray-500 text-left max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-white shadow-2xl"
                    : "bg-blue-500 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-white shadow-2xl"
                )}
              >
                {msg.message ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                  >
                    {msg.message}
                  </ReactMarkdown>
                ) : (
                  <span className="opacity-30">...</span>
                )}
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
              'h-14 w-full rounded-full pr-14 bg-white shadow-xl text-black placeholder:text-lg md:placeholder:text-xl placeholder:text-black'
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


    </div>
  );
};




export default SpecificChatSection





// "use client";

// import { cn } from "@/lib/utils";
// import React, { FormEvent, useEffect, useRef, useState } from "react";
// import { Input } from "../ui/input";

// import ChatService from "@/services/chat.service";
// import { ChatMessageType } from "@/types/types";
// import { errorMsg, extractErrorMessage } from "@/utils/utilities";
// import Image from "next/image";

// import ReactMarkdown from "react-markdown";
// import remarkBreaks from "remark-breaks";
// import remarkGfm from "remark-gfm";

// const SpecificChatSection: React.FC<{ chatId: string }> = ({ chatId }) => {
//   const [messages, setMessages] = useState<ChatMessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   const chatService = new ChatService();

//   const _addMessageToDB = async ({
//     role,
//     message,
//     chatId,
//   }: {
//     role: string;
//     message: string;
//     chatId?: string;
//   }): Promise<void> => {
//     try {
//       const response = await chatService.addChatMessagesToDB({
//         messageObj: { role, message },
//         chatId,
//       });
//       console.log("DB add response:", response?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAllMessages = async (): Promise<void> => {
//     try {
//       const response = await chatService.getAllMessagesForAParticularChat(chatId);
//       console.log("all messages for this chat are", response);
//       setMessages(response as ChatMessageType[]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // 🔹 Single source of truth: send + stream + save
//   const sendMessage = async (userMessage: string): Promise<void> => {
//     try {
//       if (!userMessage.trim()) {
//         errorMsg("Please Provide Your Query");
//         return;
//       }

//       // 1) Add user message to UI
//       setMessages((prev) => [...prev, { role: "user", message: userMessage }]);

//       // 2) Save user message to DB
//       await _addMessageToDB({ role: "user", message: userMessage, chatId });

//       // 3) Get token
//       const tokenState = JSON.parse(
//         localStorage.getItem("token") as string
//       ) as { state: { token: string } };
//       const token = tokenState.state.token;

//       // 4) Call streaming endpoint
//       const response = await fetch(
//         `http://localhost:8006/api/v1/rag/chat?userQuery=${encodeURIComponent(
//           userMessage
//         )}`,
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.body)
//         throw new Error("No response body received from stream endpoint");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       let aiMessage = "";

//       // 5) Add placeholder AI message
//       setMessages((prev) => [...prev, { role: "AI", message: "" }]);

//       // 6) Stream and update last AI message
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunkText = decoder.decode(value);

//         // adjust if your backend is plain text (no "data:" prefix)
//         const lines = chunkText
//           .split("\n")
//           .filter((line) => line.trimStart().startsWith("data:"))
//           .map((line) => line.replace(/^data:\s*/, ""));

//         for (const token of lines) {
//           if (token === "[DONE]") {
//             reader.cancel();
//             break;
//           }

//           aiMessage += token;

//           setMessages((prev) => {
//             const copy = [...prev];
//             const lastIndex = copy.length - 1;
//             if (lastIndex >= 0 && copy[lastIndex].role.toLowerCase() === "ai") {
//               copy[lastIndex] = { ...copy[lastIndex], message: aiMessage };
//             }
//             return copy;
//           });
//         }
//       }

//       // 7) Save AI message to DB
//       if (aiMessage.trim()) {
//         await _addMessageToDB({
//           role: "AI",
//           message: aiMessage.trim(),
//           chatId,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       const errMsg = extractErrorMessage(error);
//       errorMsg(errMsg);
//     }
//   };

//   // 🧾 Form submit → reuse sendMessage
//   const handleSend = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     const currentInput = input;
//     setInput("");
//     await sendMessage(currentInput);
//   };

//   // 🔄 Scroll to bottom when messages change
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 💾 Load existing chat history on mount
//   useEffect(() => {
//     getAllMessages();
//   }, [chatId]);

//   // 🟢 Initial message from sessionStorage → reuse sendMessage
//   useEffect(() => {
//     const stored = sessionStorage.getItem("latestUserInput");
//     if (!stored) return;

//     const userQueryObj = JSON.parse(stored) as ChatMessageType;
//     if (!userQueryObj?.message) return;

//     sessionStorage.removeItem("latestUserInput");

//     // don't re-add user to state manually; just reuse sendMessage
//     sendMessage(userQueryObj.message);
//   }, [chatId]);

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center">
//         {messages
//           ?.filter(Boolean)
//           .map((msg: ChatMessageType, index: number) => (
//             <div
//               key={index}
//               className={cn(
//                 "flex w-full md:max-w-[90%]",
//                 msg?.role?.toLocaleLowerCase() === "system" ? "items-center justify-center"
//                 :
//                 msg.role?.toLowerCase() === "ai"
//                   ? "justify-start items-start"
//                   : "justify-end items-end"
//               )}
//             >
//               <div
//                 className={cn(
//                   "rounded-2xl cursor-pointer px-5 py-3 my-3 text-wrap",
//                   msg?.role?.toLocaleLowerCase() === "system" ? "max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-gray-500 font-bold"
//                   :
//                   msg.role?.toLowerCase() === "ai"
//                     ? "bg-gray-500 text-left max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-white shadow-2xl"
//                     : "bg-blue-500 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] xl:max-w-[50%] text-white shadow-2xl"
//                 )}
//               >
//                 {msg.message ? (
//                   <ReactMarkdown
//                     remarkPlugins={[remarkGfm, remarkBreaks]}
//                   >
//                     {msg.message}
//                   </ReactMarkdown>
//                 ) : (
//                   <span className="opacity-30">...</span>
//                 )}
//               </div>
//             </div>
//           ))}

//         <div ref={chatEndRef} />
//       </div>

//       <form
//         onSubmit={handleSend}
//         className="sticky bottom-0 bg-gray-100 py-4 px-4 border-t"
//       >
//         <div className="relative w-full max-w-[90%] mx-auto">
//           <Input
//             className={cn(
//               "h-14 w-full rounded-full pr-14 bg-white shadow-xl text-black placeholder:text-lg md:placeholder:text-xl placeholder:text-black"
//             )}
//             placeholder="What's in your mind?..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />

//           <button type="submit">
//             <Image
//               src="/assets/ChatPage/SendButton.png"
//               height={500}
//               width={500}
//               alt="Send"
//               className="h-12 w-12 rounded-xl absolute top-1 right-1 cursor-pointer"
//             />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SpecificChatSection;
