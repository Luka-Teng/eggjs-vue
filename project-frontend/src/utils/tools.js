// 前端工具集合 class or function
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

  remove () {
    document.body.removeChild(this.modal)
  }
}

class BottomLoad {
  constructor ({interval, callback}) {
    // 用于限制滚轮的高频操作
    this.blocked = false
    this.interval = interval || 1000
    this.callback = callback || null
    this.bindindg_function = () => {
      // 箭头函数，this作用域指向实例
      if (this.isAtBottom()) {
        if (this.blocked) {
          return
        }
        this.blocked = true
        this.callback.call(null)
        setInterval(() => {
          this.blocked = false
        }, this.interval)
      }
    }
    this.init()
  }
  // 初始化
  init () {
    document.addEventListener('scroll', this.bindindg_function)
  }
  unbind () {
    document.removeEventListener('scroll', this.bindindg_function)
  }
  // 判断是否已经到页面底端
  isAtBottom () {
    // 滚轮所在位置
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 可视的屏幕大小
    const clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    // 总高度
    const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    if (scrollTop + clientHeight === scrollHeight) return true
    return false
  }
}

export {
  ShowImage,
  BottomLoad
}
