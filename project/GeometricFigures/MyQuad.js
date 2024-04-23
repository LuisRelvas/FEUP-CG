import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0, -0.5, //0
			0.5, 0, -0.5, //1
			-0.5, 0, 0.5, //2
			0.5, 0, 0.5, //3
	
			// Duplicate vertices for the other side
			-0.5, 0, -0.5, //4
			0.5, 0, -0.5, //5
			-0.5, 0, 0.5, //6
			0.5, 0, 0.5 //7
		];
	
		//Counter-clockwise reference of vertices
		this.indices = [
			1, 0, 2,
			3, 1, 2,
	
			// Indices for the other side
			4, 5, 7,
			4, 7, 6
		];
	
		//Facing Z positive
		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
	
			// Normals for the other side
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		];
	
		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0,
	
			// Texture coordinates for the other side
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
