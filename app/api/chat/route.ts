import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import axios from 'axios'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const searchRacketSchema = z.object({
  product_name: z
    .string()
    .describe('The name or keyword of the racket the user is looking for'),
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  console.log('Messages:', messages)

  const result = streamText({
    model: google('gemini-1.5-flash-latest'),
    system: `You are a badminton professional, Your name will be BMBot, you are chatting with a customer who is looking for a racket or any of the following: shuttlecock, shoes, or badminton accesories. You can provide them with the information they need.
    - Remember to be polite and helpful
    - If the customer ask about anything outside of badminton products, please let them know that you are a badminton professional and can only provide information on badminton products. If they ask you about inappropriate more than 5 times, please end the conversation.
    - If the customer is asking for a product that is not available, please suggest a similar product
    - Here are some example of product for different levels of players:
    - Beginner: VNB, Kumpoo, Yonex Arcsaber 0.
    - Intermediate: Victor, Lining.
    - Advanced: Yonex Astrox 99, Victor Thruster F, Lining N90.
    - If the product is not available, please suggest a similar product.
    - Use the tool to search for the product in stock or in store.
    `,
    toolChoice: 'auto',
    toolCallStreaming: true,
    messages,
    tools: {
      search_racket: {
        description:
          'When the user is looking for a racket or product in stock or in store',
        parameters: searchRacketSchema,
        //   type: 'object',
        //   properties: {
        //     product_name: {
        //       type: 'string',
        //       description:
        //         'The name of the racket or product that the user is looking for.',
        //     },
        //   },
        //   required: ['product_name'],
        // },
        execute: async ({ product_name }: { product_name: string }) => {
          console.log('Tool called with:', product_name)

          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
              {
                params: {
                  search: product_name,
                  limit: 5,
                },
              },
            )

            const data = res.data
            console.log('Data:', data)

            const rackets = data

            console.log('Filtered rackets:', rackets)

            if (rackets.length === 0) {
              return `I couldn't find any rackets matching "${product_name}". Please try another name or brand.`
            }

            return {
              product_name,
              found: rackets.length > 0,
              rackets: rackets.map((r: any) => ({
                id: r.id,
                name: r.product_name,
                price: r.price,
                image: r.image_url,
              })),
            }
          } catch (error) {
            console.error('Axios error:', error)
            return `Sorry, I ran into an error while searching for rackets. Please try again later.`
          }
        },
      },
    },
  })
  return result.toDataStreamResponse()
}
