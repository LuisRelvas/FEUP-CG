import {CGFobject , CGFappearance} from "../../lib/CGF.js";
import { MySphere } from "../GeometricFigures/MySphere.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.rock = new MyRock(this.scene, 1, 32, 16);
        this.layers = [7, 5, 3, 1]; 
    }

    display() 
    {
        for (let i = 0; i < this.layers.length; i++) {
            for (let j = 0; j < this.layers[i]; j++) {
                for (let k = 0; k < this.layers[i]; k++) {
                    this.scene.pushMatrix();
                    this.scene.translate(2 * (j - this.layers[i] / 2), 2 * i, 2 * (k - this.layers[i] / 2));
                    this.rock.display();
                    this.scene.popMatrix();
                }
            }
        }
    }
}