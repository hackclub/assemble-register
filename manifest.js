export default {
  questions: [
    {
      header: 'Basic Details',
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          optional: false
        },
        {
          key: 'Phone',
          label:
            'Phone number (include country code if not in the United States)',
          type: 'string',
          inputType: 'tel',
          optional: false
        }
      ]
    },
  ],
  metaData: {
    maximumAge: 20 /**IN YEARS*/
  }
}
