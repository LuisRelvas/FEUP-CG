import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.setTexCoords();
		this.randomScaleY = 1;
		this.randomScaleX = 1;  
		this.randomRotation = 0;
		this.randomTranslation = 0;
		this.triangleNumber = 0;
	}
	
	initBuffers() {
		this.vertices = [
			-1,0,0, 
            0,1,0,
            1,0,0,
			-1,0,0, 
            0,1,0,
            1,0,0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            2,1,0,
			0,1,2
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	setTexCoords() {
		this.texCoords = [
			0, 0,
			1, 0,
			0.5, 1
		];
		this.updateTexCoordsGLBuffers();
	}
}

