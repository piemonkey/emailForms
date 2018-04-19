import { EmailTemplateContext } from '../both/collection'

Meteor.startup(() => {
  // add One default context
  if (!EmailTemplateContext.findOne({ name: 'User' })) {
    console.log('Email-Forms: Add default email Context for users')
    EmailTemplateContext.insert({
      name: 'User',
      namespace: 'user',
      variables: [
        { name: 'firstName', description: 'first name from profile' },
        { name: 'email', description: 'first verified email' },
      ],
    })
    EmailTemplateContext.insert({
      name: 'Site',
      namespace: 'site',
      variables: [
        { name: 'url', description: 'absolute URL of the site' },
      ],
    })
  }
})
