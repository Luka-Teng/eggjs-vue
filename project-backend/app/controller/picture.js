'use strict';
const Controller = require('egg').Controller
const path = require('path')

class PictureController extends Controller {
  // upload the pictures
  async uploadPictures () {
    const {ctx} = this
    const user_id = ctx.user.id
    try {
      const result = await ctx.service.picture.savePictures()
      const {tag_name, files} = result
      // 如果存在已经存储的文件，则写入数据库
      if (files.length) {
        const pictures_data = []
        files.forEach((file) => {
          pictures_data.push({
            url: file.path,
            name: file.filename,
            user_id: user_id,
            tag_name: tag_name
          })
        })
        await ctx.model.Picture.bulkCreate(pictures_data, { validate: true })
        ctx.body = {
          status: 'success',
          msg: 'store the files successfully'
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'no pictures'
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // remove the pictures
  async removePictures () {
    const {ctx} = this
    const user_id = ctx.user.id
    // 字段验证
    const rule = {
      urls: {
        type: 'array',
        required: true,
        itemType: 'string'
      }
    }
    try {
      ctx.validate(rule)
      const urls = ctx.request.body.urls
      // 创建异步函数集
      const async_funcs = urls.map((url) => {
        return async function () {
          let result = await ctx.model.Picture.destroy({
            where: {
              user_id: user_id,
              url: url
            }
          })
          if (result > 0) {
            ctx.service.picture.removePicture(url)
          }
        }
      })
      // 将异步函数同步运行
      for (let async_func of async_funcs) {
        await async_func()
      }
      ctx.body = {
        status: 'success',
        msg: 'remove the pictures successfully'
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // 获取图片tags
  async tags () {
    const {ctx} = this
    try {
      const all_tags = await ctx.model.Tag.findAll()
      if (all_tags.length > 0) {
        const data = all_tags.map((tag) => {
          return tag.dataValues.tag_name
        })
        ctx.body = {
          status: 'success',
          msg: data,
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'tags unavailable',
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }

  // 获取图片
  async getPictures () {
    const {ctx} = this
    const user_id = ctx.user.id
    // 字段验证
    const rule = {
      from: {
        type: 'int',
        required: true
      },
      limit: {
        type: 'int',
        required: true
      }
    }
    try {
      const {from, limit} = {
        from: parseInt(ctx.request.query.from),
        limit: parseInt(ctx.request.query.limit)
      }
      ctx.validate(rule, {from, limit})
      // 获取图片
      const pictures = await ctx.model.Picture.findAll({
        where: {
          user_id: user_id
        },
        offset: from,
        limit: limit
      })
      if (pictures.length > 0) {
        const data = pictures.map((picture) => {
          return picture.dataValues
        })
        ctx.body = {
          status: 'success',
          msg: data,
        }
      } else {
        ctx.body = {
          status: 'failed',
          msg: 'pictures unavailable',
        }
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
      }
    }
  }
}

module.exports = PictureController
