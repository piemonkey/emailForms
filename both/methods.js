import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
// import { check } from 'meteor/check'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { EmailTemplate, Schemas } from './collection'

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message)
  ddpError.error = 'validation-error'
  ddpError.details = error.details
  return ddpError
})

export const insertEmailTemplate = new ValidatedMethod({
  name: 'emailTemplate.insert',
  validate: Schemas.EmailTemplate.validator({ clean: true }),
  run(doc) {
    // if (!Volunteers.isManager()) {
    //   throw new Meteor.Error('unauthorized', "You don't have permission for this operation")
    // }
    console.log('emailTemplate.insert', doc)
    EmailTemplate.insert(doc)
  },
})

export const updateSetting = new ValidatedMethod({
  name: 'emailTemplate.update',
  validate: (doc) => {
    Schemas.EmailTemplate.validate(doc.modifier, { clean: true, modifier: true })
  },
  run(doc) {
    // if (!Volunteers.isManager()) {
    //   throw new Meteor.Error('unauthorized', "You don't have permission for this operation")
    // }
    // // TODO: should be an upsert
    console.log('emailTemplate.update', doc.modifier)
    EmailTemplate.update(doc._id, doc.modifier)
  },
})
