import { EmailTemplate } from '../both/collection'

Meteor.publish('emailTemplate', () => EmailTemplate.find())
