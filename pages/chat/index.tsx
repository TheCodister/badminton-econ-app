import { useAuth } from '@/context/context'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Spinner } from '@nextui-org/spinner'
import { useChat } from 'ai/react'
import Markdown from 'react-markdown'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <div>Unauthorized</div>
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
                className={`p-4 text-black rounded-xl w-72 text-start ${
                  m.role === 'user'
                    ? 'bg-green-100 text-left'
                    : 'bg-blue-100 text-right'
                }`}
              >
                <Markdown>{m.content}</Markdown>
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
          className="fixed bottom-10 w-full max-w-md p-4 flex"
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
