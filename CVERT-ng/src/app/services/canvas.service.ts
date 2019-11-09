import { Injectable, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  drawScene() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, this.canvas.width / this.canvas.height, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    renderer.setSize( this.canvas.width, this.canvas.height );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
    	requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
    	renderer.render( scene, camera );
    }
    animate();

    this.scene = scene;
    this.renderer = renderer;
  }

  resize() {
    if (typeof this.renderer !== "undefined") {
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }
  }

  clear() {
    this.scene.dispose();
    this.scene = null;
  }

  ngOnDestroy() {
    this.clear();
  }

}
