
import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inside) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
        this.radius = 1;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const deltaAlpha = Math.PI / this.stacks;
        const deltaTheta = 2 * Math.PI / this.slices;
    
        // Criação das stacks
        for (let stack = 0; stack <= this.stacks; stack++) {
            const alpha = stack * deltaAlpha;
            const sinAlpha = Math.sin(alpha);
            const cosAlpha = Math.cos(alpha);
    
            // Criação dos slices
            for (let slice = 0; slice <= this.slices; slice++) {
    
                if (stack == 0 || stack == this.stacks) { 
                    const currentVertex = stack * this.slices + slice;
                    const nextVertex = stack * this.slices + (slice + 1) % this.slices;
                    const topVertex = (stack + 1) * this.slices + slice;
    
                    this.indices.push(currentVertex, nextVertex, topVertex);
                }
                const theta = slice * deltaTheta;
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);
    
                // Cálculo das coordenadas do vértice
                const x = this.radius * sinAlpha * cosTheta;
                const y = this.radius * cosAlpha;
                const z = this.radius * sinAlpha * sinTheta;
    
                // Cálculo da normal
                const normalX = x;
                const normalY = y;
                const normalZ = z;
    
                // Cálculo das coordenadas de textura
                const texCoordU = 1 - (slice / this.slices);
                const texCoordV = stack / this.stacks;
    
                // Armazenamento dos dados
                this.vertices.push(x, y, z);
                this.normals.push(normalX, normalY, normalZ);
                this.texCoords.push(texCoordU, texCoordV);
            }
        }
    
        // Criação dos índices
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const currentVertex = stack * this.slices + slice;
                const nextVertex = stack * this.slices + (slice + 1) % this.slices;
                const bottomVertex = (stack + 1) * this.slices + slice;
                const topVertex = (stack + 1) * this.slices + (slice + 1) % this.slices;
    
            
                this.indices.push(currentVertex, nextVertex, topVertex);
                this.indices.push(currentVertex, topVertex, bottomVertex);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    setFillMode() { 
        this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    }
    
    setLineMode() 
    { 
        this.primitiveType=this.scene.gl.LINES;
    }

    setFillMode() { 
        this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    }

    setLineMode() 
    { 
        this.primitiveType=this.scene.gl.LINES;
    }

}
