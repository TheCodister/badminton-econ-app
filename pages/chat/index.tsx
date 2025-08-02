import ChatProductCard from '@/components/card/ChatProductCard'
import { useChat } from '@ai-sdk/react'
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Spinner } from '@heroui/spinner'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Markdown from 'react-markdown'

export default function Chat() {
  const { messages, sendMessage, status } = useChat()

  const [input, setInput] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    sendMessage({ text: input })
    setInput('')
  }

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
                {m.parts.map((part) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <div key={m.id}>
                          <Markdown>{part.text}</Markdown>
                        </div>
                      )

                    case 'tool-search_racket_by_attributes': {
                      const callId = part.toolCallId

                      switch (part.state) {
                        case 'input-streaming':
                          return (
                            <pre key={callId}>
                              {JSON.stringify(part, null, 2)}
                            </pre>
                          )
                        case 'input-available':
                          return (
                            <div key={callId}>
                              Searching for rackets with attributes "
                              {
                                (part.input as { attributes: string })
                                  .attributes
                              }
                              "...
                            </div>
                          )
                        case 'output-available': {
                          const result = part.output as {
                            attributes: string
                            found: boolean
                            rackets: {
                              id: string
                              name: string
                              price: number
                              image: string
                              weight: string
                              balance: string
                              stiffness: string
                            }[]
                          }

                          return (
                            <div key={callId} className="space-y-4 w-full">
                              <h3 className="font-bold text-lg">
                                Results for attributes "{result.attributes}":
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
                                        weight: racket.weight,
                                        balance: racket.balance,
                                        stiffness: racket.stiffness,
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
                                <p>
                                  No rackets found matching these attributes.
                                </p>
                              )}
                            </div>
                          )
                        }
                      }
                    }

                    case 'tool-search_racket': {
                      const callId = part.toolCallId

                      switch (part.state) {
                        case 'input-streaming':
                          return (
                            <pre key={callId}>
                              {JSON.stringify(part, null, 2)}
                            </pre>
                          )
                        case 'input-available':
                          return (
                            <div key={callId}>
                              Searching for rackets with keyword "
                              {
                                (part.input as { product_name: string })
                                  .product_name
                              }
                              "...
                            </div>
                          )
                        case 'output-available':
                          const result = part.output as {
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
                })}
              </div>
            </div>
          ))}

          {status === 'submitted' && (
            <div className="flex items-center justify-start my-2">
              <span>AI is responding, please wait</span>
              <Spinner className="ml-2" size="sm" />
            </div>
          )}
        </div>
        <form
          className="fixed bottom-9 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-3 flex bg-white rounded-lg shadow-md z-50"
          onSubmit={handleSubmit}
        >
          <Input
            fullWidth
            color="primary"
            className="mr-2"
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button color="primary" type="submit">
            Send
          </Button>
        </form>
      </div>
    )
}
