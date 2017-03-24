import ControlKit from 'controlkit'

class GUI extends ControlKit {
  constructor (options) {
    // const container = document.createElement('div')
    // container.id = 'controlKitContainer'
    // document.getElementById('container').appendChild(container)

    const finalOptions = {...options, ...{parentDomElementId: 'controlKitContainer'}}

    console.log(finalOptions)

    super(finalOptions)

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
