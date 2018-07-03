import * as THREE from 'three'

const noise = `
// 2D Random
float random (in vec2 st) { 
  return fract(sin(dot(st.xy, vec2(6.,15.))) + sin(dot(st.xy, vec2(2.8765,23.23))));
}
// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f)
    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}
`

const vs = `
  precision highp float;
  uniform float time;
  uniform float sineTime;
  attribute vec4 color;
  varying vec3 vPosition;
  // varying vec2 vUv;
  ${noise}
  void main(){
    float  PI2 = 6.28;
    // vUv = uv;
    vec3 offset = vec3(0.0, 0.0, 0.0);
    offset.z += noise(position.xy*vec2(.01)+vec2(0.0,time*.2))* 100.0;
    offset.z = min(offset.z, cos(uv.x*PI2*.2)*250.0);
    offset.z -= 50.0;
    vPosition = offset + position;
    if ( vPosition.z < -1.0 ){
      vPosition.z = -1.0;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(  vPosition, 1.0 );
  }
`

const fs = `
  precision highp float;
  
  uniform float time;
  varying vec3 vPosition;
  // varying vec2 vUv;
  void main() {
    float  PI2 = 6.28;
    float v = 7.0; 
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    if ( vPosition.z < 0.0 ) {  // water level
      color = vec4(0.1, 0.1, 0.1, 0.2);
    } else if (mod(vPosition.z, v) < v/7.0 ) {
      color = vec4(0.11, 0.56, 0.65, 1.0) * v/7.0;
    } else {
      color = vec4(0.11, 0.56, 0.65, 0.5);
    }
    color.a = min(color.a, clamp(0.0, 1.0, 4.0*cos( min(1.0, length(vPosition.xy)/1000.0) * 3.14)));
    gl_FragColor = color;
  }
`

export default class Animation {
  constructor () {
    let geometryBase = new THREE.PlaneGeometry(500, 500, 100, 100)
    let geometry = new THREE.BufferGeometry().fromGeometry(geometryBase)
    let length = geometry.attributes.position.count
    let barycentric = new THREE.BufferAttribute(new Float32Array(length * 3), 3)
    for (let i = 0, i3 = 0; i < length; i++, i3 += 3) {
      barycentric.setX(i3 + 0, 1)
      barycentric.setY(i3 + 0, 0)
      barycentric.setZ(i3 + 0, 0)

      barycentric.setX(i3 + 1, 0)
      barycentric.setY(i3 + 1, 1)
      barycentric.setZ(i3 + 1, 0)

      barycentric.setX(i3 + 2, 0)
      barycentric.setY(i3 + 2, 0)
      barycentric.setZ(i3 + 2, 1)
    }
    geometry.addAttribute('aBarycentric', barycentric)

    // material
    let material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 }
        // mouse: { value: this.mouse },
      },
      vertexShader: vs,
      fragmentShader: fs,
      extensions: {
        derivatives: true
      },
      wireframe: true,
      transparent: true
    })
    this.mesh = new THREE.Mesh(geometry, material)
  }

  update (time) {
    this.mesh.material.uniforms.time.value = time
  }
}
