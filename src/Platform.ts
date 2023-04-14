import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";
import { STAGE_WIDTH } from "./Constants";
import { randomMe } from "./Toolkit";

export class Platform
{    
    public static STATE_ACTIVE:number = 0;
    public static STATE_INACTIVE:number = 1;

    //private property variables
    private _sprite:createjs.Sprite;  
    private _speed:number; 
    private _state:number; 

    //other globals
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        //initialization of properties
        this.stage = stage;  
        this._speed = 1; 
        this._state = Platform.STATE_INACTIVE;     

        this._sprite = assetManager.getSprite("backgrounds", "Platform");

        stage.addChild(this._sprite);
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

    protected wrapCheck():void
    {
        if (this._sprite.x < -this._sprite.getBounds().width)
        {
            this._sprite.x = STAGE_WIDTH;   
            this._sprite.y = randomMe(200,500);       
        }
    }
    protected stateUpdate():void
    {
        if (this._sprite.x > STAGE_WIDTH || this._sprite.x < 0)
        {
            this._state = Backgrounds.STATE_INACTIVE;            
        }
        else
        {
            this._state = Backgrounds.STATE_ACTIVE;            
        }
    }

    public update():void
    {
        this._sprite.x -= this._speed;
        this.stateUpdate();
        this.wrapCheck();
    }
}