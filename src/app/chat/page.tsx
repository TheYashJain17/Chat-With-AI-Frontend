"use client"

import ChatSidebar from '@/components/panels/ChatSidebar'
import ChatSection from '@/components/sections/ChatSection'
import React, { useState } from 'react'

const page = (): React.JSX.Element => {

  const [uploadedDocId, setUploadedDocId] = useState<string | null>(null);

  return (

    <div className="flex h-screen w-screen overflow-hidden">
  <ChatSidebar 

    setUploadedDocId={setUploadedDocId}

  />
  <main className="flex-1 overflow-hidden">
    <ChatSection uploadedDocId={uploadedDocId as string} />
  </main>
</div>

  )
}

export default page