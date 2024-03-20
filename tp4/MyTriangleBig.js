import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-2,0,0, 
            0,2,0,
            2,0,0,

		];

		//Counter-clockwise reference of vertices
		this.indices = [
            2,1,0,
		];

		this.texCoords = 
		[
			1,0,
			0.5,0.5,
			1,1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

