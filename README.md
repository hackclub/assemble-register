# Register
This is the registration form that was used for [Assemble!](https://github.com/hackclub/assemble)

## Setup

1. Clone the repository and enter it
```
git clone https://github.com/hackclub/www-assemble-register.git
cd www-assemble-register
```
2. Install packages
```
yarn
```
or
```
npm install
```
3. Change questions to your liking
Locate `lib/manifest.json` and edit/add/remove questions to your liking. For more information about `manifest.json`, click [here](https://github.com/hackclub/www-assemble-register#manifest)

4. Add environment variables and customize
Add a `.env` file with your AirTable API key set to the variable `AIRTABLE`. [How do I get my API key?](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-)
Locate `lib/airtable.js` and change the `registrationsAirtable` baseID to your Airtable base ID, which is found in your Airtable URL and usually starts with `app`.

5. Enable submissions
Locate `pages/index.js` and set `disabled={false}` for the last `<Button>` element on the page.

6. Add necessary fields to Airtable
Create a new table called `Registrations`.  
Add fields/columns with names that match up with the `key` value for each question in `manifest.json`. Make sure the column type matches up with question type in `manifest.json`

6. Run
```
yarn dev
```
or
```
npm run dev
```

## Manifest
Manifest is composed of an array called questions with each element inside the array representing a section of the form.  
`header` **string** is the header that is displayed at the top of the section.  
`items` **Array\<Question\>** is an array that contains the questions.  

#### Questions
`key` **string** REQUIRED must match the name of an Airtable column in `Registrations`<br/>
![image](https://user-images.githubusercontent.com/66806100/184732849-8c2baa61-c9a5-4416-b38e-03867dd2975d.png)
`label` **string** is what is shown to the user  
`sublabel` **string** is a secondary label/description of the field  
`type` **string** REQUIRED determines what type of input field the user will see.  
    `string` input  
    `paragraph` textarea  
    `checkbox` checkbox  
    `select` select  
`inputType` **string** specifies validation with `type=VALUE`  
    `email` email validation  
`placeholder` **string** is a placeholder  
`options` **Array\<string\>** is used when `select` is specified as a input type  
`optional` **boolean** determines if the input field is optional  
`check` **function(data)**  
    `data` is an object that contains all the other question values. Ex. data\["Travel Stipends"\] pulls the value of the question with "Travel Stipends" as the `key`.
