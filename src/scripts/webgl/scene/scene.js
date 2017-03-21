import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial, Vector3 } from 'three'

import Stats from 'stats-js'

import OrbitControls from 'orbit-controls'

import Wagner from '@superguigui/wagner'
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass'
import GlitchPass from '@superguigui/wagner/src/passes/glitch/GlitchPass'

class SceneObj {

  constructor (canvas) {
    this.canvas = canvas

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.options = {
      usePostProcessing: true
    }

    this.renderer = new WebGLRenderer(this.width, this.height, {canvas: this.canvas, antialias: true })
    this.camera = new PerspectiveCamera(45, this.width / this.height, 1, 2000)
    this.scene = new Scene()

    const geometry = new BoxGeometry(200, 200, 200)
    const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

    const mesh = new Mesh(geometry, material)
    this.scene.add(mesh)

    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xFFFFFF, 1)
    this.canvas.appendChild(this.renderer.domElement)

    this.camera.position.z = 1000

    this.initControls()
    this.initPostProcessing()
    this.initStats()
  }

  initControls () {
    this.controls = new OrbitControls({
      position: this.camera.position.toArray()
    })
    this.target = new Vector3()
    this.camera.lookAt(this.target)
  }

  initStats () {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.left = '0px'
    this.stats.domElement.style.top = '0px'

    document.body.appendChild(this.stats.domElement)
  }

  initPostProcessing () {
    this.composer = new Wagner.Composer(this.renderer)

    this.vignettePass = new VignettePass({
      boost: 1.0,
      reduction: 1.5
    })
    this.glitchPass = new GlitchPass({})
  }

  add (child) {
    this.scene.add(child)
  }

  remove (child) {
    this.scene.remove(child)
  }

  render () {
    this.controls.update()
    this.camera.position.fromArray(this.controls.position)
    this.camera.up.fromArray(this.controls.up)
    this.camera.lookAt(this.target.fromArray(this.controls.direction))

    // this.renderer.render(this.scene, this.camera)
    this.composer.reset()
    this.composer.render(this.scene, this.camera)
    if (this.options.usePostProcessing === true) {
      this.composer.pass(this.vignettePass)
      //this.composer.pass(this.glitchPass)
    }
    this.composer.toScreen()
    this.stats.update()
  }

  resize (newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)
    this.composer.setSize(newWidth, newHeight)
  }

}

export default SceneObj
