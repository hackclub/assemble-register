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
import manifest from '../../manifest'
import nookies from 'nookies'
import { useRouter } from 'next/router'

export default function Register({ notFound, registrationRecord, params }) {
  const [data, setData] = useState(registrationRecord.fields)
  const [saved, setSavedState] = useState(true)
  const savingStateRef = useRef(saved)
  const setSaved = data => {
    savingStateRef.current = data
    setSavedState(data)
  }
  let keys = manifest.questions.flatMap(x => x.items.map(y=> y.key))

  const poster = async () => {
    const id = params.id

    const msg = { body: JSON.stringify(data), method: 'POST' }
    const fetched = await fetch(
      `/api/${params.type}/save?id=${id}`,
      msg
    )
    const json = await fetched.json()

    if (json.success) {
      setSaved(true)
    } else {
      console.error(json)
      alert(`❌ Error! Please try again!`)
    }

    return json
  }

  const router = useRouter()

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      if (!savingStateRef.current) {
        e.preventDefault()
        e.returnValue = ''
      } else {
        delete e['returnValue']
      }
    })
  })

  async function goHome(autoSave = true) {
    if (!saved) {
      if (
        autoSave ||
        window.confirm('Would you like to save? Click Cancel to skip saving.')
      ) {
        await poster()
      }
    }
    router.push(`/${params.id}`)
  }

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <SavedInfo saved={saved} poster={poster} router={router} />
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
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Icon glyph="home" onClick={() => goHome(false)} />
            </Text>
            <Text
              variant="subheadline"
              sx={{ fontWeight: 400, mb: 0, flexGrow: 1, ml: 2 }}
              as="div"
            >
              <Text
                sx={{
                  textDecoration: 'none',
                  color: 'blue',
                  cursor: 'pointer'
                }}
                onClick={() => goHome(false)}
              >
                Assemble
              </Text>

              {' / '}
              <b>Register</b>
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
          >
            <Button
              sx={{
                color: 'white',
                mr: 2,
                fontWeight: '800',
                textTransform: 'uppercase',
                bg: saved ? '#33d6a6' : '#ff8c37',
                ':hover,:focus': saved ? { transform: 'none' } : {}
              }}
            >
              {saved ? 'SAVED' : 'SAVE'}
            </Button>
            <Icon
              glyph={saved ? 'checkmark' : 'important'}
              color={saved ? '#33d6a6' : '#ff8c37'}
            />
          </Box>
        </Box>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        {(params.type == 'club' ? manifest.clubs : manifest.questions).map(
          (sectionItem, sectionIndex) => (
            <Box key={sectionIndex}>
              <Box sx={{ textAlign: 'left' }}>
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
                {sectionItem.items.map((item, index) => (
                  <Box
                    mt={1}
                    mb={3}
                    key={'form-item-' + sectionIndex + '-' + index}
                  >
                    <Field
                      label={
                        <Text>
                          {item['label']}{' '}
                          <Text
                            sx={{
                              color: 'muted',
                              display: item.optional ? 'inline' : 'none'
                            }}
                          >
                            (Optional )
                          </Text>
                        </Text>
                      }
                      onChange={e => {
                        let newData = {}
                        newData[item.key] = e.target.value
                        setData({ ...data, ...newData })
                        setSaved(false)
                      }}
                      placeholder={item['placeholder']}
                      as={
                        item.type == 'string'
                          ? Input
                          : item.type == 'paragraph'
                          ? Textarea
                          : Select
                      }
                      type={item.inputType}
                      name="email"
                      value={data[item.key] !== undefined ? data[item.key] : ''}
                      sx={{
                        border: '1px solid',
                        borderColor: 'rgb(221, 225, 228)',
                        resize: 'vertical'
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
                    {item.sublabel && (
                      <Text sx={{ fontSize: '16px', color: 'muted' }} as="p">
                        {item['sublabel']}
                      </Text>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )
        )}
        <Button
          sx={{
            mt: 3,
            width: '100%',
            textTransform: 'uppercase'
          }}
          variant="ctaLg"
          onClick={() => goHome(true)}
        >
         {keys.every(x=>Object.keys(data).includes(x)) ? 'Register' : 'Save Your Progress'}  
        </Button>
      </Card>
    </Container>
  )
}

const SavedInfo = ({ saved, poster, router }) => (
  <Box
    sx={{
      display: ['none', 'flex'],
      position: 'fixed',
      right: '10px',
      bottom: '10px',
      cursor: 'pointer',
      placeItems: 'center',
      background: '#00000005',
      px: 2,
      borderRadius: '15px'
    }}
    onClick={poster}
  >
    <Text
      sx={{
        color: saved ? '#33d6a6' : '#ff8c37',
        fontWeight: '800',
        textTransform: 'uppercase'
      }}
    >
      {saved ? 'SAVED' : 'SAVE'}
    </Text>
    <Icon
      glyph={saved ? 'checkmark' : 'important'}
      color={saved ? '#33d6a6' : '#ff8c37'}
    />
  </Box>
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
