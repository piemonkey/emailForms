// import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions'
// checkNpmVersions { 'simpl-schema': '0.3.x' }, 'abate:email-forms'
import SimpleSchema from 'simpl-schema'
import i18n from 'meteor/universe:i18n'

SimpleSchema.extendOptions(['autoform'])

export const EmailTemplate = new Mongo.Collection('emailTemplate')
export const EmailTemplateContext = new Mongo.Collection('emailTemplateContext')

const getFrom = (function getFrom() {
  const options = _.chain(EmailTemplate.find().fetch({}))
    .unique(e => e.from)
    .map(e => ({ value: e.from, label: e.from }))
    .value()

  return options
})

const getContext = (function getContext() {
  const options = _.chain(EmailTemplateContext.find().fetch())
    .unique(e => e._id)
    .map(e => ({ value: e._id, label: e.name }))
    .value()

  return options
})

export const Schemas = {}

Schemas.EmailTemplateContext = new SimpleSchema({
  name: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'context_name'),
  },
  namespace: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'context_namespace'),
  },
  variables: {
    type: Array,
  },
  'variables.$': {
    type: new SimpleSchema({
      name: String,
      description: String,
    }),
  },
})

EmailTemplateContext.attachSchema(Schemas.EmailTemplateContext)

Schemas.EmailTemplate = new SimpleSchema({
  name: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'template_name'),
  },

  context: {
    type: Array,
    label: () => i18n.__('abate:email-forms', 'template_context'),
    autoform: {
      type: 'select2',
      options: getContext,
      afFieldInput: {
        // XXX not sure how to set the default here ...
        // defaultValue() { return EmailTemplateContext.find({ name: 'User' }).fetch() },
        multiple: true,
        select2Options: () => ({
          width: '100%',
          placeholder: () => i18n.__('abate:email-forms', 'select_context'),
        }),
      },
    },
  },
  'context.$': String,

  from: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'from'),
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      type: 'select2',
      options: getFrom,
      afFieldInput: {
        select2Options: () => ({
          tags: true,
          width: '100%',
          allowClear: true,
          placeholder: () => i18n.__('abate:email-forms', 'select_or_add'),
        }),
      },
    },
  },

  subject: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'template_subject'),
  },

  body: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'template_body'),
    autoform: {
      rows: 10,
    },
  },

  notes: {
    type: String,
    optional: true,
    label: () => i18n.__('abate:email-forms', 'template_notes'),
    autoform: {
      rows: 5,
    },
  },

})

EmailTemplate.attachSchema(Schemas.EmailTemplate)
