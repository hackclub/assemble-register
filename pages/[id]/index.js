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
  Grid
} from 'theme-ui'
import Icon from '@hackclub/icons'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'

const RegistrationStatus = styled(Text)`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const GreenRegistrationStatus = styled(Text)`
  background: transparent url(/underline-green.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

export default function Home({ notFound, params, registrationRecord }) {
  const router = useRouter()
  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        <Heading sx={{ fontSize: [4, 5] }}>
          Your registration for Hack Club Assemble{' '}
          {registrationRecord.fields['Completed'] == 1 ? (
            <>
              has been <GreenRegistrationStatus>confirmed!</GreenRegistrationStatus>
            </>
          ) : (
            <>
              is <RegistrationStatus>in progress!</RegistrationStatus>
            </>
          )}
        </Heading>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Link href={`/${params.id}/register`}>
          <Flex
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] }
            }}
          >
            {registrationRecord.fields['Completed'] == 1 ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}

            <Heading
              sx={{
                flexGrow: 1,
                color: [
                  registrationRecord.fields['Completed'] == 1 ? '#33d6a6' : '#ff8c37',
                  'blue'
                ],
                ml: [0, 2]
              }}
              as="h1"
            >
              My Registration
            </Heading>
            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Button
          sx={{
            mt: 1,
            width: '100%',
            textTransform: 'uppercase',
            bg: 'muted'
          }}
          variant="lg"
          onClick={async () => {
            await destroyCookie(null, 'authToken', {
              path: '/'
            })
            router.push('/', '/', { scroll: false })
          }}
        >
          LOGOUT
        </Button>
      </Card>
      <ContactCard router={router} />
    </Container>
  )
}

const ContactCard = ({ router }) => (
  <Card
    px={[4, 4]}
    py={[3, 3]}
    mt={3}
    sx={{
      color: 'blue',
      display: 'flex',
      alignItems: 'center',
      '> svg': { display: ['none', 'inline'] }
    }}
  >
    <Icon glyph="message" />
    <Text sx={{ ml: 2 }}>
      Please don’t hesitate to reach out. We’re available to email at{' '}
      <b>
        <Text
          as="a"
          href={`mailto:assemble@hackclub.com`}
          sx={{
            color: 'blue',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationStyle: 'wavy'
            }
          }}
        >
          assemble@hackclub.com
        </Text>
      </b>
      !
    </Text>
  </Card>
)

export async function getServerSideProps({ res, req, params }) {
  const { registrationsAirtable } = require('../../lib/airtable')
  const cookies = nookies.get({ req })
  if (cookies.authToken) {
    try {
      const registrationRecord = await registrationsAirtable.find(
        'rec' + params.id
      )
      if (registrationRecord.fields['Accepted Tokens'].includes(cookies.authToken)) {
        return { props: { params, registrationRecord } }
      } else {
        res.statusCode = 302
        res.setHeader('Location', `/`)
        return
      }
    } catch (e) {
      console.log(e)
      res.statusCode = 302
      res.setHeader('Location', `/`)
      return
    }
  } else {
    res.statusCode = 302
    res.setHeader('Location', `/`)
    return
  }
}
