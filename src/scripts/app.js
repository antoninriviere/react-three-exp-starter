import styles from '../styles/app.styl'


import { TweenMax } from "gsap"

import SceneObj from './scene/scene'

class App {

    constructor() {

        this.scene = new SceneObj()

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.addListeners()
    }

    addListeners() {

        window.addEventListener( 'resize', this.onResize.bind(this) )
        TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) )
    }

    update() {

        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()

        this.scene.render()
    }

    onResize( evt ) {

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.scene.resize( this.width, this.height )
    }

}

export default App