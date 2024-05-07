import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./GeometricFigures/MySphere.js";
import { MyFlower } from "./Objects/MyFlower.js";
import { MyGarden } from "./Objects/MyGarden.js";

import { MyPanoram } from "./Objects/MyPanoram.js";
import { MyCilinder } from "./GeometricFigures/MyCilinder.js";
import { MyCone } from "./GeometricFigures/MyCone.js";
import { MyRock } from "./Objects/MyRock.js"; 
import { MyRockSet } from "./Objects/MyRockSet.js";
import { MyBee } from "./Objects/MyBee.js";
import { MySteam } from "./Objects/MySteam.js";
import { MyHive } from "./Objects/MyHive.js";
import { MyPollen } from "./Objects/MyPollen.js";
import {  MyGrass } from "./Objects/MyGrass.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    
  }
  init(application) {
    super.init(application);

    
    this.initCameras();
    this.initLights();
    this.initTextures();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.start = null; 
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this,32,16,0.1);
    this.flower =  new MyFlower(this,4,3);
    this.garden = new MyGarden(this, 2, 2);
    this.rock = new MyRock(this, 1, 32, 16); 
    this.rockSet = new MyRockSet(this, 10, 32, 16);
    this.bee = new MyBee(this,0,10,0);
    this.stem = new MySteam(this, 0.1, 0.1, 0.1, 10, [1, 1, 1, 1, 1]);
    this.hive = new MyHive(this,0,0);
    this.grass = new MyGrass(this, 0, 0, 0, 1, 0);
    this.pollen = new MyPollen(this);
    this.pollenPos = []; 
    this.posFlowers = [];


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.windFactor = 0; 
    this.scaleFactor = 1;
    this.displaySphere = true; 
    this.displayPanoram = true;
    this.speedFactor = 0.1;
    this.scaleFactor = 1; 

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.setUpdatePeriod(1000 / 100);

    this.start = Date.now(); 
  }
  update(t) {
    this.checkKeys();
    this.bee.move(this.scaleFactor);

    this.bee.update(t);
    this.bee.updateWings(t);
    // this.grass.update(time);

      if(this.bee.moving && this.bee.down) 
      {
        this.checkRadius();
      }
  }

  checkRadius() {
    for (let i = 0; i < this.posFlowers.length; i++) {
        let flowerX = this.posFlowers[i][0];
        let flowerZ = this.posFlowers[i][1]; 
        let flowerY = this.posFlowers[i][2];

        let distance = Math.sqrt(
            Math.pow(this.bee.x - flowerX, 2) + 
            Math.pow(this.bee.z - flowerZ, 2) +
            Math.pow(this.bee.y - flowerY, 2)
        );
        if (distance < 2) { 
          this.bee.animation = false; 
          this.bee.targetPos = [flowerX, flowerY + 0.5, flowerZ]
        }
    }
}


  checkKeys() 
  {
    var text="Keys pressed: "; 
    var keysPressed = false;
    if(this.gui.isKeyPressed("KeyR")) 
    {
      text+=" R"
      this.bee.animation = true; 
      this.bee.reset(); 
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.bee.accelerateX(1);
      this.bee.moving = true; 
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      this.bee.orientation += 0.1; 
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S "; 
      //this.bee.slow = true; 
      if(this.speedFactor > 0)
        {
          this.bee.accelerateX(-1);
        }
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      this.bee.orientation -= 0.1; 
      text+=" D "; 
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyF"))
    {
        text+=" F ";
        this.bee.down = true; 
        this.bee.up = false;
        keysPressed = true;
        this.bee.accelerateY(-1);
    }
    if(this.gui.isKeyPressed("KeyP"))
    {
      text+=" P "; 
      this.bee.down = false;
      this.bee.moving = true; 
      this.bee.up = true;  
      //check if the position of the bee is close to a polen
      let pollenX = 0; 
      let pollenY = 0; 
      let pollenZ = 0; 
      this.bee.accelerateY(1);
      for(let i = 0; i < this.pollenPos.length; i++) 
      {
        
        pollenX = this.pollenPos[i][0]; 
        pollenY = this.pollenPos[i][1]; 
        pollenZ = this.pollenPos[i][2]; 
        let distance = Math.sqrt
        (
          Math.pow(this.bee.x - pollenX, 2) + 
          Math.pow(this.bee.y - pollenY, 2) + 
          Math.pow(this.bee.z - pollenZ, 2)
        );
        if(distance < 1.1) 
        {
          this.bee.animation = true; 
          this.bee.transport = true;
          this.bee.handle(this.pollenPos[i]);
        }

      }         
    }
    if(this.gui.isKeyPressed("KeyO"))
    {
      if(this.bee.transport) 
      {
        this.bee.targetPos = [0,0,0];
      }
    }
    if (keysPressed) {
      console.log(text);
    }
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  initTextures()
  {
    this.panoramTexture = new CGFtexture(this, "images/panorama4.jpg"); 
    this.panoram = new MyPanoram(this,this.panoramTexture);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.sphereTexture = new CGFtexture(this, "images/earth.jpg");
    this.sphereAppearance = new CGFappearance(this);
    this.sphereAppearance.setTexture(this.sphereTexture);
    this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.rockTexture = new CGFtexture(this, "images/rock.jpg");
    this.rockAppearance = new CGFappearance(this);
    this.rockAppearance.setTexture(this.rockTexture);

    
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.update();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    // ---- BEGIN Primitive drawing section

    // this.pushMatrix();
    // this.hive.display();
    // this.popMatrix();

   
    // this.pushMatrix();
    // this.appearance.apply();
    // this.translate(0,-100,0);
    // this.scale(400,400,400);
    // this.rotate(-Math.PI/2.0,1,0,0);
    // this.plane.display();
    // this.popMatrix();

    // this.pushMatrix();
    // this.translate(0,0,0);
    // this.rockTexture.bind();
    // this.rockSet.display();
    // this.popMatrix();

    // this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
    // this.gl.enable(this.gl.BLEND)
    // this.pushMatrix(); 
    // this.flower.setPosition(50,50);
    // this.flower.display();
    // this.popMatrix();
    
   
   



    
    this.pushMatrix();
    this.posFlowers = this.garden.display();
    this.popMatrix();
    this.pushMatrix();
    this.pollenPos = this.bee.calculateInitialPolenPositions(this.posFlowers);
    this.bee.displayPolen();
    this.popMatrix();
    //console.log("The value of the pollenPos is " + this.pollenPos);    

    // this.pushMatrix(); 
    // this.stem.display();
    // this.popMatrix();
 

    if(this.displayPanoram) {
      this.sphere = new MySphere(this,200, 200, true,200);
      this.panoram.display();
    } else {
        this.sphere = new MySphere(this,200, 200, false,10);
    }

    if(this.displaySphere){
        this.pushMatrix();
        this.sphereAppearance.apply();
        this.sphere.display();
        this.popMatrix();
    }
    // ---- END Primitive drawing section
  }
  
    
}
