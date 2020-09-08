module.exports = {


  friendlyName: 'Update',


  description: 'Update post.',


  inputs: {
    postId: {
      type: 'string',
      required: true
    },
    title: {
      description: 'Title of post object',
      type: 'string',
      required: true
    },
    postBody: {
      type: 'string', required: true
    }
  },


  exits: {},


  fn: async function (inputs) {
    console.log('This route shows home update of posts');

    await Post.update({id: inputs.postId})
      .set({
        title: inputs.title,
        body: inputs.postBody
      });

    this.res.redirect('/home');
    // return;
  }


};
