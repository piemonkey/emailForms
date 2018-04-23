import {
  insertEmailTemplate,
  updateEmailTemplate,
  removeEmailTemplate,
} from './both/methods'
import { previewTemplate, getFrom } from './both/helpers'
import { EmailTemplate, EmailTemplateContext } from './both/collection'

// XXX don't quite understand why I've to write it in this convouluted way
EmailForms = (function f() {
  return {
    insertEmailTemplate,
    updateEmailTemplate,
    removeEmailTemplate,
    previewTemplate,
    getFrom,
    Collections: { EmailTemplate, EmailTemplateContext },
  }
})

EmailForms = new EmailForms()
