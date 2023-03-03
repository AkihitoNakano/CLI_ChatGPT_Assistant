import { sendContentToChatGPT } from './chatGPT'
import { initCharType, question } from './character'

const main = async () => {
  const charType = await initCharType()

  while (true) {
    const res = await question()
    const error = await sendContentToChatGPT(charType, res)
    if (error) break
  }
}

main()
