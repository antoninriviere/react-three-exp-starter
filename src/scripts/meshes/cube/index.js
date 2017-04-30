import { Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from 'three'

import GUI from 'Utils/GUI'

class Cube extends Object3D {
  constructor () {
    super()
    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true })

    this.mesh = new Mesh(geometry, material)
    this.add(this.mesh)

    this.initGUI()
  }

  initGUI () {
    this.position.range = [-10, 10]
    GUI.panel
      .addSlider(this.position, 'x', 'range')
  }

  update () {
    // this.rotation.x += 0.01
  }
}

export default Cube
