import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, r, g, b, size ) {
		super(scene); 
		this.receptacle = new MySphere(this.scene, 32, 16, false, 2);	
		this.r = r;
        this.g = g;
        this.b = b;
		this.size = size;
		
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

	display() {

	this.scene.pushMatrix();
	this.scene.scale(this.size, this.size, this.size);
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

