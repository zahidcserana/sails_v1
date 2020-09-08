module.exports = {


  friendlyName: 'Delete',


  description: 'Delete post.',


  inputs: {
    postId: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/post/edit',
    },
    invalid: {
      description: 'This was an invalid post to delete'
    },
    notFound: {
      description: 'No post with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    console.log("This route shows home edit of posts")

    const record = await Post.findOne({id: inputs.postId});
    if (!record) { throw 'notFound'; }
    return {
      record
    };
  }


};
