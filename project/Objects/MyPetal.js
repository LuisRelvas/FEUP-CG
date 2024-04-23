import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, petalTriangleRotation) {
		super(scene); 
        this.petalTriangleRotation = petalTriangleRotation;
		this.triangle1 = new MyTriangle(this.scene);	
		this.triangle2 = new MyTriangle(this.scene);	
		this.initialMaterials();

        // Set texture coordinates for each triangle
        this.triangle1.setTexCoords();
        this.triangle2.setTexCoords();

	};

    setAngle(angle){
        this.angle = angle;
    }

    getAngle(){
        return this.angle;
    }

    //Math.random [0,1[*angle
    initialMaterials(){
        this.petalMaterial = new CGFappearance(this.scene);
		this.petalTexture = new CGFtexture(this.scene, "/project/images/petalPink.jpg");
		this.petalMaterial.setTexture(this.petalTexture);
		this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
    };

    display(){
        
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.5, 0.25, 1);
        this.scene.rotate(this.petalTriangleRotation*Math.PI/180, 1,0,0);
        this.petalMaterial.apply();
        this.triangle1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.5, 0.25, 1);
        this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
        this.petalMaterial.apply();
        this.triangle2.display();
        this.scene.popMatrix();

    };

    enableNormalViz(){
        this.triangle1.enableNormalViz();
        this.triangle2.enableNormalViz();
    };

	disableNormalViz(){
		this.triangle1.disableNormalViz();
        this.triangle2.disableNormalViz();
	};

}