import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from '../tp4/MyDiamond.js';
import { MyTriangle } from '../tp4/MyTriangle.js';
import { MyTriangleBig } from '../tp4/MyTriangleBig.js';
import { MyTriangleSmall } from '../tp4/MyTriangleSmall.js';
import { MyParallelogram } from '../tp4/MyParallelogram.js';
import { MyTriangleBig2 } from '../tp4/MyTriangleBig2.js';
import { MyTriangleSmall2 } from '../tp4/MyTriangleSmall2.js';

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
		this.triangleBig2 = new MyTriangleBig2(this.scene);
		this.triangleSmall = new MyTriangleSmall(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.triangleSmall2 = new MyTriangleSmall2(this.scene);
		this.initialMaterials();

	}

	initialMaterials() 
	{

		//------ New Material for MyDiamond 
		this.diamondNewMaterial = new CGFappearance(this.scene);
		this.diamondNewMaterial.setAmbient(0.5, 0.3, 0.3, 1);
		this.diamondNewMaterial.setDiffuse(0.5, 0.3, 0.3, 1);
		this.diamondNewMaterial.setSpecular(0.5, 0.3, 0.3, 1);
		this.diamondNewMaterial.setShininess(10.0);
		this.diamondNewMaterial.loadTexture('images/tangram.png');


		// Triangle Pink
		this.triangleMaterial = new CGFappearance(this.scene);
		this.triangleMaterial.setAmbient(1, 0.75, 0.8, 0);
		this.triangleMaterial.setDiffuse(1.0, 0.75, 0.8, 0);
		this.triangleMaterial.setSpecular(0.9, 0.9, 0.9, 1);
		this.triangleMaterial.setShininess(10.0);

		//Small Triangle Red 
		this.triangleSmallMaterial = new CGFappearance(this.scene);
		this.triangleSmallMaterial.setAmbient(1, 0, 0, 0);
		this.triangleSmallMaterial.setDiffuse(1.0, 0.0, 0.0, 0);
		this.triangleSmallMaterial.setSpecular(0.9, 0.9, 0.9, 1);
		this.triangleSmallMaterial.setShininess(10.0);

		//Small Triangle Purple 
		this.triangleSmallMaterial2 = new CGFappearance(this.scene);
		this.triangleSmallMaterial2.setAmbient(0.627, 0.125, 0.94, 0);
		this.triangleSmallMaterial2.setDiffuse(0.627, 0.125, 0.94, 0);
		this.triangleSmallMaterial2.setSpecular(0.9, 0.9, 0.9, 1);
		this.triangleSmallMaterial2.setShininess(10.0);

		//Diamond Green
		this.diamondMaterial = new CGFappearance(this.scene);
		this.diamondMaterial.setAmbient(0, 1, 0, 0);
		this.diamondMaterial.setDiffuse(0.0, 1.0, 0.0, 0);
		this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1);
		this.diamondMaterial.setShininess(10.0);

		//Parallelogram Yellow
		this.parallelogramMaterial = new CGFappearance(this.scene);
		this.parallelogramMaterial.setAmbient(1, 1.0, 0, 0);
		this.parallelogramMaterial.setDiffuse(1.0, 1.0, 0.0, 0);
		this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1);
		this.parallelogramMaterial.setShininess(10.0);

		//Big Triangle Orange
		this.triangleBigMaterial = new CGFappearance(this.scene);
		this.triangleBigMaterial.setAmbient(1, 0.5, 0, 0);
		this.triangleBigMaterial.setDiffuse(1.0, 0.5, 0.0, 0);
		this.triangleBigMaterial.setSpecular(0.9, 0.9, 0.9, 1);
		this.triangleBigMaterial.setShininess(10.0);

		// Big Triangle Blue

		this.triangleBigMaterial2 = new CGFappearance(this.scene);
		this.triangleBigMaterial2.setAmbient(0, 0, 1.0, 0);
		this.triangleBigMaterial2.setDiffuse(0.0, 0.0, 1.0, 0);
		this.triangleBigMaterial2.setSpecular(0.9, 0.9, 0.9, 1);
		this.triangleBigMaterial2.setShininess(10.0);

	};

	display() {

	this.scene.pushMatrix();
	let matrixTranslation = 
	[1, 0, 0, 0,
	 0, 1, 0, 0,
	 0, 0, 1, 0,
	 -1.3, -2.3, 0, 1];

	 this.scene.multMatrix(matrixTranslation);

	 this.diamondNewMaterial.apply();
	 
	 this.diamond.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix(); 
 
	 this.scene.translate(1, -1, 0);
 
	 this.scene.rotate(270 * Math.PI / 180, 0, 0, 1);
 
	 this.diamondNewMaterial.apply();

	 this.triangle.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix();
 
	 this.scene.translate(0.6, -1.4, 0);
 
	 this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);
		
	 this.diamondNewMaterial.apply();
 
	 this.triangleBig2.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix();
 
	 this.scene.translate(-0.8, -4.2, 0);
 
	 this.scene.scale(-1, 1, 1)
 
	 this.scene.rotate(135 * Math.PI / 180, 0, 0, 1)
 
	 this.diamondNewMaterial.apply();
	 
	 this.parallelogram.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix();
 
	 this.scene.translate(0.6, 1.4, 0);
 
	 this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
 
	 this.diamondNewMaterial.apply();	
	 
	 this.triangleBig.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix();
 
	 this.scene.translate(0.9, -3.9, 0);
 
	 this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);
 
	 this.diamondNewMaterial.apply();
	 
	 this.triangleSmall2.display();
 
	 this.scene.popMatrix();
 
	 this.scene.pushMatrix(); 
 
	 this.scene.translate(-0.8, 2.8, 0);
 
	 this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);
	
	 this.diamondNewMaterial.apply();
	 
	 this.triangleSmall.display();
 
	 this.scene.popMatrix();


	}

	enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig.enableNormalViz()
        this.triangleSmall.enableNormalViz()
        this.parallelogram.enableNormalViz()
    };

	disableNormalViz(){
		this.diamond.disableNormalViz()
		this.triangle.disableNormalViz()
		this.triangleBig.disableNormalViz()
		this.triangleSmall.disableNormalViz()
		this.parallelogram.disableNormalViz()
	};
}

