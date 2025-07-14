import ChatSidebar from '@/components/panels/ChatSidebar'
import ChatSection from '@/components/sections/ChatSection'
import React from 'react'

const page = (): React.JSX.Element => {
  return (
    // <div className='bg-gray-700 w-full'>

    //     <div className='flex items-center justify-between w-full min-h-screen'>

    //         <div className='min-h-screen z-50'>
    //         <ChatSidebar/>

    //         </div>

    //         <div className='w-full  px-2'>

    //         <ChatSection/>

    //         </div>


    //     </div>

    // </div>

    <div className="flex h-screen w-screen overflow-hidden">
  <ChatSidebar />
  <main className="flex-1 overflow-hidden">
    <ChatSection />
  </main>
</div>

  )
}

export default page