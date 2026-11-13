// Read-only preview of the image the website shows today for this slot, with its frame sizes.
import {Card, Flex, Stack, Text} from '@sanity/ui'
import type {StringInputProps} from 'sanity'
import {useFormValue} from 'sanity'

export function CurrentImage(props: StringInputProps) {
  const url = props.value
  const frame = useFormValue(['frameInfo']) as string | undefined
  if (!url) return <Text>—</Text>
  return (
    <Card padding={3} radius={2} tone="transparent" border>
      <Stack gap={3}>
        <Flex justify="center" style={{background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 16px 16px'}}>
          <img src={url} alt="" style={{maxWidth: '100%', maxHeight: 260, objectFit: 'contain', display: 'block'}} />
        </Flex>
        {frame ? <Text muted style={{whiteSpace: 'pre-line'}}>{frame}</Text> : null}
      </Stack>
    </Card>
  )
}
