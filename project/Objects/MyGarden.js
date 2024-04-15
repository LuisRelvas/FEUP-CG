import { CGFobject } from '../../lib/CGF.js';
import { MyFlower }  from './MyFlower.js';

export class MyGarden extends CGFobject{
    constructor(scene, rows, cols) {
        super(scene); 
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];

        this.createFlowers();
    }

    createFlowers() {
        let spacing = 10;  
        let totalSize = spacing * (this.rows - 1); // Total size of the garden
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let flower = new MyFlower(this.scene);
                let offsetX = Math.random() * (spacing / 2);  
                let offsetY = Math.random() * (spacing / 2);  
                // Subtract half of the total size from each position to center the garden
                flower.setPosition(i * spacing - totalSize / 2 + offsetX, j * spacing - totalSize / 2 + offsetY);
                this.flowers.push(flower);
            }
        }
    }

    display() {
        for (let flower of this.flowers) {
            flower.display();
        }
    }
}