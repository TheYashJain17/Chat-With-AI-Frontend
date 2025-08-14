// "use client"

// import React from 'react'
// import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator } from '../ui/sidebar'

//           import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar"

// import {Menu, MenuItem,  Sidebar as SideBar, SubMenu } from "react-pro-sidebar";

// import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
// import { Button } from '../ui/button'
// import { cn } from '@/lib/utils'

// import {Plus, Upload} from "lucide-react";




// const ChatSidebar = (): React.JSX.Element => {


//   const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]
//   return (


//     // <SidebarProvider>

//     // <Sidebar className={cn("flex items-center justify-center rounded-4xl p-5 border-none ")}>
//     //   <span className={cn("px-5 my-5 text-2xl font-semibold")}>CHAT WITH DOCS</span>
//     //   <SidebarContent>
//     //     <SidebarGroup className={cn('flex items-center justify-between flex-col gap-20')}>

//     //       <Button size={"newChat"} variant={"newchat"}><Plus />New Chat</Button>
//     //       <SidebarGroupLabel>Your Conversations History</SidebarGroupLabel>
//     //       <SidebarGroupContent>
//     //         <SidebarMenu className='flex justify-start'>

//     //           <div className={cn('overflow-y-auto max-h-[250px]')}>

//     //           {items.map((item) => (
//     //             <SidebarMenuItem key={item.title}>
//     //               <SidebarMenuButton asChild>
//     //                 <a href={item.url}>
//     //                   <item.icon />
//     //                   <span>{item.title}</span>
//     //                 </a>
//     //               </SidebarMenuButton>
//     //             </SidebarMenuItem>
                
//     //           ))}

//     //           </div>
//     //         </SidebarMenu>

//     //         <SidebarSeparator/>

//     //         <div className={cn("flex items-center justify-center h-full")}>
//     //           <Button size={"uploadFile"} variant={"uploadFile"}><Upload />Upload File</Button>

//     //         </div>


//     //       </SidebarGroupContent>
//     //     </SidebarGroup>
//     //   </SidebarContent>
//     // </Sidebar>


//     //   </SidebarProvider>
    
//     <SideBar breakPoint="md" className='h-screen max-w-[260px] w-full md:mx-3'>
//       <SidebarHeader>
//         <div className="text-center text-xl font-bold p-4">
//           CHAT WITH DOCS
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <div className="px-4">
//           <Button size="sm" variant="outline" className="w-full mb-4">
//             <Plus className="mr-2" size={16} />
//             New Chat
//           </Button>

//           <div className="text-sm text-gray-400 mb-2">Your Conversations History</div>

//           <Menu>
//             <div className="max-h-[250px] overflow-y-auto">
//               {items.map((item) => (
//                 <MenuItem key={item.title} icon={<item.icon size={16} />}>
//                   <span>{item.title}</span>
//                 </MenuItem>
//               ))}
//             </div>
//           </Menu>
//         </div>
//       </SidebarContent>

//       <SidebarFooter>
//         <div className="p-4 text-center">
//           <Button size="sm" variant="secondary" className="w-full">
//             <Upload className="mr-2" size={16} />
//             Upload File
//           </Button>
//         </div>
//       </SidebarFooter>
//     </SideBar>
//   );


// }

// export default ChatSidebar



'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Upload, Menu, MessageSquare } from 'lucide-react';

import { cn } from '@/lib/utils';
import { axiosInstance, publicAxiosInstance } from '@/utils/instances/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios';
import { errorMsg, successMsg } from '@/utils/utilities';

type ChatItem = {
  title: string;
  icon: React.ElementType;
  url: string;
};

const chatHistoryItems: ChatItem[] = [
  { title: "Chat with PDF", icon: MessageSquare, url: "#" },
  { title: "Research Notes", icon: MessageSquare, url: "#" },
  { title: "Summary Bot", icon: MessageSquare, url: "#" },
  // Add more as needed
];

const SidebarContent = () => {

  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const _uploadFileToBackend = async(formData: FormData): Promise<void> => {

    try {

      setIsFileUploading(true)

      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/uploadFile`;

      const response: AxiosResponse = await publicAxiosInstance.post(url, formData, {headers: {"Content-Type": "multipart/form-data"}});

      console.log("The response we are getting from uploading file is", response);

      if(!response?.data?.success){

        errorMsg("Failed To Upload File");
        return;

      }
      
      successMsg("File Uploaded Successfully");
      return;

    } catch (error: unknown) {

      const err = error as AxiosError<{message: string}>;

      console.log(err.message);

      errorMsg(err.message);
      return;
      
    }finally{

      setIsFileUploading(false);

    }

  }

  const handleUploadFile = async(): Promise<void> => {

    try {
      
        const element = document.createElement("input");
        element.setAttribute("type", "file");
        element.setAttribute("accept", "application/pdf, image/png, image/jpg, image/jpeg, text/plain");
        element.addEventListener("change", async() => {

          if(element.files && element.files?.length > 0){

            const file = element?.files?.[0];

          if(file){


            const formData = new FormData();
            formData.append("file", file);

            await _uploadFileToBackend(formData);

          }

          }


        })
        element.click();

    } catch (error) {

      console.log(error);
      
    } 

  }

  return (

  <div className="flex flex-col h-full justify-between">
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">CHAT WITH DOCS</h2>

      <Button variant={"secondary"} size={"sm"} className="w-full mb-4 text-black text-base">
        <Plus size={20} />
        New Chat
      </Button>

      <div className="text-sm text-gray-400 mb-2">Your Conversations History</div>

      <div className="max-h-[250px] overflow-y-auto flex flex-col gap-2">
        {chatHistoryItems.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className="justify-start w-full text-left"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        ))}
      </div>
    </div>

    <div className="p-4">
      <Button size="sm" variant="secondary" className="w-full" onClick={handleUploadFile} disabled={isFileUploading}>
        <Upload className="mr-2" size={16}/>
        Upload File
      </Button>
    </div>
  </div>

  )


}

const ChatSidebar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white shadow-lg">
        <SidebarContent />
      </aside>

      {/* Sidebar for mobile screens */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50 bg-white">
            <Menu className="h-6 w-6 text-black" />
          </Button>
        </SheetTrigger>


        <SheetContent side="left" className="bg-gray-900 text-white w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

    </div>
  );
};

export default ChatSidebar;
