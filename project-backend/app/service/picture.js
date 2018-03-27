const Service = require('egg').Service;
const fs = require('fs')
const path = require('path')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write

class PictureService extends Service {
  // 保存图片
  async savePictures () {
    const {ctx} = this
    const parts = this.ctx.multipart()
    // part存放文件流，files存储文件名和路径, tag_name存储这批图片的标签
    let part, tag_name = 'default', files = []
    // parts 返回promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是普通的字段
        // part[0]: field, part[1]: value
        tag_name = 'grass'
        part[0] === 'tag_name' ? (part[1] ? tag_name = part[1] : '') : ''
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          throw "can not process with empty file"
        }
        // part 是上传的文件流
        // 获取文件名
        const filename = part.filename
        // 获取文件后缀名
        const suffix = filename.split('.').splice(-1)
        // 判断是否是图片，否则报错
        if (!suffix || !ctx.helper.isImage(part.mime)) {
          throw "invalid file"
        }
        // 获取token文件名
        const token_name = ctx.helper.getToken() + '.' + suffix
        // 获取文件存放路径
        const target = path.join(this.config.baseDir, 'app/public', token_name)
        // 创建write流
        const writeStream = fs.createWriteStream(target)
        // 写入app/public文件夹
        try {
          await awaitWriteStream(part.pipe(writeStream))
        } catch (e) {
          await sendToWormhole(part)
          throw e
        }
        // 加入files数组
        files.push({
          path: path.join('/public', token_name),
          filename: filename
        })
      }
    }
    // 返回文件的基本信息
    return {
      files,
      tag_name
    }
  }

  // 删除图片，同步函数不需要async
  removePicture (url) {
    // 从url转到path
    path = url.join(this.config.baseDir, 'app', path)
    // 删除文件
    fs.unlinkSync(path)
  }
}

module.exports = PictureService;
