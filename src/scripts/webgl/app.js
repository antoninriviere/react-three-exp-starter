import { TweenMax } from 'gsap'

import SceneObj from './core/scene'

import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

class App {
  constructor (container) {
    this.scene = new SceneObj({
      container: container
    })

    this.DELTA_TIME = 0
    this.LAST_TIME = Date.now()

    this.initMeshes()
    this.addListeners()
  }

  addListeners () {
    window.addEventListener('resize', this.onResize.bind(this))
    TweenMax.ticker.addEventListener('tick', this.update.bind(this))
  }

  initMeshes () {
    const geometry = new BoxGeometry(20, 20, 20)
    const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })

    this.mesh = new Mesh(geometry, material)
    this.scene.add(this.mesh)
  }

  update () {
    this.DELTA_TIME = Date.now() - this.LAST_TIME
    this.LAST_TIME = Date.now()

    this.scene.render()
  }

  onResize (evt) {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.scene.resize(this.width, this.height)
  }
}

export default App
