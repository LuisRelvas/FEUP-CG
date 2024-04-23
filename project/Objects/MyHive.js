import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';
import { MyQuad } from '../GeometricFigures/MyQuad.js';

export class MyHive extends CGFobject{
    constructor(scene) {
        super(scene); 
        this.sphere = MySphere(this.scene, 32, 16, false, 0.1);
        this.quad = MyQuad(this.scene);
    }
    display() 
    {
        this.scene.pushMatrix();
        this.scene.scale(1,1,1.5); 
        this.sphere.display();
        this.scene.popMatrix();
    }
}