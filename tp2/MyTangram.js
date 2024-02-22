import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyParallelogram } from './MyParallelogram.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.diamond = new MyDiamond(this.scene);	
		this.triangle = new MyTriangle(this.scene);
		this.triangleBig = new MyTriangleBig(this.scene);
		this.triangleSmall = new MyTriangleSmall(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);

	}

	display() {

	this.scene.pushMatrix();
	let matrixTranslation = 
	[1, 0, 0, 0,
	 0, 1, 0, 0,
	 0, 0, 1, 0,
	 -1.3, -2.3, 0, 1];

	this.scene.multMatrix(matrixTranslation);

	this.scene.setDiffuse(0.0, 1.0, 0.0, 1.0);

	this.diamond.display();

	this.scene.popMatrix();

	this.scene.pushMatrix(); 

	this.scene.translate(1, -1, 0);

	this.scene.rotate(270 * Math.PI / 180, 0, 0, 1);

	this.scene.setDiffuse(1.0, 0.75, 0.8, 1.0);

	this.triangle.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();

	this.scene.translate(0.6, -1.4, 0);

	this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);

	this.scene.setDiffuse(0.0, 0.0, 1.0, 1.0);

	this.triangleBig.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();

	this.scene.translate(-0.8, -4.2, 0);

	this.scene.scale(-1, 1, 1)

	this.scene.rotate(135 * Math.PI / 180, 0, 0, 1)

	this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);

	this.parallelogram.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();

	this.scene.translate(0.6, 1.4, 0);

	this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);

	this.scene.setDiffuse(1.0, 0.5, 0.0, 1.0);

	this.triangleBig.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();

	this.scene.translate(0.9, -3.9, 0);

	this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);

	this.scene.setDiffuse(0.5, 0.0, 0.5, 1.0);

	this.triangleSmall.display();

	this.scene.popMatrix();

	this.scene.pushMatrix(); 

	this.scene.translate(-0.8, 2.8, 0);

	this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);

	
	this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);


	this.triangleSmall.display();

	this.scene.popMatrix();


	}
}

