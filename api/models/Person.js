module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      maxLength: 128,
      required: true
    },
    lastName: {
      type: 'string',
      maxLength: 128
    },
    contacts: {
      collection: 'Contact',
      via: 'person'
    }
  },
  datastore: 'mongodb'

};
