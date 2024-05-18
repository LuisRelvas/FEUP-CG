import { CGFobject } from '../../lib/CGF.js';

/**
 * MyTrapezium
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrapezium extends CGFobject {
    constructor(scene) {
        super(scene);
        this.position = { x: 0, y: 0, z: 0 };
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
      
        let totalHeight = 0.8;
        let numTriangles = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
        let heightPerTriangle = totalHeight / numTriangles;
      
        let xStart = -0.1;
        let xEnd = 0.1;
      
        for (let i = 0; i < numTriangles; i++) {
          this.vertices.push(
            xStart, heightPerTriangle * i, 0,   //0
            xEnd, heightPerTriangle * i, 0,    //1
            0, heightPerTriangle * (i + 1), 0, //2
          );
      
          // Update x-coordinates for the next triangle
          xStart += 0.02; // Adjust based on desired spacing
          xEnd -= 0.02;
        }
      
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
      }
      
}