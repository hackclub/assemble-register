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
          key: 'Shirt',
          label: 'Shirt Size',
          type: 'select',
          options: [
            'Extra-Small',
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
            'Intermediate: I have taken cs classes OR worked on small individual projects',
            'Advanced: I’m comfortable with my skill set and can work on a project without much guidance'
          ],
          optional: false
        },
        {
          key: 'Dietary Restrictions',
          label: 'Do you have any dietary restrictions? Please list them here.',
          type: 'paragraph',
          optional: true
        }
      ]
    },
    {
      header: 'Workshops',
      label: `At Assemble, attendees will host their own informal workshops!`,
      items: [
        {
          key: 'Workshop Host',
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
      label: `We're offering a limited number of $500 stipends to cover travel expenses for those who need it to be able to make the event. Unfortunately, we can't guarantee a travel stipend.`,
      items: [
        {
          key: 'Travel Stipend',
          label: 'Do you need a travel stipend?',
          type: 'select',
          options: ['Yes', 'No'],
          optional: false
        },
        {
          key: 'Your Nearest Airport',
          label: 'What is your nearest airport?',
          type: 'string',
          optional: false,
          check: (data) => data['Travel Stipend'] == "No" || data['Travel Stipend'] === undefined
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
