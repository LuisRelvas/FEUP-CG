import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */

export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();

	}
	
	initBuffers() {
        
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

                let x = Math.cos((i+0.5)* increment);
                let y = Math.sin((i+0.5)*increment);
                let size = Math.sqrt(x*x + y*y);

                this.vertices.push(x1, y1, incrementZ * j); 
                this.vertices.push(x2, y2, incrementZ * j);
                this.vertices.push(x1, y1, incrementZ * (j + 1)); 
                this.vertices.push(x2, y2, incrementZ * (j + 1));

                this.indices.push(index+2, index, index+1);
                this.indices.push(index+1, index+3, index+2);

                this.normals.push(x/size, y/size, 0, x/size);
                this.normals.push(y/size, 0, x/size, y/size);
                this.normals.push(0, x/size, y/size, 0);
                
                index+=4;
            }
        }
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    
	}
}

