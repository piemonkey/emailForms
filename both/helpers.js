import { SpacebarsCompiler } from 'meteor/spacebars-compiler'
import { EmailTemplate, EmailTemplateContext } from '../both/collection'

const applyContext = (function applyContext(body, context) {
  const compiled = SpacebarsCompiler.compile(body, { isBody: true })
  const content = Blaze.toHTML(Blaze.With(context, eval(compiled)))
  return content
})

export const getContext = (function getContext(cntx, user) {
  let context = {
    site_url: Meteor.absoluteUrl(),
  }
  switch (cntx.name) {
    case 'User': {
      context = _.extend(context, {
        firstName: user.profile.firstName,
        email: user.emails[0].address,
      })
      break
    }
    default:
  }
  return context
})

export const previewTemplate = (function previewTemplate(templateName, user, getContext) {
  const template = EmailTemplate.findOne({ name: templateName })
  const rawcontext = EmailTemplateContext.findOne(template.context)
  const userRawContext = EmailTemplateContext.findOne({ name: 'User' })
  const userContext = getContext(userRawContext, user)
  const emailContext = getContext(rawcontext, user)
  if (template) {
    return {
      to: applyContext('{{firstName}} {{email}}', userContext),
      from: template.from,
      subject: applyContext(template.subject, emailContext),
      text: applyContext(template.body, emailContext),
      templateId: template._id,
    }
  }
})
