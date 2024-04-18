import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySteam extends CGFobject {
	constructor(scene, r , g, b, size, numCil) {
		super(scene); 	
		this.size = size;
		this.r = r;
        this.g = g;
        this.b = b;
		this.numCil = numCil;
		this.cilinderSize = (this.size / this.numCil);
		this.cilinders = [];
		this.cilindersInclination = [];
		this.sideSteam = new MyCilinder(this.scene, 16, 8, 0.1);
		this.createCilinders();
		this.initialMaterials();

	}

	createCilinders(){
		for(let i=0; i< this.numCil; i++){
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
			}
		}
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
		let cilinderSize = this.size / this.numCil;
		for(let i=0; i< this.numCil; i++){
			this.scene.pushMatrix();
			let curCil = this.cilinders[i];
			this.steamMaterial.apply();
			this.scene.pushMatrix();
			this.scene.translate(lastPosX,0,lastPosZ);
			this.scene.scale(1,1,cilinderSize);
			this.scene.pushMatrix();
			this.scene.rotate(this.cilindersInclination[i]*Math.PI/180, 0,1,0);
			curCil.display();
			this.scene.popMatrix();
			this.scene.popMatrix();
			this.scene.popMatrix();
			// lastPosX = lastPosX + Math.cos(this.cilindersInclination[i+1]*Math.PI/180);
			let offset = cilinderSize * 0.05; 

			lastPosZ = lastPosZ + cilinderSize - offset;
            lastPosX = lastPosX + Math.sin(this.cilindersInclination[i]*Math.PI/180) ;
		}
		console.log("The value of the lastPosZ is: " + lastPosZ);
		
		
		
		}	

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

