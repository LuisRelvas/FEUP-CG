import {CGFobject} from '../../lib/CGF.js';
/**
 * MyBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBlade extends CGFobject {
	constructor(scene) {
        super(scene);
        this.randomScaleX = Math.random() * 2 + 0.2;  
        this.randomRotation = Math.random() * Math.PI;  
        this.randomTranslation = Math.random() * 5;
        this.triangleNumber = 0;
        this.initBuffers();
    }
    
    initBuffers() {
        // Calculate the maximum y-coordinate
        let maxY = Math.max(0.5, 1);
    
        this.vertices = [
            -0.1 * this.randomScaleX, 0 / maxY, 0,
            0, 0.5 / maxY, 0,   
            0.1 * this.randomScaleX, 0 / maxY, 0,  
    
            -0.1 * this.randomScaleX, 0 / maxY, 0,  
            0, 0.5 / maxY, 0,   
            0, 0 / maxY, 0,    
    
            0, 0 / maxY, 0,     
            0, 0.5 / maxY, 0,   
            0.1 * this.randomScaleX, 0 / maxY, 0,   
    
            -0.1 * this.randomScaleX, 0 / maxY, 0,  
            0, 1 / maxY, 0,     
            0.1 * this.randomScaleX, 0 / maxY, 0    
        ];
        
        this.indices = [
            0, 1, 2,  
            3, 4, 5,  
            6, 7, 8,  
            9, 10, 11,

            2,1 ,0,
            5,4,3,
            8,7,6,
            11,10,9
        ];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	setTexCoords() {
		this.texCoords = [
			0, 0,
			1, 0,
			0.5, 1
		];
		this.updateTexCoordsGLBuffers();
	}

    setFillMode() { 
        this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    }
    
    setLineMode() 
    { 
        this.primitiveType=this.scene.gl.LINES;
    }
}

