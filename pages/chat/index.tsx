import { useChat } from '@ai-sdk/react'
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Spinner } from '@heroui/spinner'
import { useSession } from 'next-auth/react'
import Markdown from 'react-markdown'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  const { data: session } = useSession()
  if (!session) return <div>Unauthorized</div>
  else
    return (
      <div className="mx-auto w-full max-w-md flex flex-col items-center stretch relative">
        <div className="flex-grow overflow-y-auto mb-24 px-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex my-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'user' ? (
                <Avatar isBordered className="mr-4" name="U" size="sm" />
              ) : null}
              <div
                className={`p-2 rounded-xl w-80 text-start text-xl font-semibold ${
                  m.role === 'user'
                    ? 'text-white bg-secondary-500 text-left'
                    : 'text-black text-right'
                }`}
              >
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <div key={`${m.id}-${i}`}>
                          <Markdown>{part.text}</Markdown>
                        </div>
                      )
                  }
                })}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center justify-start my-2">
              <span>AI: </span>
              <Spinner className="ml-2" size="sm" />
            </div>
          )}
        </div>
        <form
          className="fixed bottom-9 w-full max-w-md p-3 flex bg-white"
          onSubmit={handleSubmit}
        >
          <Input
            fullWidth
            color="primary"
            className="mr-2"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
          />
          <Button color="primary" type="submit">
            Send
          </Button>
        </form>
      </div>
    )
}
