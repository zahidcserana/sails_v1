/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  displayAll: function (request, response) {
    Users.find({}).exec(function (err, users) {
      if (err) {
        res.send(500, 'Query failed');
      }
      response.view('displayAll', {users: users});
    });
  },

  userAdd: function (request, response) {
    response.view('userAdd');
  },

  userStore: function (request, response) {
    
  }
};

