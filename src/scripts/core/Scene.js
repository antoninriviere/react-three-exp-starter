import {Scene, PerspectiveCamera, WebGLRenderer, Vector3} from 'three'

import Stats from 'stats-js'

import OrbitControls from 'orbit-controls'

import Wagner from '@superguigui/wagner'

class SceneObj extends Scene {
  constructor (options) {
    super()

    const defaultOptions = {
      camera: {
        fov: 45,
        near: 1,
        far: 1000,
        position: new Vector3(0, 0, 10)
      },
      renderer: {
        antialias: false,
        pixelRatio: window.devicePixelRatio
      },
      debug: {
        stats: false,
        orbitControls: false
      },
      postProcessing: {
        active: false
      }
    }

    this.options = {...defaultOptions, ...options}

    this.container = this.options.container

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new WebGLRenderer(this.width, this.height, this.options.renderer)
    this.renderer.setSize(this.width, this.height)

    this.container.appendChild(this.renderer.domElement)

    this.camera = new PerspectiveCamera(this.options.fov, this.width / this.height, this.options.near, this.options.far)
    this.camera.position.copy(this.options.camera.position)

    if (this.options.postProcessing) {
      this.initPostProcessing()
    }

    if (this.options.debug.stats) {
      this.initStats()
    }

    if (this.options.debug.orbitControls) {
      this.initControls()
    }
  }

  initControls () {
    this.controls = new OrbitControls({
      position: this.camera.position.toArray(),
      parent: this.renderer.domElement
    })
    this.target = new Vector3()
    this.camera.lookAt(this.target)
  }

  initStats () {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.left = '0px'
    this.stats.domElement.style.top = '0px'

    this.container.appendChild(this.stats.domElement)
  }

  initPostProcessing () {
    this.composer = new Wagner.Composer(this.renderer)

    this.passes = []

    this.options.postProcessing.passes.map(pass => {
      if (pass.active) {
        this.passes.push(pass.constructor())
      }
    })
  }

  render () {
    if (this.options.debug.orbitControls) {
      this.controls.update()
      this.camera.position.fromArray(this.controls.position)
      this.camera.up.fromArray(this.controls.up)
      this.camera.lookAt(this.target.fromArray(this.controls.direction))
    }

    if (this.options.postProcessing.active) {
      this.composer.reset()
      this.composer.render(this, this.camera)

      for (let i = 0; i < this.passes.length; i++) {
        this.composer.pass(this.passes[i])
      }

      this.composer.toScreen()
    } else {
      this.renderer.render(this, this.camera)
    }

    if (this.options.debug.stats) {
      this.stats.update()
    }
  }

  resize (newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)

    if (this.composer) {
      this.composer.setSize(newWidth, newHeight)
    }
  }
}

export default SceneObj