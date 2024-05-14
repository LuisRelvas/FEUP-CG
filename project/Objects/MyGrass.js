import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';
import { MyTrapezium } from '../GeometricFigures/MyTrapezium.js';
import { MyRecTriangle } from '../GeometricFigures/MyRecTriangle.js';


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
        this.initShader();
        this.createTriangles();
        this.triangle = new MyTriangle(scene);  
        this.trapezium = new MyTrapezium(scene);

    }



    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    }

    createTriangles() {
        let numTriangles = Math.max(Math.floor(Math.random() * 3) + 2, 3); // Ensure at least 3 trapeziums
        console.log("the number of triangles is" + numTriangles);
        let offset = 0; // Initialize offset for positioning triangles
        let randomScaleTriangle = Math.random() * 0.5 + 0.5; 
        for (let i = 0; i < numTriangles; i++) {
            let triangle = new MyRecTriangle(this.scene);
            let trapezium = new MyTrapezium(this.scene);
            trapezium.randomScaleY = randomScaleTriangle; 
            // Generate random values for transformations  
            this.trianglesAngles.push(Math.random() * 0.1);
            this.triangles.push(trapezium);
        }
    }


    update(t) {
        console.log("The time is" + t);
        console.log("the value of the windFactor is " + this.scene.windFactor);
        this.shader.setUniformsValues({ 
            windFactor: (this.scene.windFactor * 1000) % 1000,
            uBasePosition : [3,3,3]
        });
    }
    

    display() {
        this.scene.setActiveShader(this.shader);  
        this.scene.pushMatrix(); 
        let lastPosY = 0;
        let randomScale = this.triangles[0].randomScaleY; 
        for(let i = 0; i < this.triangles.length; i++) 
            {
                console.log("the value of the randomScale is" + randomScale)
                randomScale = randomScale * 0.5;
                this.scene.pushMatrix(); 
                this.scene.translate(0,lastPosY,0); 
                this.scene.scale(randomScale,1,1);
                this.triangles[i].display();
                lastPosY += 1;
                this.scene.popMatrix();
            }
        //on the top of the last Trapzium display a triangle
        this.scene.pushMatrix();
        this.scene.translate(0,lastPosY - 0.5,0);
        this.scene.scale(randomScale * 0.5,1,1);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.popMatrix(); 
        // let windFactor = this.scene.windFactor; 
        // let lastPosX = 0; 
        // this.scene.setActiveShader(this.shader);     

        // for (let i = 0; i < this.triangles.length; i++) {
        //     this.scene.pushMatrix();

        //     this.scene.rotate(90 * Math.PI / 180, 0, 1,0);
        //     this.scene.rotate(90 * Math.PI / 180, 0, 0,1);

        //     this.scene.translate(lastPosX,0,0); 
        //     this.scene.scale(this.triangles[i].randomScaleX, this.triangles[i].randomScaleY, 1);
        //     this.triangles[i].display();
        //     lastPosX += 1 * this.triangles[i].randomScaleX;

        //     this.scene.translate(1,0,1);
        //     this.scene.scale(-1,1,-1);
        //     if(i == this.triangles.length - 1) 
        //         {
        //             continue; 
        //         }
        //     else {
        //     this.triangles[i].display();
        //     }
        //     this.scene.popMatrix();

        // }
    }




}