import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';
import { MyCone } from '../GeometricFigures/MyCone.js'; 


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, r, g, b, size, totalSize ) {
		super(scene); 
		this.receptacle = new MyCone(this.scene, 32, 16, 0.5, 0.1);	
		this.r = r;
        this.g = g;
        this.b = b;
		this.size = size;
		this.totalSize = totalSize; 
		this.initialMaterials();

	}

	initialMaterials() 
	{

		this.receptacleMaterial = new CGFappearance(this.scene);
		this.receptacleMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.receptacleMaterial.setDiffuse(this.r, this.g, this.b, 1);
		this.receptacleMaterial.setSpecular(this.r, this.g, this.b, 1);
		this.receptacleMaterial.setShininess(10.0);

	
	};

	display(finalPos) {

	this.scene.pushMatrix();
	this.scene.scale(1, 1, 1);
	this.receptacleMaterial.apply();
    this.receptacle.display();
    this.scene.popMatrix();
	}

	enableNormalViz(){
        this.steam.enableNormalViz()
    };

	disableNormalViz(){
		this.steam.disableNormalViz()
	};
}

