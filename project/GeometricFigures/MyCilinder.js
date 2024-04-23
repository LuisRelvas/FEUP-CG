import { CGFobject } from '../../lib/CGF.js';

export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        this.addVerticesAndNormalsForStacks();
        this.calculateVerticesNormalsAndIndicesForSlices();
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.updateTexCoordsGLBuffers();
    }
    
    addVerticesAndNormalsForStacks() {
        for (let z = 0; z <= this.stacks; z += 1) {
            this.vertices.push(this.radius, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
            this.texCoords.push(0, z / this.stacks);
        }
    }
    
    
    calculateVerticesNormalsAndIndicesForSlices() {
        for (let i = 1; i <= this.slices; i++) {
            let {x, y, vector_size} = this.calculateVector(i);
    
            if (i != this.slices) {    
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
                this.texCoords.push(i / this.slices, 0);
            }
    
            this.calculateVerticesNormalsAndIndicesForStacks(i, x, y, vector_size);
        }
    }
    
    calculateVector(i) {
        let angle = 2 * Math.PI * i / this.slices;
        let x = Math.cos(angle)*this.radius;
        let y = Math.sin(angle)*this.radius;
        let vector_size = Math.sqrt(x * x + y * y);
        return {x, y, vector_size};
    }
    
    calculateVerticesNormalsAndIndicesForStacks(i, x, y, vector_size) {
        for (let j = 1; j <= this.stacks; j++) {
            if (i != this.slices) {
                this.addStackVertex(x, y, j, vector_size);
                this.addIndices(j);
            } else {
                this.addFinalIndices(j);
            }
        }
    }
    
    addStackVertex(x, y, j, vector_size) {
        let z = j / this.stacks;
        this.vertices.push(x, y, z);
        this.normals.push(x / vector_size, y / vector_size, 0);
        this.texCoords.push(j / this.stacks, z);
    }
    
    addIndices(j) {
        let points = this.vertices.length / 3;
        let indexC = points - 2;
        let indexD = points - 1;
        let indexB = indexD - (this.stacks + 1);
        let indexA = indexB - 1;
        this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
    }
    
    addFinalIndices(j) {
        let points = this.vertices.length / 3;
        let indexC = j - 1;
        let indexD = j;
        let indexB = points - this.stacks - 1 + j;
        let indexA = indexB - 1;
        this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
    }

    updateBuffers(complexity) {
    }
}