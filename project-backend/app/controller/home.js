'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
      const {ctx} = this
      try {
        let picture = await ctx.model.Picture.destroy({
          where:{id: [20, 21]}
        })
        console.log(picture)
      } catch (e) {
        console.log(e)
      }

      ctx.body = `<form method="POST" action="/uploadPictures?_csrf=${ctx.csrf}" enctype="multipart/form-data">
      title: <input name="tag_name" />
      file: <input name="files[]" type="file" />
      file: <input name="files[]" type="file" />
      file: <input name="files[]" type="file" />
      <button type="submit">上传</butto
      </form>`
  }
}

module.exports = HomeController
