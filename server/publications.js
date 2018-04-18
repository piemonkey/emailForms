import { EmailTemplate, EmailTemplateContext } from '../both/collection'

Meteor.publish('emailTemplate', () =>
  [
    EmailTemplate.find(),
    EmailTemplateContext.find(),
  ])
