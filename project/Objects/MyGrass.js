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
        this.createTriangles();
        this.triangle = new MyTriangle(scene);  
        this.trapezium = new MyTrapezium(scene);

    }



    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    }

    createTriangles() {
        this.numTriangles = Math.max(Math.floor(Math.random() * 3) + 1, 2);
        let offset = 0; 
        let heightPerTrapezium = (1 - 0.2) / this.numTriangles; 
        let scaleX = 1; 
        let scaleDecrement = 0.5; 
        for (let i = 0; i < this.numTriangles; i++) {
            let triangle = new MyRecTriangle(this.scene);
            let trapezium = new MyBlade(this.scene);
            trapezium.randomScaleY = heightPerTrapezium; 
            trapezium.randomScaleX = scaleX; 
            scaleX -= scaleDecrement; 
            if (scaleX < 0.2) scaleX = 0.25; 
            this.trianglesAngles.push(Math.random() * 0.1);
            this.triangles.push(trapezium);
        }
    }


    update(t) {
        this.shader.setUniformsValues({ 
            windFactor: this.scene.windFactor,
            time : t % 100000
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
        this.triangles[0].display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix(); 
    }



}