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
import Icon from '@hackclub/icons'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { manifest, requiredList } from '../lib/manifest.js'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Register({ notFound, registrationRecord, params }) {
  const [data, setData] = useState({})
  const [disabled, setDisabled] = useState(false);

  let keys = manifest.questions.flatMap(x => x.items.map(y => y.key))

  const router = useRouter()

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <ToastContainer align="right" />
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <Box sx={{ display: ['block', 'flex'], alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', flexGrow: 1 }}>
            <Text
              variant="subheadline"
              sx={{
                fontWeight: 900,
                mb: 0,
                flexGrow: 1,
                ml: 2,
                textAlign: 'center',
                fontSize: 4,
                textDecoration: 'underline'
              }}
              as="div"
            >
              Join The Waitlist For{' '}
              <Text
                sx={{
                  textDecoration: 'none',
                  color: 'blue',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://assemble.hackclub.com')}
              >
                Assemble
              </Text>
              !
            </Text>
          </Flex>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] },
              mt: [2, 0]
            }}
            onClick={() => poster()}
          ></Box>
        </Box>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        <Box bg="red" p={3} mb={3} sx={{ borderRadius: 3, color: 'white' }}>
          👋 Hey there! Thanks for checking out Assemble. The weekend of August 5th
          2022 was magical. Its spirit now lives on in high school hackathons 
          around the world, <a href="https://hackathons.hackclub.com" style={{color: 'white'}}>join them here</a>.
        </Box>
        <Box bg="sunken" p={3} mb={3} sx={{ borderRadius: 3 }}>
          This summer, we’re going to return in-person high-school hackathons to
          San Francisco. Our goal is to kick off a new renaissance.
          <br />
          <br />
          We invite you to come out and join us. Not through Zoom or Discord,
          but IRL out in the Bay Area from August 5th 6:00pm to August 7th
          12:00pm. We’ll be hosted at the fantastic Figma HQ on Market Street in
          the heart of San Francisco.
          <br />
          <br />
          Over the weekend, you’ll explore the Bay Area during your free time,
          hack with co-conspirators and experience
          the energy of being in-person again. Together, we’ll Assemble to form
          the first IRL high school hackathon on this side of the pandemic.
          <br />
          <br />
          We're so excited to meet you at Assemble this summer. Please fill out
          the registration form below to help us make the event magical for you.
          Feel free to contact{' '}
          <a href="mailto:assemble@hackclub.com">assemble@hackclub.com</a> for
          help!
        </Box>
        {manifest.questions.map((sectionItem, sectionIndex) => {
          if (typeof sectionItem.check != 'undefined') {
            if (sectionItem.check(data)) {
              return null
            }
          }
          return (
            <Box
              key={sectionIndex}
              sx={{ mb: sectionIndex == manifest.questions.length -1 ? 4 : 5, mt: sectionIndex == 0 ? 4 : 5 }}
            >
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800 }}>
                  {sectionItem['header']}
                </Text>
              </Box>
              <Box>
                {sectionItem.label && (
                  <Box sx={{ color: 'muted', mb: 3 }}>
                    {sectionItem['label']}
                  </Box>
                )}
                {sectionItem.items.map((item, index) => {
                  if (typeof item.check != 'undefined') {
                    if (item.check(data)) {
                      return null
                    }
                  }
                  return (
                    <Box
                      mt={1}
                      mb={4}
                      key={'form-item-' + sectionIndex + '-' + index}
                    >
                      <Field
                        label={
                          <>
                            <Text
                              mb={1}
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {item['label']}{' '}
                              <Text
                                as="small"
                                sx={{
                                  color: 'muted',
                                  display: item.optional ? 'inline' : 'none',
                                  fontSize: '13px'
                                }}
                              >
                                (Optional)
                              </Text>
                            </Text>
                            {item.sublabel && (
                              <Text
                                sx={{
                                  fontSize: '15px',
                                  color: '#555',
                                  fontWeight: '500',
                                  mb: 2,
                                  fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif`
                                }}
                                as="p"
                              >
                                {item['sublabel']}
                              </Text>
                            )}
                          </>
                        }
                        onChange={e => {
                          let newData = {}
                          newData[item.key] = e.target.value
                          setData({ ...data, ...newData })
                        }}
                        placeholder={item['placeholder']}
                        as={
                          item.type == 'string'
                            ? Input
                            : item.type == 'paragraph'
                            ? Textarea
                            : item.inputType == 'checkbox'
                            ? Input
                            : Select
                        }
                        type={item.inputType}
                        required={!item.optional}
                        value={
                          data[item.key] !== undefined ? data[item.key] : ''
                        }
                        sx={{
                          border: '1px solid',
                          borderColor: 'rgb(221, 225, 228)',
                          resize: 'vertical',
                          display:
                            item.inputType == 'checkbox'
                              ? '-webkit-box'
                              : 'block'
                        }}
                        {...(item.type == 'select'
                          ? item.options
                            ? {
                                children: (
                                  <>
                                    <option value="" disabled>
                                      Select One
                                    </option>
                                    {item['options'].map(option => (
                                      <option key={option}>{option}</option>
                                    ))}
                                  </>
                                )
                              }
                            : {
                                children: <></>
                              }
                          : {})}
                      />
                      {item.words && (
                        <Text
                          sx={{ fontSize: '18px', color: 'muted', mt: 1 }}
                          as="p"
                        >
                          ( Aim for about {item.words} words
                          {data[item.key] &&
                          ', ' +
                            data[item.key].split(' ').length +
                            ' ' +
                            data[item.key].split(' ').length ==
                            1
                            ? 'word'
                            : 'words' + ' ' + 'so far.'}
                          )
                        </Text>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
        <Button
          onClick={() => {
            setDisabled(true);
            toast.notify('Submitting your registration...', { duration: 60, title: 'Working...' })
            console.log(data)
            fetch('/api/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
              .then(response => response.json())
              .then(
                ({ success, error }) => {
                  setDisabled(false);
                  success ? window.location.replace('/success') : toast.notify(error, { type: 'error', title: 'Oops!', duration: 60 })
                }
              )
          }}
          style={{
            filter: true ? 'grayscale(1)' : 'grayscale(0)',
          }}
          disabled={true}
        >
          Submit
        </Button>
      </Card>
    </Container>
  )
}
