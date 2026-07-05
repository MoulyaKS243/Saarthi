import ChatWidget from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <ChatWidget />
      </div>
    </main>
  );
}