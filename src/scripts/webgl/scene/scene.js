import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

class SceneObj {

  constructor (canvas) {
    this.canvas = canvas;

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new WebGLRenderer(this.width, this.height, {canvas: this.canvas, antialias: true })
    this.camera = new PerspectiveCamera(45, this.width / this.height, 1, 2000)
    this.scene = new Scene()

    const geometry = new BoxGeometry(200, 200, 200)
    const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })

    const mesh = new Mesh(geometry, material)
    this.scene.add(mesh)

    this.renderer.setSize(this.width, this.height)
    this.canvas.appendChild( this.renderer.domElement );

    console.log(this.renderer)

    this.camera.position.z = 1000
  }

  add (child) {
    this.scene.add(child)
  }

  remove (child) {
    this.scene.remove(child)
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  resize (newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)
  }

}

export default SceneObj
