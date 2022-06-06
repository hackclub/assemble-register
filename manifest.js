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
          type: 'string',
          optional: false
        },
        {
          key: 'Shirt',
          label: 'How would you describe your technical skills?',
          sublabel: `Everyone's welcome! This question is just to help us gauge what resources we need to support attendees.`,
          type: 'string',
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
          key: 'Full Name',
          label: 'Would you be interested in hosting a session?',
          type: 'string',
          optional: false
        },
        {
          key: 'Your Nearest Airport',
          label: 'Awesome! What do you think you would like to talk about?',
          sublabel: 'This question is not a commitment! You can choose to change your topic or not present at any time.',
          type: 'string',
          optional: false
        }
      ]
    },
    {
      header: 'Travel Stipends',
      label: `We're offering a limited number of $500 stipends to cover travel expenses for those who need it to be able to make the event. Unfortunately, we can't guarantee a travel stipend.`,
      items: [
        {
          key: 'Full Name',
          label: 'Do you need a flight stipend?',
          type: 'string',
          optional: false
        },
        {
          key: 'Your Nearest Airport',
          label: 'Your Nearest Airport',
          type: 'string',
          optional: false
        }
      ]
    },
    {
      header: 'The Most Important Questions',
      items: [
        {
          key: 'Full Name',
          label: 'Tabs vs. Spaces?',
          type: 'string',
          optional: false
        },
        {
          key: 'Your Nearest Airport',
          label: 'Pineapple on pizza, yes or no?',
          type: 'string',
          optional: false
        }
      ]
    }
  ]
}
