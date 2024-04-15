import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySteam extends CGFobject {
	constructor(scene, r , g, b, size) {
		super(scene); 
		this.steam = new MyCilinder(this.scene, 16, 8, 0.1);	
		this.size = size;
		this.r = r;
        this.g = g;
        this.b = b;
		this.initialMaterials();

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

		this.scene.pushMatrix();
		this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
		this.scene.scale(1,1,this.size);
		
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

