const Service = require('egg').Service;
const fs = require('fs')
const path = require('path')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write

class PostService extends Service {
  // 保存图片
  async savePostImage () {
    const {ctx} = this
    const stream = await this.ctx.getFileStream()
    if (!ctx.helper.isImage(stream.mimeType)) {
      throw "invalid file"
    }
    const filename = ctx.helper.getToken() + path.extname(stream.filename).toLowerCase()
    const target = path.join(this.config.baseDir, 'app/public/postImages', filename)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    return filename
  }
}

module.exports = PostService;
