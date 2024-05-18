import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCloud } from '../GeometricFigures/MyCloud.js';

/**
 * MyCloudSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of each sphere in the cloud (default: 0.5)
 * @param numSpheres - Number of spheres in the cloud (default: 3)
 */


export class MyCloudSet extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.initClouds();
    }

    initClouds() 
    {
        //Create a random array of clouds
        this.clouds = [];
        let randomScaleX = 0;
        let randomScaleY = 0;
        let randomScaleZ = 0; 
        let randomX = 0;
        let randomY = 0;
        let randomZ = 0; 
        let randomRadius = 0; 
        let randomNumSpheres = 0; 
        for (let i = 0; i < 100; i++) {
            randomX = Math.random() * 100;
            randomY = Math.random() * 25;
            randomZ = Math.random() * 100;
            randomRadius = Math.random() * 2;
            randomNumSpheres = Math.random() * 5;
            randomScaleX  = Math.random() * 2 + 2;
            randomScaleZ = Math.random() * 2;
            this.clouds.push([new MyCloud(this.scene, randomX,randomY,randomZ, randomRadius, randomNumSpheres),randomScaleX,randomScaleZ]);
        }
    }

    display() {
        let aux = 0; 
        for(let i = 0; i < 100; i++) {
            this.scene.pushMatrix();
            this.scene.scale(this.clouds[i][1],1,1)
            this.clouds[i][0].display();
            this.scene.popMatrix();
            aux += 1;
        }
    }

    update(t) 
{
    for(let i = 0; i < 100; i++) 
    {
        const speedX = this.scene.speedFactor * 0.1;

        if(this.clouds[i][0].x >= 100) 
        {
            this.clouds[i][0].x = -100;
        }
        else
        {
            this.clouds[i][0].x += speedX;
        }
    }
}

}