import {CGFobject , CGFappearance} from "../../lib/CGF.js";
import { MySphere } from "../GeometricFigures/MySphere.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene,layers) 
    {
        super(scene);
        this.rock = new MyRock(this.scene, 1, 32, 16);
        this.layers = layers;
        this.rocks = []; 
        this.maxHeight = 0; 
        this.initRocks(); 
    }

    initRocks() {
        let columnHeights = {}; 
    
        for (let i = 0; i < this.layers.length; i++) {
            // Increase the height factor as we go up the layers
            let heightFactor = 1 + i * 0.5;
    
            for (let j = 0; j < this.layers[i]; j++) {
                for (let k = 0; k < this.layers[i]; k++) {
                    let x = 2 * (j - this.layers[i] / 2) + 0.1 * j;
                    let z = 2 * (k - this.layers[i] / 2) + 0.1 * k;
    
                    // Generate random scale factors between 0.5 and 1.5
                    let scaleFactorX = 0.5 + Math.random();
                    let scaleFactorY = (0.5 + Math.random()) * heightFactor; // Multiply by height factor
                    let scaleFactorZ = 0.5 + Math.random();
                    let randomRotation = Math.random() * 2 * Math.PI;
    
                    // Get the current height of the column
                    let columnKey = `${j},${k}`;
                    let y = columnHeights[columnKey] || 0;
    
                    // Store the position and scale of the rock
                    this.rocks.push({x, y, z, scaleFactorX, scaleFactorY, scaleFactorZ, randomRotation});
    
                    // Update the height of the column
                    columnHeights[columnKey] = y + scaleFactorY;
    
                    // Update max height if necessary
                    if (columnHeights[columnKey] > this.maxHeight) {
                        this.maxHeight = columnHeights[columnKey];
                    }
                }
            }
        }
    }

    display() 
    {
        for (let rock of this.rocks) {
            this.scene.pushMatrix();
            this.scene.translate(rock.x, rock.y, rock.z);
            this.scene.rotate(rock.randomRotation, 0, 1, 0);
            this.scene.scale(rock.scaleFactorX, rock.scaleFactorY, rock.scaleFactorZ);
            this.rock.display();
            this.scene.popMatrix();
        }
        let lastRock = this.rocks[this.rocks.length - 1]; 
        let lastRockPosition = [lastRock.x,lastRock.y,lastRock.z];
        return [this.maxHeight,lastRockPosition]; // Return height of the last rock
    }
}