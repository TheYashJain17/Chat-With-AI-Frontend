'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageSquare, Plus, Upload } from 'lucide-react';
import React, { useState } from 'react';

import ChatService from '@/services/chat.service';
import { useAuthStore } from '@/store/store';
import { errorMsg, extractErrorMessage, successMsg } from '@/utils/utilities';
import UserService from '@/services/user.service';

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

// const SidebarContent: React.FC<{ setUploadedDocId: React.Dispatch<React.SetStateAction<string | null>> }> = ({ setUploadedDocId }) => {
const SidebarContent = (): React.JSX.Element => {

  // const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const { token } = useAuthStore();

  const chatService = new ChatService(token as string);

  // const _uploadFileToBackend = async (formData: FormData): Promise<void> => {

  //   try {

  //     setIsFileUploading(true)

  //     // const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/uploadFile`;

  //     // const token = localStorage.getItem("token");

  //     // const response: AxiosResponse = await publicAxiosInstance.post(url, formData, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`}});

  //     const response = await chatService.uploadFileToBackend(formData);

  //     console.log("The response we are getting from uploading file is", response);
  //     const eventId = response?.data?.data?.id;

  //     console.log("The event id we are getting from uploading file is", eventId);


  //     // if(!response?.data?.success){
  //     if (!eventId) {

  //       errorMsg("Failed To Upload File");
  //       return;

  //     }

  //     successMsg("File Uploaded Successfully");

  //     setTimeout(async () => {

  //       const documentId = await UserService.getUploadedDocId(eventId);

  //       console.log("The response i am getting from uploaded doc id", documentId);

  //       setUploadedDocId(documentId?.toString() as string);

  //     }, 3000)


  //   } catch (error: unknown) {

  //     // const err = error as AxiosError<{message: string}>;

  //     const errMsg = extractErrorMessage(error);

  //     // console.log(err.message);

  //     errorMsg(errMsg);
  //     return;

  //   } finally {

  //     setIsFileUploading(false);

  //   }

  // }

  // const handleUploadFile = async (): Promise<void> => {

  //   try {

  //     const element = document.createElement("input");
  //     element.setAttribute("type", "file");
  //     element.setAttribute("accept", "application/pdf, image/png, image/jpg, image/jpeg, text/plain");
  //     element.addEventListener("change", async () => {

  //       if (element.files && element.files?.length > 0) {

  //         const file = element?.files?.[0];

  //         if (file) {


  //           const formData = new FormData();
  //           formData.append("file", file);

  //           await _uploadFileToBackend(formData);

  //         }

  //       }


  //     })
  //     element.click();

  //   } catch (error) {

  //     console.log(error);

  //   }

  // }

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

      {/* <div className="p-4">
        <Button size="sm" variant="secondary" className="w-full" onClick={handleUploadFile} disabled={isFileUploading}>
          <Upload className="mr-2" size={16} />
          Upload File
        </Button>
      </div> */}
    </div>

  )


}

// const SpecificChatSidebar: React.FC<{ setUploadedDocId: React.Dispatch<React.SetStateAction<string | null>> }> = ({ setUploadedDocId }) => {
const SpecificChatSidebar = (): React.JSX.Element => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white shadow-lg">
        <SidebarContent

          // setUploadedDocId={setUploadedDocId}

        />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50 bg-white">
            <Menu className="h-6 w-6 text-black" />
          </Button>
        </SheetTrigger>


        <SheetContent side="left" className="bg-gray-900 text-white w-64 p-0">
          <SidebarContent

            // setUploadedDocId={setUploadedDocId}
          />
        </SheetContent>
      </Sheet>

    </div>
  );
};

export default SpecificChatSidebar;
