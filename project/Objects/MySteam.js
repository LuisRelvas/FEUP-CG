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
		this.deviations = [];
		this.createCilinders();
		this.initialMaterials();

	}

	createCilinders(){
		for(let i=0; i< this.numCil; i++){
			let curCil = new MyCilinder(this.scene, 16, 8, 0.1);
			this.cilinders.push(curCil);
			if (i==0){
				this.deviations.push(0);
			}
			else{
				let angle = Math.random()*2.5;
				this.deviations.push(angle);
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
		for(let i=0; i< this.numCil; i++){
			this.scene.pushMatrix();
			let curCil = this.cilinders[i];
			this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
			this.scene.scale(1,1,this.cilinderSize);
			let dif = this.cilinderSize*(this.numCil-i-1)*1.7;
			this.scene.translate(0,0,dif);
			if(i==0){
			}
			else{
				if(i%2==0){
					let angle = this.deviations[i];
					this.scene.rotate(angle*Math.PI/180,0,1,0);
				}
				else{
					let angle = this.deviations[i];
					this.scene.rotate(-angle*Math.PI/180,0,1,0);	
				}
			}
			this.steamMaterial.apply();
			curCil.display();
			this.scene.popMatrix();

		}
		
		
		
	 

	}

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

