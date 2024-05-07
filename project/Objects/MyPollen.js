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
        this.pollenTexture = new CGFtexture(this.scene, 'images/pollen_texture.jpg');
        this.pollenAppearance = new CGFappearance(this.scene);
        this.pollenAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.pollenAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pollenAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.pollenAppearance.setShininess(10.0);
        this.pollenAppearance.setTexture(this.pollenTexture);
        this.pollenAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display(posX, posY, posZ, angle) {
        this.scene.pushMatrix(); 
        this.scene.pushMatrix();
        this.pollenAppearance.apply();
        this.scene.translate(posX, posY, posZ);
        this.scene.rotate(angle * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1, 1.5, 1); 
        this.sphere.halfSphere(0, Math.PI/ 2); 
        this.sphere.display(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.pollenAppearance.apply(); 
        this.scene.translate(posX, posY, posZ);
        this.scene.rotate(-Math.PI, 1, 0, 0);
        this.scene.rotate(angle * Math.PI / 180, 1, 0, 0);
        this.scene.scale(1, 0.9, 1); 
        this.sphere.halfSphere(0, Math.PI / 2); 
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}