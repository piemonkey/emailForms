import { EmailTemplate } from '../both/collection'
import { previewTemplate, getContext } from '../both/helpers'

Template.emailFormsTemplate.helpers({
  form: () => ({ collection: EmailTemplate }),
  data: () => (Template.currentData()),
})

Template.emailForms.bindI18nNamespace('abate:email-forms')
Template.emailForms.onCreated(function onCreated() {
  const template = this
  template.subscribe('emailTemplate')
  template.selected = new ReactiveVar()
  if (template.subscriptionsReady) {
    template.selected.set(EmailTemplate.findOne())
  }
})

// Template.emailForms.onRendered(() => {
//
// })

// XXX This is not good. we should use a select2 instead
Template.emailForms.helpers({
  templatelist: () => {
    const l = EmailTemplate.find(
      {},
      { fields: { name: 1, _id: 1 }, sort: { name: 1 } },
    ).map((e) => {
      e.selected = ''
      return e
    })
    l.push({ name: 'New Template', selected: 'selected' })
    return l
  },
  selected: () => Template.instance().selected.get(),
})

Template.emailForms.events({
  'change #templatepicker': (event, template) => {
    const id = template.$(event.target).val()
    template.selected.set(EmailTemplate.findOne(id))
  },
  'click [data-action="new-template"]': (event, template) => {
    template.selected.set({})
  },
  'click [data-action="preview-template"]': (event, template) => {
    const t = Template.instance().selected.get()
    const preview = previewTemplate(t.name, Meteor.user(), getContext)
    // TODO show the preview in a modal
    console.log(preview)
  },
})
