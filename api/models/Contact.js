
module.exports = {
  attributes: {
    type: {
      type: 'string',
      enum: ['mobile', 'work', 'home', 'skype', 'email'],
      required: true,
      maxLength: 16
    },
    value: {
      type: 'string',
      maxLength: 128,
      required: true
    },
    person: {
      model: 'Person',
      required: true
    }
  },
  datastore: 'mongodb'

};
