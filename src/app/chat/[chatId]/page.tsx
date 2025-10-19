"use client"

import ChatSidebar from '@/components/panels/ChatSidebar'
import SpecificChatSidebar from '@/components/panels/SpecificChatSidebar'
import ChatSection from '@/components/sections/ChatSection'
import SpecificChatSection from '@/components/sections/SpecificChatSection'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const page = (): React.JSX.Element => {

  const params = useParams();

  const chatId = params.chatId;

  // const [uploadedDocId, setUploadedDocId] = useState<string | null>(null);

  return (

    <div className="flex h-screen w-screen overflow-hidden">
  <SpecificChatSidebar 

    // setUploadedDocId={setUploadedDocId}

  />
  <main className="flex-1 overflow-hidden">
    <SpecificChatSection chatId={chatId as string} />
  </main>
</div>

  )
}

export default page