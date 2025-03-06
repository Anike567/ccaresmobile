import React from "react";
import { ChatHistProvider } from "../store/context/chatHistory"; // ✅ Fixed Import
import KoylaMitraNew from "./KoylaMitraNew";

export default function KoylamitraParent() {
  return (
    <ChatHistProvider>
      <KoylaMitraNew />
    </ChatHistProvider>
  );
}
