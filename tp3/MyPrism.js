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
        this.initializeArrays();
        this.calculateVerticesIndicesAndNormals();
        this.setPrimitiveTypeAndInitializeGLBuffers();
    }
    
    initializeArrays() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    }
    
    calculateVerticesIndicesAndNormals() {
        let index = 0;
        let increment = 2 * Math.PI / this.slices;
    
        for (let i = 0 ; i < this.slices ; i++) {
            let {x1, y1, x2, y2} = this.calculateXY(i, increment);
            let incrementZ = 1 / this.stacks;
    
            for (let j = 0 ; j < this.stacks ; j++) {
                let {x, y, size} = this.calculateXYS(i, increment);
                this.addVertices(x1, y1, x2, y2, incrementZ, j);
                this.addIndices(index);
                this.addNormals(x, y, size);
                index += 4;
            }
        }
    }
    
    calculateXY(i, increment) {
        let x1 = Math.cos(i * increment);
        let y1 = Math.sin(i * increment);
        let x2 = Math.cos((i + 1) * increment);
        let y2 = Math.sin((i + 1) * increment);
        return {x1, y1, x2, y2};
    }
    
    calculateXYS(i, increment) {
        let x = Math.cos((i + 0.5) * increment);
        let y = Math.sin((i + 0.5) * increment);
        let size = Math.sqrt(x * x + y * y);
        return {x, y, size};
    }
    
    addVertices(x1, y1, x2, y2, incrementZ, j) {
        this.vertices.push(x1, y1, incrementZ * j); 
        this.vertices.push(x2, y2, incrementZ * j);
        this.vertices.push(x1, y1, incrementZ * (j + 1)); 
        this.vertices.push(x2, y2, incrementZ * (j + 1));
    }
    
    addIndices(index) {
        this.indices.push(index + 2, index, index + 1);
        this.indices.push(index + 1, index + 3, index + 2);
    }
    
    addNormals(x, y, size) {
        this.normals.push(x / size, y / size, 0, x / size);
        this.normals.push(y / size, 0, x / size, y / size);
        this.normals.push(0, x / size, y / size, 0);
    }
    
    setPrimitiveTypeAndInitializeGLBuffers() {
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


