import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../GeometricFigures/MySphere.js';
import { MyQuad } from '../GeometricFigures/MyQuad.js';
import { MyTriangle } from '../GeometricFigures/MyTriangle.js';

export class MyHive extends CGFobject{
    constructor(scene,x,y) {
        super(scene); 
        this.sphere = new MySphere(this.scene, 32, 16, false, 0.1);
        this.triangle = new MyTriangle(this.scene);
        this.quad = new MyQuad(this.scene);
        this.x = x; 
        this.y = y; 
        this.initMaterials(); 
    }
    initMaterials() 
    {
        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveTexture = new CGFtexture(this.scene, "/project/images/hive_texture.jpg");
        this.hiveMaterial.setTexture(this.hiveTexture);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.telhadoMaterial = new CGFappearance(this.scene);
        this.telhadoTexture = new CGFtexture(this.scene, "/project/images/telhado_texture.jpg");
        this.telhadoMaterial.setTexture(this.telhadoTexture);
        this.telhadoMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    display() 
    {
        //tampa inferior 
        this.scene.pushMatrix(); 
        this.hiveMaterial.apply();
        this.scene.translate(this.x,this.y,0);
        this.scene.pushMatrix();
        this.scene.scale(2,1,2); 
        this.quad.display();
        this.scene.popMatrix();

        //tampa lateral 
        this.scene.pushMatrix();
        this.hiveMaterial.apply(); 
        this.scene.rotate(90 * Math.PI / 180 , 1,0,0);
        this.scene.scale(2,1,2); 
        this.scene.translate(0,-1,-0.5);
        this.quad.display();
        this.scene.popMatrix();


        //tampa lateral 
        this.scene.pushMatrix(); 
        this.hiveMaterial.apply();
        this.scene.rotate(90 * Math.PI / 180 , 1,0,0);
        this.scene.scale(2,1,2); 
        this.scene.translate(0,1,-0.5);
        this.quad.display();
        this.scene.popMatrix();

        //tampa do fundo
        this.scene.pushMatrix(); 
        this.hiveMaterial.apply();
        this.scene.rotate(90 * Math.PI / 180 , 0,0,1);
        this.scene.scale(2,1,2);
        this.scene.translate(0.5,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //tampa superior
        this.scene.pushMatrix(); 
        this.hiveMaterial.apply();
        this.scene.scale(2,1,2);
        this.scene.translate(0,2,0); 
        this.quad.display();
        this.scene.popMatrix();

        //telhado
        this.scene.pushMatrix(); 
        this.telhadoMaterial.apply();
        this.scene.translate(0,2,1);
        this.scene.rotate(45 * Math.PI / 180 , 1, 0, 0);
        this.scene.scale(2,1,1.41); 
        this.scene.translate(0,0,-0.5);
        this.quad.display();
        this.scene.popMatrix();

        //telhado
        this.scene.pushMatrix(); 
        this.telhadoMaterial.apply();
        this.scene.translate(0,2,-1);
        this.scene.rotate(-45 * Math.PI / 180 , 1, 0, 0);
        this.scene.scale(2,1,1.41); 
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        //Triangle para o telhado 
        this.scene.pushMatrix(); 
        this.telhadoMaterial.apply();
        this.scene.translate(1,2,0);
        this.scene.rotate(90 * Math.PI / 180 , 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); 
        this.telhadoMaterial.apply();
        this.scene.translate(-1,2,0);
        this.scene.rotate(90 * Math.PI / 180 , 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}