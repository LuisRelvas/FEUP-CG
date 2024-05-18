import { CGFobject, CGFshader } from '../../lib/CGF.js';
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
        this.createGrass(); 
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
                this.flowerPositions.push([posX, posY,this.flower.totalSize -50]);
            }
        }
    }

    createGrass() 
    {
        let spacing = 2; 
        this.rows = 5; 
        this.cols = 5;
        let totalSize = spacing * (this.rows - 1);
        for(let i = 0; i < this.rows; i++) 
            {
                for(let j = 0; j < this.cols; j++) 
                    {
                        let offsetX = Math.random() * (spacing / 2);
                        let offsetY = Math.random() * (spacing / 2);
                        let posX = i * spacing - totalSize / 2 + offsetX;
                        let posY = j * spacing - totalSize / 2 + offsetY;
                        this.blade = new MyGrass(this.scene, posX, -50,posY);
                        this.grass.push(this.blade);
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

    update(t) 
    {
        this.grass.forEach(grassBlade => {
            grassBlade.update(t);
        });
    }

}