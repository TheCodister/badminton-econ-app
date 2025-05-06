import ChatProductCard from '@/components/card/ChatProductCard'
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
      <div className="mx-auto w-full max-w-3xl items-center relative">
        <div className="overflow-y-auto mb-24 px-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex my-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'user' ? (
                <Avatar isBordered className="mr-4" name="U" size="sm" />
              ) : null}
              <div
                className={`w-full p-2 rounded-xl text-start text-xl font-semibold ${
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
                    case 'tool-invocation': {
                      const callId = part.toolInvocation.toolCallId

                      switch (part.toolInvocation.toolName) {
                        case 'search_racket': {
                          switch (part.toolInvocation.state) {
                            case 'partial-call':
                              return (
                                <pre key={callId}>
                                  {JSON.stringify(part.toolInvocation, null, 2)}
                                </pre>
                              )
                            case 'call':
                              return (
                                <div key={callId}>
                                  Searching for rackets with keyword "
                                  {part.toolInvocation.args.keyword}"...
                                </div>
                              )
                            case 'result':
                              const result = part.toolInvocation.result as {
                                product_name: string
                                found: boolean
                                rackets: {
                                  id: string
                                  name: string
                                  price: number
                                  image: string
                                }[]
                              }

                              return (
                                <div key={callId} className="space-y-4 w-full">
                                  <h3 className="font-bold text-lg">
                                    Results for "{result.product_name}":
                                  </h3>

                                  {result.found ? (
                                    <div className="w-full overflow-x-auto">
                                      <div className="flex flex-row gap-4 w-max">
                                        {result.rackets.map((racket, index) => {
                                          const mapped = {
                                            id: racket.id,
                                            product_name: racket.name,
                                            image_url: racket.image,
                                            price: Number(racket.price),
                                          }
                                          return (
                                            <ChatProductCard
                                              key={index}
                                              data={mapped}
                                            />
                                          )
                                        })}
                                      </div>
                                    </div>
                                  ) : (
                                    <p>No rackets found for this keyword.</p>
                                  )}
                                </div>
                              )
                          }
                          break
                        }
                      }
                    }
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
          className="fixed mx-auto bottom-9 w-full max-w-3xl p-3 flex bg-white"
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
