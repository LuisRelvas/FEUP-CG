import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySteam } from './MySteam.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyPetal } from './MyPetal.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.petals= [];
		this.createReceptacle();
		this.createPetals();
		this.createSteam();
		//angulo da petala tem de estar na petala e ter um getter para nao dar mierda
		

	}

	createPetals(){
		this.numbPetals = Math.trunc(Math.random()*10)+6;
		let random2 = Math.random();
		let random3 = Math.random();
		let next = Math.random()*360+15;
		for (let i = 0; i < this.numbPetals; i++){
			let random = Math.random();
			let curPetal = new MyPetal(this.scene, random*30, random, random2, random3);
			curPetal.setAngle(next);
			this.petals.push(curPetal);
			next += next;
		}
	}

	createReceptacle(){
		let randomR = Math.random();
		let randomG = Math.random();
		let randomB = Math.random();
		let size = Math.random()*0.3+0.01;
		this.radius = size;
		this.receptacle = new MyReceptacle(this.scene, randomR, randomG, randomB, size);

	}

	createSteam(){
		
		let size = Math.random()+2;
		let randomR = Math.random()*99;
		let randomG = Math.random();
		let randomB = 0;
		this.steam = new MySteam(this.scene, randomR/255, randomG, randomB, size);	
	}

	display() {
		
		this.scene.pushMatrix();
		this.receptacle.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
		this.steam.display();
		this.scene.popMatrix();

		
		for(let j=0; j< this.numbPetals; j++){
			this.scene.pushMatrix();
			let curPetal = this.petals[j] 
			let angle = curPetal.getAngle();
			this.scene.rotate(angle*Math.PI/180,0,0,1);
			this.scene.translate(0,0.5+this.radius,0);
		
			curPetal.display();
			this.scene.popMatrix();
		}	
		
		/*
		this.scene.pushMatrix();
		this.scene.rotate(90*Math.PI/180,0,0,1);
		this.scene.translate(0,0.61,0);
		this.petal1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-90*Math.PI/180,0,0,1);
		this.scene.translate(0,0.61,0);
		this.petal2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(45*Math.PI/180,0,0,1);
		this.scene.translate(0,0.61,0);
		this.petal3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-45*Math.PI/180,0,0,1);
		this.scene.translate(0,0.61,0);
		this.petal4.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
		this.scene.translate(0,0.61,0);
		this.petal5.display();
		this.scene.popMatrix();
		*/

	 

	}

	enableNormalViz(){
        this.steam.enableNormalViz();
		this.receptacle.enableNormalViz();
    };

	disableNormalViz(){
		this.steam.disableNormalViz();
		this.receptacle.disableNormalViz();
	};
}

