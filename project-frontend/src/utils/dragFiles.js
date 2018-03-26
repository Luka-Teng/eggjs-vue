// this is the library to add files by draging
class DragFiles {
  constructor ({id, white_list, max_files, max_size}) {
    // check if the element_id is valid
    if (!document.getElementById(id)) {
      throw new Error('can not find out such a element')
    }
    this.files = []
    this.area = document.getElementById(id)
    // 默认只允许图片
    const default_white_list = new Set(['image/jpeg', 'image/png', 'image/x-png', 'image/gif'])
    this.white_list = white_list ? default_white_list.add(...white_list) : default_white_list
    // 默认最大文件数为10
    this.max_files = max_files || 10
    // 默认最大文件大小为2mb
    this.max_size = max_size || 2097152
    this.init()
  }

  // 初始化操作
  init () {
    this.onDrop(() => {})
    this.onDragOver(() => {})
    this.onDragEnter(() => {})
    this.onDragLeave(() => {})
  }

  isAllowed (type, size) {
    return (this.white_list.has(type) && (this.max_size >= size))
  }

  // 删除所有文件
  deleteFiles () {
    this.files = []
  }

  // 拖拽过程中的方法
  onDragOver (fn) {
    this.area.ondragover = (e) => {
      // 阻止文件自动打开
      e.preventDefault()
      e.stopPropagation()
      // 因为使用了箭头函数，this强行替换为DragFiles的实例，要重新指定, 也可以写e.target
      fn.apply(this.area, [this.area])
    }
  }

  // 拖拽离开过程中的方法
  onDragLeave (fn) {
    this.area.ondragleave = (e) => {
      e.preventDefault()
      e.stopPropagation()
      fn.apply(this.area, [this.area])
    }
  }

  // 拖拽离开过程中的方法
  onDragEnter (fn) {
    this.area.ondragenter = (e) => {
      e.preventDefault()
      e.stopPropagation()
      fn.apply(this.area, [this.area])
    }
  }

  // 放下文件的方法
  onDrop (fn) {
    this.area.ondrop = (e) => {
      this.deleteFiles()
      e.preventDefault()
      e.stopPropagation()
      const files = e.dataTransfer.files
      let data = {}
      // 不能超过上传文件的上限
      if (files.length > this.max_files) {
        data = {
          status: 'failed',
          msg: `can not store ${this.max_files} files at once`,
          data: null
        }
        return fn.apply(this.area, [this.area, data])
      }
      // 文件数据存储到files, 并判断是否在文件白名单, 并且大小不超值
      for (let file of files) {
        if (!this.isAllowed(file.type, file.size)) {
          this.deleteFiles()
          data = {
            status: 'failed',
            msg: `containing unexpected files`,
            data: null
          }
          return fn.apply(this.area, [this.area, data])
        }
        this.files.push({
          name: file.name,
          file: file
        })
      }
      // fn用来用户定义放下文件后的方法
      data = {
        status: 'success',
        msg: `store the files successfully`,
        data: this.files
      }
      return fn.apply(this.area, [this.area, data])
    }
  }
}

export default DragFiles
