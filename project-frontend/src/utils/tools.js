// 创建单例图片展示
class ShowImage {
  constructor () {
    this.image = new Image()
    this.modal = null
    this.init()
  }

  init () {
    // 创建外层div
    const outer_div = document.createElement('div')
    outer_div.className = 'w3-modal'
    outer_div.id = 'show_image'
    outer_div.onclick = function () {
      this.style.display = 'none'
    }
    // 创建内层div
    const inner_div = document.createElement('div')
    inner_div.className = 'w3-modal-content w3-animate-zoom'
    // 嵌套元素
    outer_div.appendChild(inner_div)
    inner_div.appendChild(this.image)
    this.image.style = 'width:100%'
    // 指定modal
    this.modal = outer_div
    document.body.appendChild(this.modal)
  }

  show (src) {
    this.image.src = src
    this.modal.style.display = 'block'
  }
}

export {
  ShowImage
}
