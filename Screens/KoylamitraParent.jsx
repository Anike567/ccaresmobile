import React from 'react'
import { ChatHistoryProvider } from './../store/context/chatHistory';
import KoylaMitraNew from './KoylaMitraNew';

export default function KoylamitraParent() {
  return (
   <ChatHistoryProvider>
     <KoylaMitraNew/>
   </ChatHistoryProvider>
  )
}


