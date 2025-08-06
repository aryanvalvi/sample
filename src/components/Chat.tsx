"use client"
import {trpc} from "@/app/_trpc/client"
import React, {useState, useEffect, useRef} from "react"

// Define the Message interface
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  messageType: "text" | "image"
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState<string>("")
  const [mode, setMode] = useState<"text" | "image">("text")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  console.log("Loading state:", loading)
  const sendMessageMutation = trpc.sendMessage.useMutation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return

    setLoading(true)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      messageType: mode,
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    const currentInput = inputMessage
    setInputMessage("")

    try {
      const assistantResponse = (await sendMessageMutation.mutateAsync({
        message: currentInput,
        mode: mode,
      })) as Message // Explicitly cast to Message to ensure type compatibility
      setMessages(prevMessages => [...prevMessages, assistantResponse])
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Error: Could not get a response. Please try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          messageType: "text",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light p-3 p-md-4">
      <header className="bg-primary text-white p-4 rounded-top shadow mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Gemini Chat</h1>
          {loading && (
            <div className="d-flex align-items-center">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <small>Thinking...</small>
            </div>
          )}
        </div>
      </header>

      <div className="flex-grow-1 overflow-auto bg-white rounded shadow-inner p-4 mb-4 d-flex flex-column gap-3">
        {messages.length === 0 && !loading ? (
          <div className="d-flex justify-content-center align-items-center h-100 text-muted fs-5">
            Start a conversation!
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`d-flex ${
                  msg.role === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`w-75 p-3 rounded-3 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-light text-dark"
                  } shadow-sm`}
                >
                  <p className="mb-1">{msg.content}</p>
                  <small className="d-block text-end opacity-75">
                    {msg.timestamp}
                  </small>
                </div>
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start w-100">
                <div className="w-75 p-3 rounded-3 bg-light text-dark shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="d-flex gap-1">
                        <div
                          className="rounded-circle bg-secondary"
                          style={{
                            width: "8px",
                            height: "8px",
                            animation: "bounce 1.4s infinite ease-in-out",
                          }}
                        ></div>
                        <div
                          className="rounded-circle bg-secondary"
                          style={{
                            width: "8px",
                            height: "8px",
                            animation: "bounce 1.4s infinite ease-in-out",
                            animationDelay: "0.16s",
                          }}
                        ></div>
                        <div
                          className="rounded-circle bg-secondary"
                          style={{
                            width: "8px",
                            height: "8px",
                            animation: "bounce 1.4s infinite ease-in-out",
                            animationDelay: "0.32s",
                          }}
                        ></div>
                      </div>
                    </div>
                    <span>Gemini is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="input-group p-3 bg-white rounded-bottom shadow">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            loading ? "Waiting for response..." : "Type your message..."
          }
          className="form-control"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary d-flex align-items-center gap-2"
          disabled={loading || !inputMessage.trim()}
        >
          {loading ? (
            <>
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Sending
            </>
          ) : (
            "Send"
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Chat
