module.exports = {


  friendlyName: 'Create Person.',
  description: 'Creating a new person.',


  exits: {

    success: {
      description: 'Person Created successfully.',
      viewTemplatePath: 'pages/homepage',
    }

  },

  fn: async function (inputs, exits) {
    let params = this.req.allParams();

    let person = await Users.create(params).fetch();

    return exits.success({person: person});

  }
};
