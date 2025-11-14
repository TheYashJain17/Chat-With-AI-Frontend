import SpecificChatSidebar from '@/components/panels/SpecificChatSidebar'
import SpecificChatSection from '@/components/sections/SpecificChatSection'
import ChatService from '@/services/chat.service'
import getQueryClient from '@/utils/clients/GetQuery.client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'


const page = async ({params}: {params: {chatId: string}}) => {

  const chatId = await params.chatId;

  const chatService = new ChatService();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({

    queryKey: ["getAllMessages", chatId],
    queryFn: () => chatService.getAllMessagesForAParticularChat(chatId as string)

  })

  // const [uploadedDocId, setUploadedDocId] = useState<string | null>(null);

  return (


    <div className="flex h-screen w-screen overflow-hidden">
      <SpecificChatSidebar

      // setUploadedDocId={setUploadedDocId}

      />

      <HydrationBoundary state={dehydrate(queryClient)}>



        <main className="flex-1 overflow-hidden">
          <SpecificChatSection chatId={chatId as string} />
        </main>
      </HydrationBoundary>
    </div>

  )
}

export default page