
import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inside, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
        this.radius = radius;
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
    
                    if (this.inside) {
                        this.indices.push(currentVertex, topVertex, nextVertex);
                    } else {
                        this.indices.push(currentVertex, nextVertex, topVertex);
                    }
                }
                const theta = slice * deltaTheta;
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);
    
                // Cálculo das coordenadas do vértice
                const x = this.radius * sinAlpha * cosTheta;
                const y = this.radius * cosAlpha;
                const z = this.radius * sinAlpha * sinTheta;
    
                // Cálculo da normal
                const normalX = this.inside ? -x : x;
                const normalY = this.inside ? -y : y;
                const normalZ = this.inside ? -z : z;
    
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
                if (this.inside) {
                    this.indices.push(currentVertex, topVertex, nextVertex);
                    this.indices.push(currentVertex, bottomVertex, topVertex);
                } else {
                    this.indices.push(currentVertex, nextVertex, topVertex);
                    this.indices.push(currentVertex, topVertex, bottomVertex);
                }

            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    halfSphere(startAlpha, endAlpha) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const deltaAlpha = Math.PI / this.stacks;
        const deltaTheta = 2 * Math.PI / this.slices;
    
        // Calculate stack limits based on desired portion of the sphere
        const startStack = Math.max(0, Math.floor(this.stacks * startAlpha / Math.PI));
        const endStack = Math.min(this.stacks, Math.ceil(this.stacks * endAlpha / Math.PI));
    
        // Generate stacks within the specified range
        for (let stack = startStack; stack <= endStack; stack++) {
            const alpha = stack * deltaAlpha;
            const sinAlpha = Math.sin(alpha);
            const cosAlpha = Math.cos(alpha);
    
            // Generate slices 
            for (let slice = 0; slice <= this.slices -1; slice++) {
                const theta = slice * deltaTheta;
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);
    
                // Calculate vertex coordinates
                const x = this.radius * sinAlpha * cosTheta;
                const y = this.radius * cosAlpha;
                const z = this.radius * sinAlpha * sinTheta;
    
                // Calculate normal
                const normalX = this.inside ? -x : x;
                const normalY = this.inside ? -y : y;
                const normalZ = this.inside ? -z : z;
    
                // Calculate texture coordinates (adjust if needed)
                const texCoordU = 1 - (slice / this.slices);
                const texCoordV = (stack - startStack) / (endStack - startStack); 
    
                // Store data
                this.vertices.push(x, y, z);
                this.normals.push(normalX, normalY, normalZ);
                this.texCoords.push(texCoordU, texCoordV);
            }
        }
    
        // Generate indices (same logic as before)
        for (let stack = startStack; stack < endStack; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const currentVertex = (stack - startStack) * this.slices + slice;
                const nextVertex = (stack - startStack) * this.slices + (slice + 1) % this.slices;
                const bottomVertex = (stack - startStack + 1) * this.slices + slice;
                const topVertex = (stack - startStack + 1) * this.slices + (slice + 1) % this.slices;
    
                if (this.inside) {
                    this.indices.push(currentVertex, topVertex, nextVertex);
                    this.indices.push(currentVertex, bottomVertex, topVertex);
                } else {
                    this.indices.push(currentVertex, nextVertex, topVertex);
                    this.indices.push(currentVertex, topVertex, bottomVertex);
                }
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

    

}
