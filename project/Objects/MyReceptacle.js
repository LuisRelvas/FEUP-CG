import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
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
		this.receptacle = new MyCone(this.scene, 32, 16, 0.5, 0.15);	
		this.r = r;
        this.g = g;
        this.b = b;
		this.size = size;
		this.totalSize = totalSize; 
		this.textures = ["/project/images/receptacle_flower_1.jpg", "/project/images/receptacle_flower_2.jpg", "/project/images/receptacle_flower_3.jpg"];
		this.initialMaterials();

	}

	initialMaterials() 
	{

		this.receptacleMaterial = new CGFappearance(this.scene);
		this.receptacleTexture = new CGFtexture(this.scene, this.textures[Math.round(Math.random() * 3)]);
		this.receptacleMaterial.setTexture(this.receptacleTexture);
		this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');

	
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

