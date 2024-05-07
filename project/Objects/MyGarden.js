import { CGFobject } from '../../lib/CGF.js';
import { MyFlower }  from './MyFlower.js';
import { MyGrass } from './MyGrass.js';

export class MyGarden extends CGFobject{
    constructor(scene, rows, cols) {
        super(scene); 
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];
        this.grass = []; 
        this.flowerPositions = [];
        this.createFlowers();
        //this.createGrass(); 
    }

    createGrass() {
        let spacing = 1; 
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                let size = 0.8 + Math.random() * 0.4; // Random size between 0.8 and 1.2
                let angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Random angle between -PI/8 and PI/8
                let x = i * spacing + Math.random() * 0.2 - 0.1; // Random x position within 0.1 units of the grid
                let z = j * spacing + Math.random() * 0.2 - 0.1; // Random z position within 0.1 units of the grid
                let grassBlade = new MyGrass(this.scene, x, 0, z, size, angle);
                this.grass.push(grassBlade);
            }
        }
    }

    createFlowers() {
        let spacing = 10;  
        let totalSize = spacing * (this.rows - 1); // Total size of the garden
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.flower = new MyFlower(this.scene);
                let offsetX = Math.random() * (spacing / 2);  
                let offsetY = Math.random() * (spacing / 2);  
                // Subtract half of the total size from each position to center the garden
                let posX = i * spacing - totalSize / 2 + offsetX;
                let posY = j * spacing - totalSize / 2 + offsetY;
                this.flower.setPosition(posX, posY);
                this.flowers.push(this.flower);
                this.flowerPositions.push([posX, posY,this.flower.totalSize]);
            }
        }
    }

    display() {
    
        for (let flower of this.flowers) {
            flower.display();
        }
        for (let grassBlade of this.grass) {
            grassBlade.display();
        }

        return this.flowerPositions; 
    }

}