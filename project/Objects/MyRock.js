import {CGFobject , CGFappearance} from "../../lib/CGF.js";
import { MySphere } from "../GeometricFigures/MySphere.js";

export class MyRock extends CGFobject {
    constructor(scene, size, slices, stacks) {
        super(scene);
        this.size = size;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    setPosition(x,y) 
    {
        this.x = x; 
        this.y = y; 
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const deltaAlpha = Math.PI / this.stacks;
        const deltaTheta = 2 * Math.PI / this.slices;
    
        for (let stack = 0; stack <= this.stacks; stack++) {
            const alpha = stack * deltaAlpha;
            const sinAlpha = Math.sin(alpha);
            const cosAlpha = Math.cos(alpha);
    
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
    
                // Add a random offset to the radius for each vertex
                const sizeOffset = this.size * ((Math.random() - 0.5) / 5);
                const x = (this.size + sizeOffset) * sinAlpha * cosTheta;
                const y = (this.size + sizeOffset) * cosAlpha;
                const z = (this.size + sizeOffset) * sinAlpha * sinTheta;

                const normalX = this.inside ? -x : x;
                const normalY = this.inside ? -y : y;
                const normalZ = this.inside ? -z : z;
    
                const texCoordU = 1 - (slice / this.slices);
                const texCoordV = stack / this.stacks;
    
                this.vertices.push(x, y, z);
                this.normals.push(normalX, normalY, normalZ);
                this.texCoords.push(texCoordU, texCoordV);
            }
        }
    
        for (let stack = 0; stack <= this.stacks; stack++) {
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
    }