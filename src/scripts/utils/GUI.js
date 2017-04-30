import ControlKit from 'controlkit'

class GUI extends ControlKit {
  constructor (options) {
    super(options)

    this.panel = this.addPanel()
  }

  addPanel (options = {}) {
    return super.addPanel({
      align: 'right',
      position: [0, 0],
      width: 275,
      ratio: 20,
      fixed: false,
      ...options
    })
  }
}

export default new GUI()