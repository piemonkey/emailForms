import { SpacebarsCompiler } from 'meteor/spacebars-compiler'
import { EmailTemplate, EmailTemplateContext } from '../both/collection'

const applyContext = (function applyContext(body, context) {
  const compiled = SpacebarsCompiler.compile(body, { isBody: true })
  const content = Blaze.toHTML(Blaze.With(context, eval(compiled)))
  return content
})

export const getContext = (function getContext(cntxlist, user) {
  const context = {}
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

export const previewTemplate = (function previewTemplate(templateName, user, getContext) {
  const template = EmailTemplate.findOne({ name: templateName })
  const rawcontext = EmailTemplateContext.find({ _id: { $in: template.context } }).fetch()
  const userRawContext = EmailTemplateContext.findOne({ name: 'User' })
  const userContext = getContext([userRawContext], user)
  const emailContext = getContext(rawcontext, user)
  if (template) {
    return {
      to: `${userContext.user.firstName} <${userContext.user.email}>`,
      from: template.from,
      subject: applyContext(template.subject, emailContext),
      text: applyContext(template.body, emailContext),
      templateId: template._id,
    }
  }
})
