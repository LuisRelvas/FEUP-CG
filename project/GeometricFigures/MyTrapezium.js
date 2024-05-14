import { CGFobject } from '../../lib/CGF.js';

/**
 * MyTrapezium
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrapezium extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0.5, 0,   //0
            0.5, 0.5, 0,    //1
            1, -0.5, 0,     //2
            -1, -0.5, 0     //3
        ];
    
        // Add indices for the other side of the trapezium
        this.indices = [
            0, 1, 2,
            2, 3, 0,
            2, 1, 0,  
            0, 3, 2   
        ];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}