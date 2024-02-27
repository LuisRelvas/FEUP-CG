import {CGFobject} from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';
export class MyBase extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.unitCube = new MyUnitCube(this.scene);	
	}

    display(){
        this.scene.pushMatrix();
	    
        this.scene.setDiffuse(0.0, 1.0, 1.0, 1.0);
        this.scene.scale(9,9,9);
        this.scene.translate(0,-0.051,-0.51);
        this.unitCube.display();
        
    }
}   