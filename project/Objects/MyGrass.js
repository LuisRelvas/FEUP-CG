import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';


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
        // this.initShader();
        this.createTriangles();

    }



    // initShader() {
    //     this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    //     this.shader.setUniformsValues({timeFactor: this.time}); // Add this line
    // }

    createTriangles() {
        let numTriangles = Math.max(Math.floor(Math.random() * 3) + 3, 3); // Ensure at least 3 triangles
        console.log("the number of triangles is" + numTriangles);
        let offset = 0; // Initialize offset for positioning triangles
        let randomScaleTriangle = Math.random() * 0.5 + 0.5; 
        for (let i = 0; i < numTriangles; i++) {
            let triangle = new MyTriangle(this.scene);
            // Generate random values for transformations
            triangle.randomScaleY = randomScaleTriangle; 
            triangle.randomScaleX = Math.random() * 0.2 + 0.9; 
            triangle.randomRotation = Math.random() * Math.PI;
            triangle.randomTranslation = Math.random() * 2 - 1;
            triangle.number = numTriangles;
            this.trianglesAngles.push(Math.random() * 0.1);
            this.triangles.push(triangle);
        }
    }

    display() {
        let windFactor = this.scene.windFactor; 
        this.scene.pushMatrix();
        // this.scene.setActiveShader(this.shader);
        // this.shader.setUniformsValues({ windIntensity: windFactor, timeFactor: Math.random() }); 
        let lastPosX = 0; 
        let lastPosY = 0;
        let lastPosZ = 0;
        let lastPosTriangleZ = 0; 
        let lastPosTriangleY = 0; 
        for (let i = 0; i < this.triangles.length; i++) {
            
            if(i % 2 == 0) 
                {
                this.scene.pushMatrix(); 
                this.scene.rotate(90 * Math.PI/ 180, 0,0,1);
                if(windFactor != 0) {
                this.scene.translate(lastPosX,0,lastPosZ);
                }
                else 
                {
                    this.scene.translate(lastPosX,0,0);
                }
                this.scene.rotate(Math.PI , 1, 0,0);
                this.scene.scale(this.triangles[i].randomScaleX,this.triangles[i].randomScaleY,1); 
                this.scene.rotate(-windFactor / 10,0,1,0);

                this.triangles[i].display();
                this.scene.popMatrix();
                }
            else
            {
                this.scene.pushMatrix(); 
                //x altura y = z e z = y 
                this.scene.rotate(90 * Math.PI/ 180, 0,0,1);
                if(windFactor != 0)
                {
                    this.scene.translate(lastPosX,-lastPosY,lastPosZ);
                }
                else 
                {
                    this.scene.translate(lastPosX,-lastPosY,0);
                }                
                this.scene.scale(this.triangles[i].randomScaleX,this.triangles[i].randomScaleY,1); 
                this.scene.rotate(windFactor / 10,0,1,0);
                this.triangles[i].display();
                this.scene.popMatrix();
            }

            lastPosX += 1 * this.triangles[i].randomScaleX;
            lastPosY = 1 * this.triangles[i].randomScaleY ; 
            lastPosZ += -Math.sin(windFactor / 10);
            lastPosTriangleZ += -Math.cos(windFactor / 10); 
        }
        // this.scene.setActiveShader(this.scene.defaultShader);
    }

    // update(t) {
    //     let aux = Math.random() * 0.1 - 0.05; // Random number between -0.05 and 0.05
    //     this.time += aux; 
    // }

}