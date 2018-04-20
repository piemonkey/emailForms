Simple form to store Email templates

This package exports 4 functions

- `previewTemplate` : Get as aguments a template Name, a Meteor.user object and a function to provide the context for the template.
- `insertEmailTemplate` : a ValidatedMethod object. The module itself does not instantiate any methods, but provides ValidatedMethod objects to be used and extended with the client specify authorizations
- `updateEmailTemplate` : update the EmailTemplate collection
- `removeEmailTemplate` : remove the EmailTemplate collection

Usage:
====

In the client main file instantiate and extend ValidatedMethod object provided by the module

```
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { EmailForms } from 'meteor/abate:email-forms'

export var insertEmailTemplate = new ValidatedMethod(EmailForms.insertEmailTemplate)
insertEmailTemplate.mixins [LoggedInMixin]

export const updateEmailTemplate = new ValidatedMethod(EmailForms.updateEmailTemplate)

export const removeEmailTemplate = new ValidatedMethod(EmailForms.removeEmailTemplate)

```
