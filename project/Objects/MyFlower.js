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

	setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

	createPetals() {
		this.numbPetals = Math.trunc(Math.random() * 10) + 6;
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
		let size = Math.random()*0.15+0.05;
		this.radius = size;
		this.receptacle = new MyReceptacle(this.scene, randomR, randomG, randomB, size);

	}

	createSteam(){
		
		let size = Math.random()+2;
		let randomR = Math.random()*99;
		let randomG = Math.random();
		let randomB = 0;
		let numCil =  Math.trunc(Math.random()*9+1);
		this.steam = new MySteam(this.scene, randomR/255, randomG, randomB, size, numCil);	
	}

	display() {

		this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.y);
		this.scene.pushMatrix();
		this.receptacle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.steam.display();
		this.scene.popMatrix();

		
		for(let j=0; j< this.numbPetals; j++){
			this.scene.pushMatrix();
			let curPetal = this.petals[j];
			let angle = curPetal.getAngle();
			this.scene.rotate(angle*Math.PI/180,0,0,1);
			this.scene.translate(0,0.5+this.radius,0);
		
			curPetal.display();
			this.scene.popMatrix();
		}	
		
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

