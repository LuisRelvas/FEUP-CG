import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySteam } from './MySteam.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.petals= [];
		this.pollen = new MyPollen(this.scene);
		this.totalSize = this.createSteam();
		this.petaltextures = ["/project/images/petal_orange.jpg", "/project/images/petal_pink.jpg", "/project/images/petal_purple.jpg", "/project/images/petal_red.jpg"];
		this.createReceptacle(this.totalSize);
		this.initialMaterials(); 
		//layer 1
		this.createPetals();
	}
	initialMaterials(){
        this.petalMaterial = new CGFappearance(this.scene);
		this.petalTexture = new CGFtexture(this.scene, this.petaltextures[Math.round(Math.random() * 3)]);
		this.petalMaterial.setTexture(this.petalTexture);
		this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
    };
	setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

	createPetals() {
		this.numbPetals = Math.trunc(Math.random() * 5) + 6;
		let angleIncrement = 360 / this.numbPetals; 
	
		// Create two layers of petals
		for (let layer = 0; layer < 2; layer++) {
			let next = Math.random() * angleIncrement; 
			for (let i = 0; i < this.numbPetals; i++){
				this.scene.pushMatrix();
				this.petalMaterial.apply();
				let curPetal = new MyPetal(this.scene, Math.random()*30/(layer+1),this.petalMaterial);
				curPetal.setAngle(next);
				this.petals.push(curPetal);
				next += angleIncrement;
				this.scene.popMatrix();
			}
		}
	}

	

	createReceptacle(totalSize){
		let randomR = Math.random();
		let randomG = Math.random();
		let randomB = Math.random();
		let size = Math.random()*0.15+0.05;
		this.radius = size;
		this.receptacle = new MyReceptacle(this.scene, randomR, randomG, randomB, size, totalSize);
	}

	createSteam(){
		
		let size = Math.random()*3+3;
		//generate random sizes for cilinders having in mind the total size of the steam that is size: 
		let cilindersizes = [];
		let auxSize = size; 

		// Generate 3 base sizes first
		for(let i = 0; i < 3; i++) {
			let curSize = Math.random()*(auxSize - 1) + 1; 
			cilindersizes.push(curSize);
			auxSize -= curSize;
		}

		// Generate the rest of the sizes
		while(auxSize >= 1) {
			let curSize = Math.random()*(auxSize - 1) + 1; 
			cilindersizes.push(curSize);
			auxSize -= curSize;
		}

		// Check the last value and add the remaining auxSize to it if it's less than 1
		if(cilindersizes[cilindersizes.length - 1] < 1) {
			cilindersizes[cilindersizes.length - 1] = 1;
			size = cilindersizes.reduce((a, b) => a + b, 0);
		}
		let randomR = Math.random()*99;
		let randomG = Math.random();
		let randomB = 0;
		let numCil =  Math.trunc(Math.random()*7+3);
		this.steam = new MySteam(this.scene, randomR/255, randomG, randomB, size, cilindersizes);	
		return size; 
	}
	
	displayPetals() 
	{
		for(let j=0; j< this.numbPetals * 2; j++){ 
			this.scene.pushMatrix();
			let curPetal = this.petals[j];
			let angle = curPetal.getAngle();
			this.scene.rotate(angle*Math.PI/180,0,0,1);
			this.scene.translate(0,0.5+this.radius, j >= this.numbPetals ? 0.1 : 0);
			curPetal.display();
			this.scene.popMatrix();
		}   
	}

	display() {
		let finalPos = []; 
		this.scene.pushMatrix();
		this.scene.translate(this.x, -50, this.y);
		this.scene.pushMatrix();
		this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
		finalPos = this.steam.display();
		this.scene.pushMatrix();
		this.scene.translate(finalPos[0],0,finalPos[1]);
		this.scene.pushMatrix();
		this.scene.rotate(90 * Math.PI / 180, 1,0,0);
		this.scene.pushMatrix();
		this.scene.rotate(-finalPos[2] * Math.PI / 180, 0, 0, 1);
		this.receptacle.display(finalPos);
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.scale(1,-1,-1);
		this.scene.rotate(finalPos[2] * Math.PI / 180, 0, 0, 1); 
		this.receptacle.display(finalPos);
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(finalPos[0], 0, finalPos[1]); 
		this.scene.rotate(finalPos[2] * Math.PI / 180, 0, 1, 0);
		this.displayPetals();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
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

