'use strict';
const Controller = require('egg').Controller

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
    const urls = ctx.request.body.urls
    try {
      // 创建异步函数集
      const async_funcs = urls.map((url) => {
        return async function () {
          let result = await ctx.model.Picture.destroy({
            where: {
              id: user_id,
              url: url
            }
          })
          if (result > 0) {
            ctx.service.removePicture(url)
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
      let all_tags = await ctx.model.Tag.findAll()
      all_tags = all_tags.map((tag) => {
        return tag.dataValues.tag_name
      })
      if (all_tags.length > 0) {
        ctx.body = {
          status: 'success',
          msg: all_tags,
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

}

module.exports = PictureController
