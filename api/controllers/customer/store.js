module.exports = {


  friendlyName: 'CustomerCreate',


  description: 'Register for a new Customer.',


  extendedDescription:
    `This creates a new customer record in the database, signs in the requesting customer agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new customer's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,


  inputs: {

    email: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    mobile: {
      required: true,
      type: 'string',
      maxLength: 20,
      example: '01111111111',
      description: 'The Customer\'s mobile'
    },

    fullName: {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The customer\'s full name.',
    }

  },


  exits: {

    success: {
      description: 'New customer account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, mobile and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical customer interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function ({email, password, fullName}) {

    var newEmail = email.toLowerCase();

    // Build up data for the new customer record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newCustomerRecord = await Customer.create(_.extend({
      fullName,
      email: newEmail,
      password,
      tosAcceptedByIp: this.req.ip
    }, sails.config.custom.verifyEmailAddresses ? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    } : {}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        email: newEmail
      }).timeout(5000).retry();
      await Customer.updateOne({id: newCustomerRecord.id})
        .set({
          stripeCustomerId
        });
    }

    // Store the customer's new id in their session.
    this.req.session.customerId = newCustomerRecord.id;

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmail,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName,
          token: newCustomerRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

  }

};
