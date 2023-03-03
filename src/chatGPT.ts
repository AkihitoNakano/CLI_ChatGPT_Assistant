import { Configuration, OpenAIApi } from 'openai'
import 'dotenv/config'

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const sendContentToChatGPT = async (order: string, content: string): Promise<Error | undefined> => {
  try {
    const chat = await openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: content + '、を' + order }],
      },
      {
        timeout: 5000,
      }
    )

    console.log(chat.data.choices[0].message?.content)
    console.log('')
    console.log(`>> 使用したトークンは【${chat.data.usage?.total_tokens}】です。<<`)
    return undefined
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.status)
      console.log(err.response.data)
      return err
    } else {
      console.log(err.message)
      return err
    }
  }
}
