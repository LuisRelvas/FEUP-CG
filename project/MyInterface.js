import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'lockBee').name('Lock Camera on Bee');


        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.gui.add(this.scene, 'rockScaleFactor', 0.5, 3).name('Rock Scale Factor');

        this.gui.add(this.scene, 'windFactor', 0, 1).name('Wind Factor');   


        //Checkbox to control the Sphere Visibility
        this.gui.add(this.scene,'displaySphere').name('Sphere Visibility');

        //Checkbox to control the Panoram Visibility
        this.gui.add(this.scene, 'displayPanoram').name('Inside Visibility');

        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');  

        this.gui.add(this.scene, 'displayFlowers').name('Display Flowers');

        this.gui.add(this.scene, 'displayHive').name('Display Hive');

        this.gui.add(this.scene, 'displayBee').name('Display Bee');

        this.initKeys();
    }
    initKeys() 
    {
        this.scene.gui = this; 
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }
    processKeyDown(event) 
    {
        this.activeKeys[event.code] = true;
    }; 
    processKeyUp(event) 
    {
        this.activeKeys[event.code] = false;
    };
    isKeyPressed(keyCode) 
    {
        return this.activeKeys[keyCode] || false;
    }
}