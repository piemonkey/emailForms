import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import { check } from 'meteor/check'
// import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { EmailTemplate, Schemas } from './collection'

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message)
  ddpError.error = 'validation-error'
  ddpError.details = error.details
  return ddpError
})

export const insertEmailTemplate = {
  name: 'emailTemplate.insert',
  validate: Schemas.EmailTemplate.validator({ clean: true }),
  run(doc) {
    console.log('emailTemplate.insert', doc)
    EmailTemplate.insert(doc)
  },
}
// new ValidatedMethod(insertEmailTemplate)

export const updateEmailTemplate = {
  name: 'emailTemplate.update',
  validate(doc) {
    Schemas.EmailTemplate.validate(doc.modifier, { clean: true, modifier: true })
  },
  run(doc) {
    // // TODO: should be an upsert
    console.log('emailTemplate.update', doc.modifier)
    EmailTemplate.update(doc._id, doc.modifier)
  },
}
// new ValidatedMethod(updateEmailTemplate)

export const removeEmailTemplate = {
  name: 'emailTemplate.remove',
  validate(id) { check(id, String) },
  run(id) {
    console.log('emailTemplate.remove', id)
    EmailTemplate.remove(id)
  },
}
// new ValidatedMethod(removeEmailTemplate)
