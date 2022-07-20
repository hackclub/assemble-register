import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Textarea,
  Field,
  Grid
} from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register({ notFound, registrationRecord, params }) {
  return (
    <Container py={4} variant="copy">
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800 }}>
          Thank you for signing up!
        </Text>
        <br />
        <Text>
          ❤️ You're on the waitlist! We really hope we can meet you! Make sure you check your email in
          the coming days and weeks for important updates. Also, check out the{' '}
          <Text
            as={'a'}
            href="https://hackclub.com/slack"
            target="_blank"
            sx={{ color: 'red' }}
          >
            Hack Club Slack
          </Text>{' '}
          if you'd like to meet other hackers.
        </Text>
      </Card>
    </Container>
  )
}
