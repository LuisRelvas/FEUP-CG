import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySteam extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.steam = new MyCilinder(this.scene, 16, 8, 0.1);	
		
		this.initialMaterials();

	}

	initialMaterials() 
	{

		this.steamMaterial = new CGFappearance(this.scene);
		this.steamMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.steamMaterial.setDiffuse(0, 1, 0, 1);
		this.steamMaterial.setSpecular(0, 1, 0, 1);
		this.steamMaterial.setShininess(10.0);
	

		

	};

	display() {

		this.scene.pushMatrix();
		this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
		this.scene.scale(1,1,3);
		
		this.steamMaterial.apply();
		this.steam.display();
		this.scene.popMatrix();
	 

	}

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

