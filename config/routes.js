/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {view: 'pages/homepage'},

  'GET /customer/create': {action: 'customer/view-create'},
  'GET /users/displayAll': {action: 'users/displayAll'},
  'GET /users/userAdd': {action: 'entrance/view-signup'},
  'POST /users/userStore': {action: 'user-store'},
  'GET /product/:ref': 'ProductController.show',
  '/product/add': {action: 'product/add'},
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  'POST  /api/v1/entrance/signup': {action: 'entrance/signup'},
  'POST  /api/v1/customer/store': {action: 'customer/store'},

  'POST /post': 'post/create',
  'DELETE /post/:postId': 'post/delete',
  'GET /post/:postId': 'post/edit',
  'POST /post/:postId/update': 'post/update',
  'GET /home': 'post/home',
};
