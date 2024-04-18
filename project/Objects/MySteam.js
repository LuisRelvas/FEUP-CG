import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';


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
		this.createCilinders();
		this.initialMaterials();

	}

	createCilinders(){
		let numCil = this.cilinderSizesArray.length;
		for(let i=0; i< numCil; i++){
			let incl = Math.random()*15;
			let curCil = new MyCilinder(this.scene, 16, 8, 0.1);
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
		this.steamMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.steamMaterial.setDiffuse(this.r, this.g, this.b, 1);
		this.steamMaterial.setSpecular(this.r, this.g, this.b, 1);
		this.steamMaterial.setShininess(10.0);
	};

	

	display() {
		let lastPosX = 0; 
		let lastPosY = 0;
		let lastPosZ = 0;
		let numCil = this.cilinderSizesArray.length;
		let cilinderSize = this.size / numCil;
		for(let i=0; i< numCil; i++){
			this.scene.pushMatrix();
			let curCil = this.cilinders[i];
			this.steamMaterial.apply();
			this.scene.pushMatrix();
			this.scene.translate(lastPosX,0,lastPosZ);
			this.scene.pushMatrix();
			this.scene.scale(1,1,this.cilinderSizesArray[i]);
			this.scene.pushMatrix();
			this.scene.rotate(this.cilindersInclination[i]*Math.PI/180, 0,1,0);
			curCil.display();
			this.scene.popMatrix();
			this.scene.popMatrix();
			this.scene.popMatrix();
			if(i == 0) 
			{
				lastPosX = lastPosX;
				lastPosZ = lastPosZ + this.cilinderSizesArray[i] - this.radius;
			}
			else {
			lastPosZ = lastPosZ + this.cilinderSizesArray[i] - (4*this.radius) * Math.sin(this.cilindersInclination[i]*Math.PI/180);
            lastPosX = lastPosX + Math.sin(this.cilindersInclination[i]*Math.PI/180) ;
			}
		}
		this.scene.popMatrix();

		console.log("The value of the lastPosZ is: " + lastPosZ);
		
		return [lastPosX,lastPosZ,this.cilindersInclination[this.cilindersInclination.length-1]]; 
		
		}	

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

