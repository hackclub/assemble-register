const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'appO6uRegNaw9bfPQ',
  apiKey: API_KEY,
  tableName: 'Registrations',
})
