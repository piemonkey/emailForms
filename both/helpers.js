import { SpacebarsCompiler } from 'meteor/spacebars-compiler'
import { EmailTemplate, EmailTemplateContext } from '../both/collection'

const applyContext = (function applyContext(body, context) {
  const compiled = SpacebarsCompiler.compile(body, { isBody: true })
  const content = Blaze.toHTML(Blaze.With(context, eval(compiled)))
  return content
})

export const getContext = (function getContext(cntxlist, user, context = {}) {
  cntxlist.forEach((cntx) => {
    switch (cntx.name) {
      case 'User': {
        context[`${cntx.namespace}`] = {
          firstName: user.profile.firstName,
          email: user.emails[0].address,
        }
        break
      }
      case 'Site': {
        context[`${cntx.namespace}`] = {
          url: Meteor.absoluteUrl(),
        }
        break
      }
      default:
    }
  })
  return context
})

export const previewTemplate = (function previewTemplate(templateName, user, getContextClient, context = {}) {
  const template = EmailTemplate.findOne({ name: templateName })
  if (!template) {
    throw new Meteor.Error('500', `No email template defined ${templateName}`)
  }

  // Run getContextClient to initialize the context from the Client
  const rawcontext = EmailTemplateContext.find({ _id: { $in: template.context } }).fetch()
  const clientContext = getContextClient(rawcontext, user, context)

  // Add the default context 'User' and 'Site'
  const userRawContext = EmailTemplateContext.findOne({ name: 'User' })
  const emailContext = getContext([userRawContext], user, clientContext)
  const doc = {
    to: `${emailContext.user.firstName} <${emailContext.user.email}>`,
    from: template.from,
    subject: applyContext(template.subject, emailContext),
    body: applyContext(template.body, emailContext),
    templateId: template._id,
  }
  return doc
})

export const getFrom = (function getFrom(templateName) {
  const template = EmailTemplate.findOne({ name: templateName })
  if (template) {
    return template.from
  } return null
})
