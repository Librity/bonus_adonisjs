'use strict'

const Mail = use('Mail')

class ForgotPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'ForgotPasswordMail-job'
  }

  // This is where the work is done.
  async handle({ email, token, redirectUrl }) {
    console.log('ForgotPasswordMail-job started')
    await Mail.send(
      ['emails.forgot_password', 'emails.forgot_password-text'],
      {
        email,
        token,
        link: `${redirectUrl}?token=${token}`
      },
      message => {
        message
          .to(email)
          .from('test@test.com', 'Test | test')
          .subject('Recuperação de senha')
      }
    )
  }
}

module.exports = ForgotPasswordMail
