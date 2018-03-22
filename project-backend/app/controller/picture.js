'use strict';
const fs = require('fs')
const path = require('path')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write
const Controller = require('egg').Controller

class PictureController extends Controller {
  // upload the pictures
  async uploadPictures() {
    const {ctx} = this
    const parts = this.ctx.multipart()
    // part存放文件流，files存放以存储的文件名
    let part, files = []
    // parts 返回promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是普通的字段
        console.log('field: ' + part[0])
        console.log('value: ' + part[1])
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname)
        console.log('filename: ' + part.filename)
        console.log('encoding: ' + part.encoding)
        console.log('mime: ' + part.mime)
        // 获取文件名
        const filename = part.filename
        // 获取文件存放路径
        const target = path.join(this.config.baseDir, 'app/public', filename)
        // 创建write流
        const writeStream = fs.createWriteStream(target)
        // 写入app/public文件夹
        try {
          await awaitWriteStream(part.pipe(writeStream))
        } catch (err) {
          await sendToWormhole(part)
          throw err
        }
        // 加入files数组
        files.push(filename)
      }
    }

  }
  // delete the pictures

  // get the pictures

}

module.exports = PictureController
