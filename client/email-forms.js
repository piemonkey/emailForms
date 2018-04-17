import { EmailTemplate } from '../both/collection'

Template.emailFormsTemplate.helpers({
  form: () => ({ collection: EmailTemplate }),
  data: () => (Template.currentData()),
})


Template.emailForms.onCreated(function onCreated() {
  const template = this
  template.subscribe('emailTemplate')
  template.selected = new ReactiveVar()
  if (template.isSubscriptionReady) {
    template.selected.set(EmailTemplate.findOne())
  }
})

Template.emailForms.helpers({
  templatelist: () => {
    const l = EmailTemplate.find(
      {},
      { fields: { name: 1, _id: 1 }, sort: { name: 1 } },
    ).map((e) => {
      e.selected = ''
      return e
    })
    l.push({ name: 'Select Template', selected: 'selected' })
    return l
  },
  selected: () => Template.instance().selected.get(),
})

Template.emailForms.events({
  'change #templatepicker': (event, template) => {
    const id = template.$(event.target).val()
    template.selected.set(EmailTemplate.findOne(id))
  },
})
