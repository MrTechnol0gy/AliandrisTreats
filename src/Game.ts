// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";
import { Layer_Buildings } from "./Layer_Buildings";
import { Layer_Clouds } from "./Layer_Clouds";
import { Layer_Forest } from "./Layer_Forest";
import { Layer_Foreground } from "./Layer_Foreground";
import { Layer_Road } from "./Layer_Road";
import { randomMe } from "./Toolkit";
import { Layer_BuildingsTwo } from "./Layer_BuildingsTwo";
import { Platform } from "./Platform";
import { Aliandris } from "./Aliandris";

// game setup variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// game object variables
let backgrounds:Backgrounds;
let buildings:Layer_Buildings[];
let buildingsTwo:Layer_BuildingsTwo[];
let clouds:Layer_Clouds[];
let forest:Layer_Forest[];
let foreground:Layer_Foreground[];
let road:Layer_Road[];
let platform:Platform[];
let aliandris:Aliandris;

// key booleans
let leftKey:boolean = false;
let rightKey:boolean = false;
let jumpKey:boolean = false;

// current score/pickups
let score:number;

let speed:number;

// --------------------------------------------------- private methods
function monitorKeys():void 
{
    if (leftKey) 
    {
        //console.log("go left");
        aliandris.direction = Aliandris.LEFT;
        aliandris.startMe();
    } 
    else if (rightKey) 
    {
        aliandris.direction = Aliandris.RIGHT;
        aliandris.startMe();
    } 
    else if (jumpKey)
    {
        aliandris.jumpMe();
    }
    else 
    {
        aliandris.stopMe();
    }
}

// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> all assets loaded – ready to add sprites to game");

    buildings = [];
    buildingsTwo = [];
    forest = [];
    foreground = [];
    clouds = [];
    road = [];
    platform = [];
    
    // construct game objects here
    backgrounds = new Backgrounds(stage, assetManager)

    for (let n:number = 0; n < 5; n++)
    {
        forest[n] = new Layer_Forest(stage, assetManager);
        forest[n].positionMe(0 + (n * 300), 600);
    }

    for (let n:number = 0; n < 6; n++)
    {
        clouds[n] = new Layer_Clouds(stage, assetManager);
        clouds[n].positionMe(0 + (n * 200), randomMe(50, 220)); 
    }

    for (let n:number = 0; n < 6; n++)
    {
        buildingsTwo[n] = new Layer_BuildingsTwo(stage, assetManager);
        buildingsTwo[n].positionMe(0 + (n * 150), 540);               
    }

    for (let n:number = 0; n < 4; n++)
    {
        buildings[n] = new Layer_Buildings(stage, assetManager);
        buildings[n].positionMe(0 + (n * 300), 540);
        buildings[n]._sprite.scaleX = 2;
        buildings[n]._sprite.scaleY = 2;
        buildings[n].id = n;
    }

    for (let n:number = 0; n < 5; n++)
    {
        road[n] = new Layer_Road(stage, assetManager);
        road[n].positionMe(0 + (n * 300), 600); 
    }

    aliandris = new Aliandris(stage, assetManager, platform);

    for (let n:number = 0; n < 10; n++)
    {
        foreground[n] = new Layer_Foreground(stage, assetManager);
        foreground[n].positionMe(0 + (n * 100), 600);
    }

    for (let n:number = 0; n < 3; n++)
    {
        platform[n] = new Platform(stage, assetManager);
        platform[n].positionMe(0 + (n * randomMe(175,600)), randomMe(300,550));
    }

    // event listeners for keyboard keys
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onKeyDown(e:KeyboardEvent):void {
    if (e.key == "ArrowLeft") 
    {
        leftKey = true;
    }
    else if (e.key == "ArrowRight")
    {
        rightKey = true;
    }
    if (e.key == " ")
    {
        jumpKey = true;
    }
}

function onKeyUp(e:KeyboardEvent):void {
    if (e.key == "ArrowLeft") 
    {
        leftKey = false;
    }
    else if (e.key == "ArrowRight")
    {
        rightKey = false;
    }
    if (e.key == " ")
    {
        jumpKey = false;
    }
}

function onTick(e:createjs.Event) {
    // displaying frames per second - comment this out when game is published
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    monitorKeys();

    speed = aliandris.speed;
    
    for (let n:number = 0; n < 6; n++)
    {
        clouds[n].speed = speed;
        clouds[n].update();
    }
    for (let n:number = 0; n < 4; n++)
    {
        forest[n].speed = speed;
        forest[n].update();
    }
    for (let n:number = 0; n < 6; n++)
    {
        buildingsTwo[n].speed = speed;
        buildingsTwo[n].update();
    }
    for (let n:number = 0; n < 3; n++)
    {
        buildings[n].speed = speed;
        buildings[n].update();
    }
    for (let n:number = 0; n < 4; n++)
    {
        road[n].speed = speed;
        road[n].update();
    }
    for (let n:number = 0; n < 10; n++)
    {
        foreground[n].speed = speed;
        foreground[n].update();
    }
    for (let n:number = 0; n < 3; n++)
    {
        platform[n].speed = speed;
        platform[n].update();
    }
    aliandris.update();
    
    // update the stage
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> game initialization");
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();