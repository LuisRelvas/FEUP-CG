import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.quad1 = new MyQuad(this.scene); //face de cima
        this.quad2 = new MyQuad(this.scene); //face de baixo
        this.quad3 = new MyQuad(this.scene); //face da esq
        this.quad4 = new MyQuad(this.scene); //face da frente
        this.quad5 = new MyQuad(this.scene); //face de tras
        this.quad6 = new MyQuad(this.scene); //face da dir   
    }

    display(){
        this.scene.pushMatrix();
	    
        this.scene.scale(9,9,9);
        this.scene.translate(0,0.46 ,-0.51);
        this.quad1.display();
        this.scene.popMatrix();
	    this.scene.pushMatrix();
        this.scene.scale(9,9,9);
        this.scene.translate(0,-0.54,-0.51);
        this.scene.rotate(Math.PI,0,0,1);
        this.quad2.display();
        this.scene.popMatrix();
	    this.scene.pushMatrix();
        this.scene.scale(9,9,9);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.translate(-0.04,0.5,-0.51);
        this.quad3.display();
        this.scene.popMatrix();
	    this.scene.pushMatrix();
        this.scene.scale(9,9,9);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,-0.01,0.04);
        this.quad4.display();
        this.scene.popMatrix();
	    this.scene.pushMatrix();
        this.scene.scale(9,9,9);
        this.scene.rotate(Math.PI/2,-1,0,0);
        this.scene.translate(0,1.01,-0.04);
        this.quad5.display();
        this.scene.popMatrix();
	    this.scene.pushMatrix();
        this.scene.scale(9,9,9);
        this.scene.rotate(Math.PI/2,0,0,-1);
        this.scene.translate(0.04,0.5,-0.51);
        this.quad6.display();
    }   
}   