import { getAge } from './helpers.js'

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
          key: 'Email',
          label: 'Contact Email',
          type: 'string',
          inputType: 'email',
          sublabel: `We'll be in touch using this email, so make sure you check it regularly.`,
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          sublabel: `All high-school & upper-middle-school aged students are welcome to come!`,
          optional: false
        },
        {
          key: 'Shirt',
          label: 'T-Shirt Size',
          type: 'select',
          sublabel: `We'll be having awesome swag, so you won't want to miss out.`,
          options: [
            'Extra Small',
            'Small',
            'Medium',
            'Large',
            'Extra Large'
          ],
          optional: false
        },
        {
          key: 'Skill Level',
          label: 'How would you describe your technical skills?',
          sublabel: `Everyone's welcome! This question is just to help us gauge what resources we need to support attendees.`,
          type: 'select',
          options: [
            'Beginner: have never coded before or just started learning',
            'Intermediate: I have taken CS classes OR worked on small individual projects',
            'Advanced: I’m comfortable with my skill set and can work on a project without much guidance'
          ],
          optional: false
        },
        {
          key: 'Dietary Restrictions',
          label: 'Do you have any dietary restrictions? Please list them here.',
          type: 'paragraph',
          optional: true
        },
        {
          key: 'Vaccinated?',
          label: 'Vaccine Status',
          sublabel: `To ensure the safety of attendees, this event requires vaccinations for all people without medical exemption. We define "fully vaccinated" as in accordance with the CDC: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/stay-up-to-date. 

          We will request proof of vaccination on arrival.`,
          type: 'select',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          key: `If you're not vaccinated, please explain why:`,
          label: 'If you\'re not vaccinated, please elaborate:',
          type: 'string',
          check: (data) => data['Vaccinated?'] !== 'No',
        }
      ]
    },
    {
      header: 'Guardian Details',
      label: `Please provide us with the details of a parent/guardian. We'll contact them with a consent form and a participant waiver.`,
      check: (data) => data['Birthday'] === undefined || getAge(data['Birthday']) > 17,
      items: [
        {
          key: 'Parent Name',
          label: "What's your guardian's name?",
          type: 'string',
          optional: false
        },
        {
          key: 'Parent Email',
          label: "What's your guardian's email?",
          type: 'string',
          optional: false
        }
      ]
    },
    {
      header: 'Workshops',
      label: `At Assemble, attendees will host their own informal workshops!`,
      items: [
        {
          key: 'Would you be interested in hosting a workshop session at Assemble?',
          label: 'Would you be interested in hosting a session?',
          type: 'select',
          options: ['Yes', 'No'],
          optional: false
        },
        {
          key: 'Workshop Topic',
          label: 'Awesome! What do you think you would like to talk about?',
          sublabel:
            'This question is not a commitment! You can choose to change your topic or not present at any time.',
          type: 'paragraph',
          optional: false,
          check: (data) => data['Workshop Host'] == "No" || data['Workshop Host'] === undefined
        }
      ]
    },
    {
      header: 'Travel Stipends',
      label: `We're offering a limited number of stipends to cover a portion of travel expenses for those who need it to be able to make the event. Unfortunately, we can't guarantee a travel stipend.

      We plan to provide up to $500 to domestic (within North America) participants and $750 to international participants.`,
      items: [
        {
          key: 'Travel Stipend',
          label: 'Do you need a travel stipend?',
          type: 'select',
          options: ['Yes, please!', 'No, thanks.'],
          optional: false
        },
        {
          key: 'Your Nearest Airport',
          label: 'What is your nearest airport?',
          type: 'string',
          sublabel: `3 letter IATA codes are appreciated: https://www.world-airport-codes.com`,
          optional: false,
          check: (data) => data['Travel Stipend'] == "No" || data['Travel Stipend'] === undefined
        },
        {
          key: 'At the moment, what is your estimated travel cost?',
          label: 'At the moment, what is your estimated travel cost? ($USD)',
          sublabel: `Don't sweat this too much, this is just an indication, not a commitment!`,
          check: (data) => data['Travel Stipend'] == "No" || data['Travel Stipend'] === undefined,
          type: 'string',
          inputType: 'number'
        },
        {
          key: `What would a travel stipend mean to you?`,
          label: `What would a travel stipend mean to you?`,
          sublabel: `Use this field however you'd like! It can be a place to share a bit more context about you or why you're excited for Assemble.

          We're running on a limited budget, so every stipend means a lot to us and we hope it means a lot to you.`,
          type: 'paragraph',
          check: (data) => data['Travel Stipend'] == "No" || data['Travel Stipend'] === undefined
        },
        {
          key: `Do you require a letter for visa applications?`,
          label: `Do you require a letter for visa applications?`,
          sublabel: `Please note that while we can provide a letter to support your visa applications, we are unable to guarantee that you can get a visa. Check out this site for more country specific information: https://ustraveldocs.com/

          If you require further support, please email us at assemble@hackclub.com. We'll try our best!`,

          type: 'select',
          options: ['Yes', 'No'],
        }
      ]
    },
    {
      header: 'The Most Important Questions',
      items: [
        {
          key: 'Tabs or Spaces',
          label: 'Tabs vs. Spaces?',
          type: 'select',
          options: ['Tabs', 'Spaces', 'No Indent 😎'],
          optional: false
        },
        {
          key: 'Pineapple on Pizza',
          label: 'Pineapple on pizza, yes or no?',
          type: 'select',
          options: ['Yes!', 'No...why?'],
          optional: false
        }
      ]
    }
  ]
}
