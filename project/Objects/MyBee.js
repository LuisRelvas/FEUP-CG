import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';

export class MyBee extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.head = new MySphere(this.scene, 32, 16, false, 0.1); 
        this.body = new MySphere(this.scene, 32, 16, false, 0.1);
        this.wing = new MySphere(this.scene, 32, 16, false, 0.1);
        this.legs = new MyCilinder(this.scene, 32, 16, 0.01);
        this.paw = new MySphere(this.scene, 32, 16, false, 0.1);
        this.time = 0; 
    }

    update(t) 
    {
        this.time = Math.PI * (t/ 1000);
    }

    updateWings(t) {
        this.timeWings = Math.abs(Math.PI * (t/ 1000)); 
    }
    

    display() 
    {

        
        this.scene.pushMatrix(); 
        this.scene.translate(0, Math.sin(this.time), 0); // Add this line to make the bee go up and down
        // Head
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        // Body
        this.scene.pushMatrix();
        this.scene.scale(3, 0.9, 1);
        this.body.display();
        this.scene.popMatrix();

        // // Wings RIGHT 
        this.scene.pushMatrix();
        this.scene.rotate(90 * Math.PI / 180, 0, 1,0);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(90 * Math.PI / 180, 0, 0, 1); 
        this.scene.rotate(5 * Math.PI / 180 + Math.abs(Math.sin(this.timeWings * 3)),1,0,0);
        this.scene.translate(0,0,-0.2);
        this.scene.scale(0.5,0.1,2);
        this.wing.display();
        this.scene.popMatrix();

        // Wings LEFT
        this.scene.pushMatrix();
        this.scene.rotate(90 * Math.PI / 180, 0, 1,0);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1); 
        this.scene.rotate(5 * Math.PI / 180 + Math.abs(Math.sin(this.timeWings * 3)),1,0,0);
        this.scene.translate(0,0,-0.2);
        this.scene.scale(0.5,0.1,2);
        this.wing.display();
        this.scene.popMatrix();

        // Legs
        //First Pair of Legs Z = 0 
        this.scene.pushMatrix();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.scene.rotate(135 * Math.PI/ 180, 1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        //Second Pair of legs Z = 0.5

        this.scene.pushMatrix();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.scene.rotate(135 * Math.PI/ 180, 1, 0, 0);
        this.scene.translate(0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        //Thrid Pair of legs Z = 0.5

        this.scene.pushMatrix();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(-0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.scene.rotate(135 * Math.PI/ 180, 1, 0, 0);
        this.scene.translate(-0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        //Eyes Right 
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(1.9, 0.2, 0.2); 
        this.paw.display();
        this.scene.popMatrix();

        //Eyes Left 
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(1.9, 0.2, -0.2); 
        this.paw.display();
        this.scene.popMatrix();

        //Antenas Right
        this.scene.pushMatrix(); 
        this.scene.rotate(-45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1,1,0.15);
        this.scene.translate(0.32,0,0);
        this.legs.display();
        this.scene.popMatrix();
        

        //Antenas Left  
        this.scene.pushMatrix(); 
        this.scene.rotate(-135 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1,1,0.15);
        this.scene.translate(0.32,0,0);
        this.legs.display();
        this.scene.popMatrix(); 
        this.scene.popMatrix();
    }
}