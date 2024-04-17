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
		this.cilinderSize = (this.size /this.numCil);
		this.cilinders = [];
		this.sideSteam = new MyCilinder(this.scene, 16, 8, 0.1);
		this.createCilinders();
		this.initialMaterials();

	}

	createCilinders(){
		this.incl = Math.random()*30-15;
		for(let i=0; i< this.numCil; i++){
			let curCil = new MyCilinder(this.scene, 16, 8, 0.1);
			this.cilinders.push(curCil);
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
		
		for(let i=0; i< this.numCil; i++){
			this.scene.pushMatrix();
			let curCil = this.cilinders[i];
			this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
			this.scene.scale(1,1,this.cilinderSize);
			let dif = this.cilinderSize*i;	
			this.scene.rotate(this.incl*Math.PI/180,0,1,0);
			this.scene.translate(0,0,dif);
			this.steamMaterial.apply();
			curCil.display();
			this.scene.popMatrix();
		
			}
		
		this.scene.pushMatrix();
		this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
		/*
		if(this.incl > 0){
			this.scene.rotate(-30*Math.PI/180,0,1,0);
			this.scene.translate(0,0,this.size/3);
			this.scene.translate(this.size*Math.sin(30*Math.PI/180),0,0);
		
		}
		else{
			this.scene.rotate(30*Math.PI/180,0,1,0);
			this.scene.translate(0,0,this.size/3);
			this.scene.translate(this.size*Math.sin(-30*Math.PI/180),0,0);
		}

		this.sideSteam.display();
		this.scene.popMatrix();
		*/
		}
		


	

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

