import { BACKEND_URL } from '@/constants/backend_url'
import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import axios from 'axios'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const searchRacketSchema = z.object({
  product_name: z
    .string()
    .describe(
      'The name or keyword of the racket the user is looking for or the product that you recommend for them.',
    ),
})

const searchRacketByAttributesSchema = z.object({
  attributes: z
    .string()
    .describe(
      'The attributes of the racket the user is looking for, formatted as a comma-separated list of "Key: Value" pairs. Valid keys include: Weight (values: 5U, 4U, 3U), Balance (values: HeadHeavy, HeadLight, EvenBalance), and Stiffness (values: Medium, Stiff, Flexible). For example: "Weight: 4U, Balance: HeadHeavy, Stiffness: Medium"',
    ),
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-2.0-flash-lite'),
    system: `You are a badminton professional, Your name will be BMBot, you are chatting with a customer who is looking for a racket or any of the following: shuttlecock, shoes, or badminton accesories. You can provide them with the information they need.
    - Remember to be polite and helpful
    - If the customer ask about anything outside of badminton products, please let them know that you are a badminton professional and can only provide information on badminton products. If they ask you about inappropriate more than 5 times, please end the conversation.
    - If the customer is asking for a product that is not available, please suggest a similar product
    - Here are some example of product for different levels of players:
    - Beginner: Anything from brand VNB, anything from brand Kumpoo, Yonex Arcsaber 0.
    - Intermediate: just search with brand Victor, Lining.
    - Advanced: Yonex Astrox 99, Victor Thruster Ryuga II, Lining Halbertec 9000.
    - Use the tool to search for the product in stock or in store and when recommend product for the player, remember to pass the name of the product or the brand of the product to the tools.
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
          // console.log('Tool called with:', product_name)

          try {
            const res = await axios.get(`${BACKEND_URL}/products`, {
              params: {
                search: product_name,
                limit: 5,
              },
            })

            const data = res.data
            // console.log('Data:', data)

            const rackets = data

            // console.log('Filtered rackets:', rackets)

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
      search_racket_by_attributes: {
        description:
          'When the user asks for a racket with specific attributes like weight, balance, or stiffness. Use this when users want to find rackets based on characteristics rather than specific product names.',
        parameters: searchRacketByAttributesSchema,
        execute: async ({ attributes }: { attributes: string }) => {
          // console.log('Tool called with attributes:', attributes)

          try {
            // Parse the attributes string into query parameters
            const attributesList = attributes
              .split(',')
              .map((attr) => attr.trim())
            const params: Record<string, string> = {}

            attributesList.forEach((attr) => {
              const [key, value] = attr.split(':').map((part) => part.trim())
              if (key && value) {
                // Convert attribute keys to lowercase to match API params
                const paramKey = key.toLowerCase()
                // Handle special cases for balance and stiffness (remove spaces)
                if (paramKey === 'balance') {
                  // Convert "Head Heavy" to "HeadHeavy" format
                  params[paramKey] = value.replace(/\s+/g, '')
                } else if (paramKey === 'stiffness') {
                  // Keep the stiffness value as is, it should match the enum
                  params[paramKey] = value
                } else {
                  // For other attributes like weight, use as is
                  params[paramKey] = value
                }
              }
            })

            console.log('Converted params:', params)

            // Add a small limit to avoid overwhelming results
            params.limit = '5'

            const res = await axios.get(`${BACKEND_URL}/rackets?`, { params })

            const rackets = res.data.data || []

            console.log('Filtered rackets by attributes:', rackets)

            if (rackets.length === 0) {
              return `I couldn't find any rackets matching these attributes: ${attributes}. Would you like to try different specifications?`
            }

            return {
              attributes,
              found: rackets.length > 0,
              rackets: rackets.map((r: any) => ({
                id: r.id,
                name: r.product.product_name,
                price: r.product.price,
                image: r.product.image_url,
                weight: r.weight,
                balance: r.balance,
                stiffness: r.stiffness,
              })),
            }
          } catch (error) {
            console.error('Axios error:', error)
            return `Sorry, I ran into an error while searching for rackets with those attributes. Please try again with different specifications.`
          }
        },
      },
    },
  })
  return result.toDataStreamResponse()
}
