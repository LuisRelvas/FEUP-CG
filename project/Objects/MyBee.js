import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';
import { MyCilinder } from '../GeometricFigures/MyCilinder.js';
import { MyCone } from '../GeometricFigures/MyCone.js';
import { MyPollen } from './MyPollen.js';

export class MyBee extends CGFobject {
    constructor(scene,x,y,z) 
    {
        super(scene);
        this.x = x; 
        this.y = y; 
        this.z = z;
        this.pollenPos = []; 
        this.animation = true; 
        this.head = new MySphere(this.scene, 32, 16, false, 0.1); 
        this.body = new MySphere(this.scene, 32, 16, false, 0.1);
        this.wing = new MySphere(this.scene, 32, 16, false, 0.1);
        this.legs = new MyCilinder(this.scene, 32, 16, 0.01);
        this.paw = new MySphere(this.scene, 32, 16, false, 0.1);
        this.sting = new MyCone(this.scene, 32, 16, 0.01, 0.5);
        this.pollen = new MyPollen(this.scene,1,-10,1);
        this.time = 0; 
        this.timeWings = 10;
        this.orientation = 0; 
        this.speed = 0; 
        this.transport = false; 
        this.scene.pushMatrix();
        this.scene.popMatrix();
        this.initMaterials(); 
    }

    displayPolen(posFlowers) 
    {
        let yOffset = 0.1; 
        let posPollen = []; 
        for(let i = 0; i < posFlowers.length; i++) 
        {

            this.scene.pushMatrix();
            this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
            //this.scene.translate(0,0,14);
            posPollen.push(this.pollen.display(posFlowers[i][0], posFlowers[i][1], 0));
            this.pollen.display(posFlowers[i][0], posFlowers[i][1], 0);
            this.scene.popMatrix();
        }
        return posPollen;
    }

    initMaterials() 
    {
        this.beeMaterial = new CGFappearance(this.scene);
		this.beeTexture = new CGFtexture(this.scene, "/project/images/bee_texture.jpg");
		this.beeMaterial.setTexture(this.beeTexture);
		this.beeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.legsMaterial = new CGFappearance(this.scene);
        this.legsTexture = new CGFtexture(this.scene, "/project/images/legs_texture_1.jpg");
        this.legsMaterial.setTexture(this.legsTexture);
        this.legsMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.headMaterial = new CGFappearance(this.scene);
        this.headTexture = new CGFtexture(this.scene, "/project/images/bee_head_texture.jpg");
        this.headMaterial.setTexture(this.headTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setDiffuse(0.8, 0.8, 0.8, 0.5); 
        this.wingMaterial.setSpecular(0.8, 0.8, 0.8, 0.5);
        this.wingMaterial.setShininess(10.0);
    }

    reset() 
    {
        this.scene.pushMatrix(); 
        this.x = 0; 
        this.y = 0;
        this.z = 0; 
        this.orientation = 0;
        this.scene.popMatrix();
    }

    update(t) 
    {
        if(this.animation) 
        {
        this.time = Math.PI * (t/ 1000);
        }
        else 
        {
            this.time = 0;
        }
    }

    updateWings(t) {
        if(this.animation)
        {
        this.timeWings = Math.abs(Math.PI * (t/ 1000)); 
        }
        else 
        {
            this.timeWings = 0;
        }
    }

    move() 
    {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        console.log("position of the bee: " + this.x + " " + this.y + " " + this.z);
        this.scene.rotate(this.orientation,0,1,0);
        this.display();
        this.scene.popMatrix();
    }

    turn(v) {
        this.orientation -= v * 0.8 * this.scene.speedFactor;
    }

    accelerate(v) {
        this.speed += v * 0.1 * this.scene.speedFactor; 
        if(this.speed <= 0) {
            this.speed = 0;
        }
    }
    

    display() 
    {
        
        if(this.transport) 
        {
            this.displayPolen();
        }
        this.scene.pushMatrix(); 
        this.scene.translate(0, Math.sin(this.time), 0);
        // Head
        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.translate(0.3, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        // Body
        this.scene.pushMatrix();
        this.beeMaterial.apply();
        this.scene.rotate(90 * Math.PI / 180, 0, 0,1);
        this.scene.scale(0.9,3, 1);
        this.body.display();
        this.scene.popMatrix();

        // Legs
        //First Pair of Legs Z = 0 
        this.scene.pushMatrix();
        this.legsMaterial.apply();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
        this.scene.rotate(135 * Math.PI/ 180, 1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        //Second Pair of legs Z = 0.5

        this.scene.pushMatrix();
        this.legsMaterial.apply();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
        this.scene.rotate(135 * Math.PI/ 180, 1, 0, 0);
        this.scene.translate(0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        //Thrid Pair of legs Z = 0.5

        this.scene.pushMatrix();
        this.legsMaterial.apply();
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(-0.1, 0, 0);
        this.scene.scale(1, 1, 0.2);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
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
        this.legsMaterial.apply();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(1.9, 0.2, -0.2); 
        this.paw.display();
        this.scene.popMatrix();

        //Antenas Right
        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
        this.scene.rotate(-45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1,1,0.15);
        this.scene.translate(0.32,0,0);
        this.legs.display();
        this.scene.popMatrix();
        

        //Antenas Left  
        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
        this.scene.rotate(-135 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1,1,0.15);
        this.scene.translate(0.32,0,0);
        this.legs.display();
        this.scene.popMatrix(); 

        //Sting 
        this.scene.pushMatrix(); 
        this.legsMaterial.apply();
        this.scene.rotate(90 * Math.PI / 180 , 0,0,1);
        this.sting.display();
        this.scene.popMatrix();

        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);    
        // Wings RIGHT 
        this.scene.pushMatrix();
        this.wingMaterial.apply();
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
        this.wingMaterial.apply();
        this.scene.rotate(90 * Math.PI / 180, 0, 1,0);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1); 
        this.scene.rotate(5 * Math.PI / 180 + Math.abs(Math.sin(this.timeWings * 3)),1,0,0);
        this.scene.translate(0,0,-0.2);
        this.scene.scale(0.5,0.1,2);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        
        this.scene.gl.disable(this.scene.gl.BLEND);

    }
}