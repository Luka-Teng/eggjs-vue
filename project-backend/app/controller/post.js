'use strict';

const Controller = require('egg').Controller

class PostController extends Controller {
  // upload a post
  async uploadPost () {
    const {ctx} = this
    const user_id = ctx.user.id
    // 字段验证
    const rule = {
      title: {
        type: 'string',
        require: true,
        allowEmpty: false
      },
      content: {
        type: 'string',
        require: true,
        allowEmpty: true
      }
    }
    try {
      ctx.validate(rule)
      const params = {
        user_id,
        title: ctx.request.body.title,
        content: ctx.request.body.content
      }
      const post = await ctx.model.Post.create(params)
      if (post) {
        ctx.body = {
          status: 'success',
          msg: post.dataValues
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'failed to create a post'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // edit a post
  async editPost () {
    const {ctx} = this
    // 字段验证
    const rule = {
      title: {
        type: 'string',
        require: true,
        allowEmpty: false
      },
      content: {
        type: 'string',
        require: true,
        allowEmpty: true
      },
      id: {
        type: 'int',
        require: true
      }
    }
    try {
      ctx.validate(rule)
      const params = {
        title: ctx.request.body.title,
        content: ctx.request.body.content
      }
      const post = await ctx.model.Post.update(params, {where: {id: ctx.request.body.id}})
      if (post) {
        ctx.body = {
          status: 'success',
          msg: 'update the post successfully'
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'failed to update the post'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }
  // remove a post
  async removePost () {
    const {ctx} = this
    const user_id = ctx.user.id
    // 字段验证
    const rule = {
      id: {
        type: 'int',
        require: true
      }
    }
    try {
      ctx.validate(rule)
      const params = {
        id: ctx.request.body.id
      }
      const result = await ctx.model.Post.destroy({where: params})
      if (result) {
        ctx.body = {
          status: 'success',
          msg: 'remove the post successfully'
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'failed to remove the post'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // list of posts
  async getPosts () {
    const {ctx} = this
    // 默认展现主用户
    const user_id = 1
    // 字段验证
    const rule = {
      from: {
        type: 'int'
      },
      limit: {
        type: 'int'
      }
    }
    try {
      const {from, limit} = {
        from: parseInt(ctx.request.query.from) || 0,
        limit: parseInt(ctx.request.query.limit) || 10
      }
      ctx.validate(rule, {from, limit})
      // 获取图片
      const posts = await ctx.model.Post.findAll({
        where: {
          user_id: user_id
        },
        offset: from,
        limit: limit
      })
      if (posts.length > 0) {
        const data = posts.map((post) => {
          return {
            id: post.dataValues.id,
            title: post.dataValues.title,
            created_at: post.dataValues.created_at
          }
        })
        ctx.body = {
          status: 'success',
          msg: data,
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'posts unavailable',
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // get a post
  async getPost () {
    const {ctx} = this
    // 默认展现主用户
    const user_id = 1
    // 字段验证
    const rule = {
      post_id: {
        type: 'int',
        require: true
      }
    }
    try {
      const post_id = parseInt(ctx.params.id) || 1
      ctx.validate(rule, {post_id})
      // 获取图片
      const post = await ctx.model.Post.findOne({
        where: {
          user_id: user_id,
          id: post_id
        }
      })
      if (post) {
        ctx.body = {
          status: 'success',
          msg: post,
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'post unavailable',
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // upload the post images
  async uploadPostImage () {
    const {ctx} = this
    try {
      const result = await ctx.service.post.savePostImage()
      ctx.body = {
        status: 'success',
        msg: 'store the files successfully',
        data: result
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }
}

module.exports = PostController
