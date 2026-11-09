import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const PANE = 'skill-buttons'
const TITLE = '스킬 버튼'
const draft = atom({ plugin: 'skill-buttons', key: 'draft' } as const, '', {
  shape: 'draft-1',
})

type Action = { key: string; label: string; build: (input: string) => string }

const ACTIONS: Action[] = [
  {
    key: 'humanizer-ko',
    label: 'AI티 빼기 (한국어)',
    build: t => `humanizer-ko 스킬을 사용해서 아래 글의 AI티를 빼고 자연스러운 한국어로 다듬어줘.\n\n${t}`,
  },
  {
    key: 'seo',
    label: 'SEO 점검',
    build: t => `seo 스킬(claude-seo, seo-aeo-geo-ultimate 아님)을 사용해서 다음 URL의 SEO를 분석해줘: ${t}`,
  },
]

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'skill-buttons',
      description: '스킬 버튼 패널 열기',
    })
    void $.ui.open({ id: PANE, title: TITLE })
    return next(e)
  })

  on('command.run', { command: 'skill-buttons' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })
    return { text: '스킬 버튼 패널을 열었습니다.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Input } = $.ui.resolve(e)
    const text = await read($, draft)

    const send = async (action: Action) => {
      const body = (await read($, draft)).trim()
      if (!body) {
        $.ui.toast('입력칸에 글이나 URL을 먼저 넣어주세요.')
        return
      }
      await $.prompt.submit({ text: action.build(body), asUser: true })
      await update($, draft, () => '')
      $.ui.toast(`"${action.label}" 요청을 보냈습니다.`)
    }

    return (
      <Box flexDirection="column" gap={1}>
        <Input
          key="draft"
          rows={6}
          placeholder="여기에 글이나 URL을 붙여 넣으세요"
          value={text}
          onInput={v => void update($, draft, () => v)}
          onSubmit={v => void update($, draft, () => v)}
          submitLabel="저장"
        />
        <Text dimColor>버튼을 누르면 입력칸 내용과 함께 바로 전송됩니다.</Text>
        {ACTIONS.map(a => (
          <Button key={a.key} label={a.label} onPress={() => void send(a)} />
        ))}
      </Box>
    )
  })
}
