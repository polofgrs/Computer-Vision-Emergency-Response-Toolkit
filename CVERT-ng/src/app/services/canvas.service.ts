import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService implements OnDestroy {

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private grid: THREE.GridHelper;
  private ground: THREE.Mesh;
  private helper: THREE.Mesh;

  private frameId: number = null;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);

    // create the scene
    this.scene = new THREE.Scene();

    // create the camera
    this.camera = new THREE.PerspectiveCamera(
      70, this.canvas.width /this.canvas.height, 0.1, 500
    );
    this.camera.position.y = 23.9; // set(0, 10, 0);
    this.camera.rotation.x = -22 * Math.PI / 180; // pitch angle (randians)
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.z = 10;
    this.scene.add(this.light);

    // ground plane (transparent, just for the intersection)
    var geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
    var material = new THREE.MeshBasicMaterial({
      opacity: 0,
      transparent: true,
      depthWrite: false });
    this.ground = new THREE.Mesh( geometry, material );
		this.ground.rotation.x = - Math.PI / 2;
		this.scene.add( this.ground );

    // position helper
    var coneGeometry = new THREE.ConeBufferGeometry(1, 1, 8);
		coneGeometry.rotateX( Math.PI / 2 );
		this.helper = new THREE.Mesh( coneGeometry, new THREE.MeshNormalMaterial() );
    this.helper.rotation.x = - Math.PI / 2;
		this.scene.add(this.helper);

    this.canvas.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

    // grid helper
    this.grid = new THREE.GridHelper( 1000, 100, 0x000000, 0x888888 );
    this.scene.add( this.grid );
  }

  onMouseMove( event ) {
    this.mouse.x = ( (event.offsetX) / this.renderer.domElement.width ) * 2 - 1;
		this.mouse.y = - ( (event.offsetY) / this.renderer.domElement.height ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
		// See if the ray from the camera into the world hits the ground
		var intersects = this.raycaster.intersectObject( this.ground );
		// Toggle rotation bool for meshes that we clicked
		if ( intersects.length > 0 ) {
			// this.helper.position.set( 0, 0, 0);
			this.helper.position.copy( intersects[ 0 ].point );
		}
  }

  animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  render() {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  isInit() {
    return(typeof this.renderer !== "undefined");
  }
}
