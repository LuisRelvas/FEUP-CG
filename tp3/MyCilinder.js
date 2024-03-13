import { CGFobject } from '../lib/CGF.js';
/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }


    initBuffers(){

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let index = 0;
        let increment = 2 * Math.PI / this.slices;
        for (let i = 0 ; i < this.slices ; i++) {

            let x1 = Math.cos(i*increment);
            let y1 = Math.sin(i*increment);
            let x2 = Math.cos((i+1)*increment);
            let y2 = Math.sin((i+1)*increment);
            
            let incrementZ = 1 / this.stacks
            for (let j = 0 ; j < this.stacks ; j++) {

                let angle = 2 * Math.PI * i / this.slices;
                let x = Math.cos(angle);
                let y = Math.sin(angle);

                this.vertices.push(x1, y1, incrementZ * j); 
                this.vertices.push(x2, y2, incrementZ * j);
                this.vertices.push(x1, y1, incrementZ * (j + 1)); 
                this.vertices.push(x2, y2, incrementZ * (j + 1));

                this.indices.push(index+2, index, index+1);
                this.indices.push(index+1, index+3, index+2);

                this.normals.push(x, y, 0); 
                this.normals.push(0, 0, 0);
                this.normals.push(x, y, 0);
                this.normals.push(0, 0, 0);
                
                index+=4;
            }
        }
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

        
    }
}
/*

    
    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        
        for (let z = 0 ; z <= this.stacks ; z += 1) {
            this.vertices.push(1, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
        }

        for (let i = 1 ; i <= this.slices ; i++) {

            let angle = 2 * Math.PI * i / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);

            let vector_size = Math.sqrt(x * x + y * y);
            if (i != this.slices) {    
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
            }

            for (let j = 1 ; j <= this.stacks ; j++) {
                
                if (i != this.slices) {

                    let z = j / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);
                    
                    let points = this.vertices.length / 3;
                    let indexC = points - 2;
                    let indexD = points - 1;
                    let indexB = indexD - (this.stacks + 1);
                    let indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);

                } else {

                    let points = this.vertices.length / 3;
                
                    let indexC = j - 1;
                    let indexD = j;
                    let indexB = points - this.stacks - 1 + j;
                    let indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
    }
}
*/
