import { Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from 'three'

import GUI from 'WebGL/utils/GUI'

class Cube extends Object3D {
  constructor () {
    super()
    const geometry = new BoxGeometry(20, 20, 20)
    const material = new MeshBasicMaterial({ color: 0xffffff, wireframe: true })

    this.mesh = new Mesh(geometry, material)
    this.add(this.mesh)

    this.initGUI()
  }

  initGUI () {
    this.position.range = [-10, 10]
    // const GUIPanel = new GUI()
    GUI.panel
      .addSlider(this.position, 'x', 'range')
  }

  update () {
    this.rotation.x += 0.01
  }
}

export default Cube
