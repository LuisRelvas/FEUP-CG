import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyCloud
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of each sphere in the cloud (default: 0.5)
 * @param numSpheres - Number of spheres in the cloud (default: 3)
 */
export class MyCloud extends CGFobject {
    constructor(scene, x,y,z, radius = 0.5, numSpheres = 3) {
        super(scene);
        this.x = x; 
        this.y = y; 
        this.z = z; 
        this.radius = radius;
        this.numSpheres = numSpheres;
        this.initClouds(); 

    }

    initClouds() 
    {
        //Create a random array of clouds
        this.clouds = [];
        let randomScaleX = 0;
        let randomScaleY = 0;
        let randomScaleZ = 0; 
        
        for (let i = 0; i < this.numSpheres; i++) {
            randomScaleX = 1;
            randomScaleY = Math.random() * 0.3;
            randomScaleZ = 1;
            this.clouds.push([new MySphere(this.scene, 10, 10, false, this.radius),randomScaleX,randomScaleY,randomScaleZ]);
        }

        
    }

    display() {
        let aux = 0; 
        for(let i = 0; i < this.numSpheres; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(this.clouds[i][1],this.clouds[i][2],this.clouds[i][3])
            this.clouds[i][0].display();
            this.scene.popMatrix();
            aux += 1;
        }
    }

    update(t) 
{
    // Define speed of movement for each axis
    const speedX = this.scene.speedFactor;

    // Update position based on time and speed
    this.x += speedX;

    // If the cloud exceeds 10 units on the X axis, reset its position
    if(this.x >= 200) 
    {
        this.x = -200;
    }

    this.scene.pushMatrix(); 
    this.scene.translate(this.x, this.y, this.z);
    this.scene.popMatrix();
}
}