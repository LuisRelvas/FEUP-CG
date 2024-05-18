import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class MyGrassCall extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.initShader();
        this.grass = new MyGrass(scene, 0, 0, 0, 1, 0);
    }

    initShader() 
    {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    }

    update(t) {
        this.shader.setUniformsValues({ 
            windFactor: this.scene.windFactor,
            time : t % 1000
        });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.grass.display();
        this.scene.popMatrix();
    }
}
    
