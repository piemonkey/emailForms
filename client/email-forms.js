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
    template.selected.set()
  }
})

Template.emailForms.onRendered(function onRendered() {
  const template = this

  template.autorun(() => {
    const sel = { fields: { name: 1, _id: 1 }, sort: { name: 1 } }
    // seelct2 uses {id,text} and NOT {value,label}
    const options = _.chain(EmailTemplate.find().fetch({}, sel))
      .unique(e => e._id)
      .map(e => ({ id: e._id, text: e.name }))
      .value()

    const select2Instance = template.$('#templatepicker').select2({
      placeholder: 'Select an option',
      data: options,
    })
  })
})

Template.emailForms.helpers({
  selected: () => Template.instance().selected.get(),
})

Template.emailForms.events({
  'select2:select #templatepicker': (event, template) => {
    const id = template.$('#templatepicker :selected').val()
    template.selected.set(EmailTemplate.findOne(id))
  },
  'click [data-action="new-template"]': (event, template) => {
    template.selected.set()
  },

  'click [data-action="remove-template"]': (event, template) => {
    if (template.selected.get()) {
      Meteor.call('emailTemplate.remove', (err) => {
        if (err) { console.log(err.reason) } else { template.selected.set() }
      })
    }
  },
  'click [data-action="preview-template"]': (event, template) => {
    const t = template.selected.get()
    const preview = previewTemplate(t.name, Meteor.user(), getContext)
    // TODO show the preview in a modal
    console.log(preview)
  },
})
