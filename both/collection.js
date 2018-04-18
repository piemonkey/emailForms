// import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions'
// checkNpmVersions { 'simpl-schema': '0.3.x' }, 'abate:email-forms'
import SimpleSchema from 'simpl-schema'
import i18n from 'meteor/universe:i18n'

SimpleSchema.extendOptions(['autoform'])

export const EmailTemplate = new Mongo.Collection('emailTemplate')
export const EmailTemplateContext = new Mongo.Collection('emailTemplateContext')

const getFrom = (function getFrom() {
  const t = EmailTemplate.find({}).map(t => ({ value: t.from, label: t.from }))
  return [...new Set(t)]
})

const getContext = (function getContext() {
  const t = EmailTemplateContext.find().map(t => ({ value: t._id, label: t.name }))
  return t
})

export const Schemas = {}

Schemas.EmailTemplateContext = new SimpleSchema({
  name: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'context_name'),
    // autoform: {
    //   afFieldHelpText: () => i18n.__('abate:email-forms', 'template_name_help'),
    // },
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
    // autoform: {
    //   afFieldHelpText: () => i18n.__('abate:email-forms', 'template_name_help'),
    // },
  },

  context: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'template_context'),
    autoform: {
      type: 'select2',
      options: getContext,
      afFieldInput: {
        select2Options: () => ({
          width: '100%',
        }),
      },
    },
  },

  from: {
    type: String,
    label: () => i18n.__('abate:email-forms', 'from'),
    autoform: {
      type: 'select2',
      options: getFrom,
      afFieldInput: {
        select2Options: () => ({
          tags: true,
          width: '100%',
          allowClear: true,
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
