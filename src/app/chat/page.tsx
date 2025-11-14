import ChatSidebar from "@/components/panels/ChatSidebar";
import ChatSection from "@/components/sections/ChatSection";
import ChatService from "@/services/chat.service";
import getQueryClient from "@/utils/clients/GetQuery.client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function page() {

  const chatService = new ChatService();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({

    queryKey: ["allChatInstances"],
    queryFn: chatService.getAllChatInstances,

  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>

      <div className="flex h-screen w-screen overflow-hidden">


        <ChatSidebar />



        <main className="flex-1 overflow-hidden">
          <ChatSection />
        </main>
      </div>
    </HydrationBoundary>

  )
}
