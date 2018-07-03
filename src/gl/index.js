
import * as THREE from 'three'
import { deepDispose } from '@/utils/deep-dispose'
import Animation from '@/gl/Animation'

export default class GL {
  constructor (canvas, container) {
    this.canvas = canvas
    this.container = container

    const width = canvas.width
    const height = canvas.height

    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(35, width / height, 1, 20000)
    this.camera.position.set(0, -300, 65)
    this.camera.lookAt(this.scene.position)
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      stencil: false,
      alpha: !true
    })
    this.renderer.setClearColor(0x303030, 1)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.animation = new Animation()
    this.scene.add(this.animation.mesh)
    this.running = true
    this.tick()
    this.handleResize()
  }

  destroy () {
    this.running = false
    while (this.scene.children.length > 0) {
      const object = this.scene.children[this.scene.children.length - 1]
      deepDispose(object)
      this.scene.remove(object)
    }
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = undefined
    this.renderer.domElement = undefined
    // until next garbage collection
    this.canvas.width = 1
    this.canvas.height = 1
  }

  tick () {
    if (!this.running) return
    requestAnimationFrame(() => this.tick())
    var time = performance.now()
    this.animation.update(time * 0.007)
    this.renderer.render(this.scene, this.camera)
  }

  handleResize () {
    const width = this.container.getBoundingClientRect().width
    const height = this.container.getBoundingClientRect().height  
    this.canvas.width = width
    this.canvas.height = height
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }
}