import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			-0.5, 0.5, -0.5,	//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3

            -0.5, -0.5, 0.5,	//4
			-0.5, 0.5, 0.5,	    //5
			0.5, -0.5, 0.5,	    //6
			0.5, 0.5, 0.5		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //faces para quem olha para y,z (x é um ponto)
			7, 5 ,6,
            6, 5, 4, //face frontal
            3, 5, 7,
            1, 5, 3,  //face superior
            5, 1, 0,
            5, 0, 4,  //face esquerda
            2, 3, 6,
            3, 7, 6, //face direita
            0, 1, 2,
            3, 2, 1, //face  de trás
            0, 2, 6,
            4, 0, 6  //face de baixo

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
        
	}
    
}

