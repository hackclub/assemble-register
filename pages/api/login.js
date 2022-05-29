import { registrationsAirtable, loginsAirtable } from '../../lib/airtable'
import nookies from 'nookies'

export default async function handler(req, res) {
  try {
    const firstAirtableCall = await registrationsAirtable.read({
      maxRecords: 1,
      filterByFormula: `Email = "${decodeURIComponent(req.query.email)}"`
    })

    if (firstAirtableCall.length > 0) {
      const registrationRecord = firstAirtableCall[0]
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [registrationRecord.id],
        Locale: req.query.locale
      })
      res.json({ success: true, id: loginRecord.id })
    } else {
      const registrationRecord = await registrationsAirtable.create({
        Email: decodeURIComponent(req.query.email)
      })
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [registrationRecord.id],
        Locale: req.query.locale
      })
      nookies.set({ res }, 'authToken', loginRecord.id.replace('rec', ''), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      res.json({
        success: true,
        id: loginRecord.id,
        url: `/${
          loginRecord.fields['Locale with a slash']
            ? loginRecord.fields['Locale with a slash']
            : ''
        }${loginRecord.fields['Path'] ? loginRecord.fields['Path'] : ''}`
      })
    }
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
