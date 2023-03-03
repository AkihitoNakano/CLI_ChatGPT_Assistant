import prompts from 'prompts'
import { sendContentToChatGPT } from './chatGPT'

type Assistant = '執事' | 'メイド' | 'ツンデレ'

export const initCharType = async () => {
  const response = await prompts({
    type: 'select',
    name: 'Character',
    message: '対応するキャラクターを選択して下さい',
    choices: [
      { title: '執事', description: 'お嬢様、本日はどのようにお過ごしでしょうか', value: '執事' as Assistant },
      { title: 'メイド', description: '旦那様、今日はどのようなご用件でしょうか', value: 'ツンデレ' as Assistant },
      { title: 'ツンデレ', description: '何よ、なんか用？', value: 'ツンデレ' as Assistant },
    ],
  })

  const charType = typeToBehavior(response.Character)

  await sendContentToChatGPT(charType, 'こんにちは')

  return charType
}

const typeToBehavior = (type: Assistant) => {
  switch (type) {
    case '執事':
      return '老練の執事のように振る舞って回答するようにして下さい'
    case 'メイド':
      return '年齢は30代前後の熱血なメイドのように振る舞って回答して下さい'
    case 'ツンデレ':
      return 'ツンデレお嬢様のように振る舞って回答して下さい'
  }
}

export const question = async () => {
  const response = await prompts({
    type: 'text',
    name: 'talk',
    message: '',
  })
  return response.talk
}
