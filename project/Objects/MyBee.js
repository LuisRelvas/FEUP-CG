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
        this.initialPollenPositionsCalculated = false; 
        this.animation = true; 
        this.targetPos = null; 
        this.head = new MySphere(this.scene, 32, 16, false, 0.1); 
        this.body = new MySphere(this.scene, 32, 16, false, 0.1);
        this.wing = new MySphere(this.scene, 32, 16, false, 0.1);
        this.legs = new MyCilinder(this.scene, 32, 16, 0.01);
        this.paw = new MySphere(this.scene, 32, 16, false, 0.1);
        this.sting = new MyCone(this.scene, 32, 16, 0.01, 0.5);
        this.pollen = new MyPollen(this.scene);
        this.pollenHold = new MyPollen(this.scene);
        this.orientation = 0; 
        this.speed = 0; 
        this.timeWings = null;
        this.time = null;
        this.previous = 0; 
        this.transport = false; 
        this.moving = false; 
        this.down = false; 
        this.up = false; 
        this.slow = false; 
        this.stop = false; 
        this.pollenHold = [];
        this.moveToHive = false; 
        this.vx = 0; 
        this.vy = 0; 
        this.aX = 0; 
        this.aY = 0; 
        this.displayPollenInHive = 0; 
        this.scene.pushMatrix();  
        this.scene.popMatrix(); 
        this.initMaterials(); 
    }

    accelerateX(a) 
    {
        this.vx += a * 0.1 * this.scene.speedFactor; 
        if(this.vx <= 0) 
        {
            this.vx = 0;
        }
    }
    accelerateY(a) 
    {
        this.vy += a * 0.1 * this.scene.speedFactor;
    }

    calculateInitialPolenPositions(posFlowers) {
        if (!this.initialPollenPositionsCalculated) {
            let yOffset = 0.1; 
            this.pollenPos = [];
            for(let i = 0; i < posFlowers.length; i++) {
                this.pollenPos.push([posFlowers[i][0], posFlowers[i][2], posFlowers[i][1], Math.random() * 45]);
            }
            this.initialPollenPositionsCalculated = true;
        }
        return this.pollenPos;
    }

    displayPolen() {
        for(let i = 0; i < this.pollenPos.length; i++) {
            this.scene.pushMatrix();
            if(this.transport) {
                this.pollen.display(this.pollenPos[i][0], this.pollenPos[i][1], this.pollenPos[i][2], this.pollenPos[i][3]);
            } else {
                this.pollen.display(this.pollenPos[i][0], this.pollenPos[i][1], this.pollenPos[i][2], this.pollenPos[i][3]);
            }
            this.scene.popMatrix();
        }
    }

    handle(pollen) {
        let distance = Math.sqrt(Math.pow(this.x - pollen[0], 2) + Math.pow(this.y - pollen[1], 2) + Math.pow(this.z - pollen[2], 2));
            if (distance < 2) { 
                this.transport = true;
                this.pollenPos = this.pollenPos.filter(pos => 
                    Math.abs(pos[0] - pollen[0]) >= 0.0001 ||
                    Math.abs(pos[1] - pollen[1]) >= 0.0001 ||
                    Math.abs(pos[2] - pollen[2]) >= 0.0001
                );
                console.log("Handled a pollen"); 
                let newPollen = new MyPollen(this.scene); 
                this.pollenHold = newPollen;
        }
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
        this.wingMaterial.setAmbient(1.0, 1.0, 1.0, 0.1)
        this.wingMaterial.setDiffuse(1.0, 1., 1.0, 0.1);    
        this.wingMaterial.setSpecular(1.0, 1.0, 1.0, 0.1);
        this.wingMaterial.setEmission(0,0,0,0);
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
        let time = t / 1000; 
        let delta = time / 100; 
        if(this.targetPos != null) 
        {
            let speed = 0.01; 
            this.x += (this.targetPos[0] - this.x) * speed;
            this.y += (this.targetPos[1] - this.y) * speed;
            this.z += (this.targetPos[2] - this.z) * speed;
            console.log("Entered in the targetPos");

            // If the bee is close enough to the target position
            if(Math.abs(this.x - this.targetPos[0]) < 0.4 && Math.abs(this.y - this.targetPos[1]) < 0.4 && Math.abs(this.z - this.targetPos[2]) < 0.4) 
            {
                console.log("entered in the else condition");
                this.targetPos = null;
                this.moving = true; 
                this.transport = false;
                this.pollenHold = null; 
                if(this.moveToHive) 
                    {
                        this.pollenPos.push([this.x,this.y -2.48,this.z + this.displayPollenInHive,0]);
                        this.moveToHive = false;
                        this.displayPollenInHive += 0.1
                        this.targetPos = null; 
                    }
                
            }
        }
        if(this.moving) 
        {
            this.x += Math.cos(this.orientation) * this.vx;
            console.log("the value of the this.x is " + this.x);
            this.z += Math.sin(-this.orientation) * this.vx 
            console.log("the value of the this.z is " + this.z);
        }
        if(this.down && this.animation) 
        {
            this.y += this.vy; 
        }
        if(this.up && this.animation)
        {
            this.y += this.vy ; 
        }
        if(this.animation) 
        {
            time = Math.PI * (t/ 1000);
        }
        else if(this.animation && this.transport) 
        {
            time = Math.PI * (t/ 1000);
        }
        else if(!this.animation) 
        {
            time = 0;
        }
        else 
        {
            if(t % 1000 < 500) {
                this.y -= delta; 
            }
            else {
                this.y += delta; 
            }
        }
        this.time = time;
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



    
    move(scaleFactor) 
    {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        if (this.transport) {
            this.pollen.display(this.pollenPos[0], this.pollenPos[1], this.pollenPos[2],0);
        }
        this.scene.rotate(this.orientation,0,1,0);
        this.display(scaleFactor);
        this.scene.popMatrix();
        
    }

    turn(v) {
        this.orientation -= v * 0.8 * this.scene.speedFactor;
    }
    

    display(scaleFactor) 
    {
        this.scene.pushMatrix(); 
        this.scene.translate(0, Math.sin(this.time), 0);
        this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
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

        if(this.transport) 
        {
            this.pollenHold.display(0, -0.3, 0,0);
        }

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