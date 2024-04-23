import {CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySteam extends CGFobject {
	constructor(scene, r , g, b, size, cilinderSizesArray) {
		super(scene); 	
		this.size = size;
		this.r = r;
        this.g = g;
        this.b = b;
		this.cilinderSizesArray = cilinderSizesArray;
		this.cilinderSize = (this.size / this.cilinderSizesArray.length);
		this.cilinders = [];
		this.cilindersInclination = [];
		this.radius = 0.1; 
		this.sideSteam = new MyCilinder(this.scene, 16, 8, 0.1);
		this.petal = new MyTriangle(this.scene);
		this.petal2 = new MyTriangle(this.scene);
		this.textures = ["/project/images/texture_stem_2.jpg", "/project/images/texture_stem_3.jpg", "/project/images/texture_stem_4.jpg"];
		this.createCilinders();
		this.initialMaterials();
		this.petal.setTexCoords();
        this.petal2.setTexCoords();

	}

	createCilinders(){
		let numCil = this.cilinderSizesArray.length;
		for(let i=0; i< numCil; i++){
			let incl = Math.random()*10;
			let curCil = new MyCilinder(this.scene, 16, 8, this.radius);
			this.cilinders.push(curCil);
			if(i == 0) 
			{
				this.cilindersInclination.push(0);
			}
			else 
			{
				this.cilindersInclination.push(incl);
				console.log("The value of the angle is " + incl)
			}
		}
		console.log("the total length of the array is: " + this.cilindersInclination.length);
	}

	initialMaterials() 
	{
		this.steamMaterial = new CGFappearance(this.scene);
		this.steamTexture = new CGFtexture(this.scene, this.textures[Math.round(Math.random() * 2)]);
		this.steamMaterial.setTexture(this.steamTexture);
		this.steamMaterial.setTextureWrap('REPEAT', 'REPEAT');
		this.leavesMaterial = new CGFappearance(this.scene);
		this.leavesTexture = new CGFtexture(this.scene, "/project/images/leaves_1.jpg");
		this.leavesMaterial.setTexture(this.leavesTexture);
		this.leavesMaterial.setTextureWrap('REPEAT', 'REPEAT');
	};

	

	display() {
		let lastPosX = 0;
		let lastPosY = 0;
		let lastPosZ = 0;
		let numCil = this.cilinderSizesArray.length;
	
		for(let i = 0; i < numCil; i++) {
			this.scene.pushMatrix();
	
			let curCil = this.cilinders[i];
	
			this.scene.pushMatrix();
	
			this.scene.translate(lastPosX, lastPosY, lastPosZ);
	
			this.scene.rotate(this.cilindersInclination[i] * Math.PI/180, 0, 1, 0);
	
			this.scene.scale(1, 1, this.cilinderSizesArray[i] * 1.025);

			this.steamMaterial.apply();
	
			curCil.display();
	
			this.scene.popMatrix();
	
			lastPosZ += this.cilinderSizesArray[i] * Math.cos(this.cilindersInclination[i] * Math.PI/180);
			lastPosX += this.cilinderSizesArray[i] * Math.sin(this.cilindersInclination[i] * Math.PI/180);

			if(this.cilindersInclination[i] != 0 && i != numCil - 1) 
			{
				//create a cilinder with a petal
				this.scene.pushMatrix();
				this.scene.translate(lastPosX, lastPosY, lastPosZ);
				this.scene.rotate(-45 * Math.PI/180, 0, 1, 0);
				this.scene.scale(1, 1, 1);
				this.steamTexture.bind();
				this.sideSteam.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
				this.scene.translate(lastPosX,lastPosY,lastPosZ);
				this.scene.translate(-1,0,1);
				this.scene.rotate(-45 * Math.PI / 180, 0, 1, 0);
				this.scene.rotate(-90 * Math.PI / 180, 1, 0 ,0);
				this.scene.rotate(90 * Math.PI / 180 , 0, 1, 0);
				this.scene.scale(0.5,0.5,0.1);
				this.leavesMaterial.apply();
				this.leavesTexture.bind();
				this.petal.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
				this.scene.translate(lastPosX, lastPosY,lastPosZ);
				this.scene.translate(-1,0,1);
				this.scene.rotate(-45 * Math.PI / 180, 0, 1, 0); 
				this.scene.rotate(90 * Math.PI / 180, 1,0,0);
				this.scene.rotate(90 * Math.PI / 180 , 0, 1, 0);
				this.scene.rotate(-10 * Math.PI / 180 , 1, 0, 0); 
				this.scene.scale(0.5,0.5,0.1);
				this.leavesMaterial.apply();
				this.leavesTexture.bind();
				this.petal2.display();
				this.scene.popMatrix();
			}
		}
	
		console.log("The value of the lastPosZ is: " + lastPosZ);
	
		this.scene.popMatrix();
	
		return [lastPosX, lastPosZ, this.cilindersInclination[this.cilindersInclination.length - 1]];
	}
	
	



	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

