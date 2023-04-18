import { Aliandris } from "./Aliandris";
import { AssetManager } from "./AssetManager";
import { STAGE_WIDTH } from "./Constants";
import { randomMe } from "./Toolkit";
import { boxHit } from "./Toolkit";

export class Treat
{    
    public static STATE_ACTIVE:number = 0;
    public static STATE_INACTIVE:number = 1;
    public static STATE_COLLECTED:number = 2;

    //private property variables
    private _sprite:createjs.Sprite;  
    private _speed:number; 
    private _state:number; 
    private aliandris:Aliandris;

    private collected:createjs.Event //step one for creating a custom collection event

    //other globals
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, aliandris:Aliandris)
    {
        //initialization of properties
        this.stage = stage;
        this._speed = 1;
        this._state = Treat.STATE_INACTIVE;
        this.aliandris = aliandris;

        this._sprite = assetManager.getSprite("treat", "PickUp");

        stage.addChild(this._sprite);

        this.collected = new createjs.Event("collected", true, false); // step two for creating a custom event
    }
    // ---------- gets/sets
    get sprite()
    {
        return this._sprite;
    }
    get speed()
    {
        return this._speed;
    }

    set speed(value:number)
    {
        this._speed = value;
    }

    public positionMe(x:number, y:number):void 
    {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public startMe():void
    {
        createjs.Tween.get(this._sprite, {bounce:true, loop: -1, useTicks:true}).to({y:this._sprite.y+25}, 100, createjs.Ease.backInOut);        
    }

    protected wrapCheck():void
    {
        if (this._sprite.x < -this._sprite.getBounds().width)
        {
            this._sprite.x = STAGE_WIDTH;   
            this._sprite.y = randomMe(200,500);  
            this.startMe();     
        }
    }
    protected stateUpdate():void
    {
        if (this._sprite.x > STAGE_WIDTH || this._sprite.x < 0)
        {
            this._state = Treat.STATE_INACTIVE;            
        }
        else
        {
            this._state = Treat.STATE_ACTIVE;            
        }
    }

    private collectedMe():void
    {
        if (this._state == Treat.STATE_ACTIVE)
        {
            this._sprite.dispatchEvent(this.collected); //step three for custom collection event
            this._state = Treat.STATE_COLLECTED;
            createjs.Sound.play("treatBite");
            this.stage.removeChild(this._sprite);
            //this._sprite.removeEventListener;
        }
    }

    public update():void
    {
        this._sprite.x -= this._speed;
        this.stateUpdate();
        this.wrapCheck();
        if (this._state == Treat.STATE_ACTIVE && boxHit(this._sprite, this.aliandris.sprite))
        {
            this.collectedMe();
        }
        if (this._sprite.x > STAGE_WIDTH || this._sprite.x < 0)
        {
            this._state = Treat.STATE_INACTIVE;            
        }
        else
        {
            this._state = Treat.STATE_ACTIVE;            
        }
    }
}