import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';
import { MyTrapezium } from '../GeometricFigures/MyTrapezium.js';
import { MyRecTriangle } from '../GeometricFigures/MyRecTriangle.js';
import { MyBlade } from '../GeometricFigures/MyBlade.js';


export class MyGrass extends CGFobject {
    constructor(scene, x, y, z, size, angle) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.angle = angle;
        this.angleOffset = 0; 
        this.triangles = [];
        this.trianglesAngles = []; 
        this.time = 0; 
        this.numTriangles = 0;

        this.initShader();
        this.blade = new MyBlade(scene);
    }



    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    }

    update(t, angle) {
        this.shader.setUniformsValues({ 
            windFactor: this.scene.windFactor,
            time : t % 100000,
            aRandomFactor : angle 
        });
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    

    display() {
        this.scene.pushMatrix(); 
        this.scene.setActiveShader(this.shader);  
        this.scene.translate(this.x, this.y, this.z);
        this.blade.display();
        this.scene.popMatrix(); 
    }



}