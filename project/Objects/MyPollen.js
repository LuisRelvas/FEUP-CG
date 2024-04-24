import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';

export class MyPollen extends CGFobject{
    constructor(scene) {
        super(scene); 
        this.initMaterials();
        this.sphere = new MySphere(this.scene, 32, 16, false, 0.1);
    }

    initMaterials() 
    {
        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pollenMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pollenMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.pollenMaterial.setShininess(10.0);
    }
    
    display(posX,posY,posZ) 
    {
        this.scene.pushMatrix();
        this.pollenMaterial.apply();
        this.scene.translate(posX,posY,posZ);
        this.sphere.display();
        this.scene.popMatrix();
        return [posX,posY,posZ];

    }
}