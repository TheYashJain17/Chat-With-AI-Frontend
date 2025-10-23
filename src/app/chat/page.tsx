import ChatSidebar from '@/components/panels/ChatSidebar'
import ChatSection from '@/components/sections/ChatSection'
import React from 'react'

const page = (): React.JSX.Element => {


  return (

    <div className="flex h-screen w-screen overflow-hidden">

  <ChatSidebar />

  <main className="flex-1 overflow-hidden">
    <ChatSection/>
  </main>
</div>

  )
}

export default page