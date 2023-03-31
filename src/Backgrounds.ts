import { AssetManager } from "./AssetManager";
import { STAGE_WIDTH } from "./Constants";

export class Backgrounds
{
    public static STATE_ACTIVE:number = 0;
    public static STATE_INACTIVE:number = 1;

    public _sprite:createjs.Sprite;
    protected _state:number;
    protected stage:createjs.StageGL;
    protected _speed:number;
    protected _width:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        this.stage = stage;        
        this._speed = 1;
        this._state = Backgrounds.STATE_INACTIVE; 
    }

    // ------------------ gets/sets

    get sprite()
    {
        return this._sprite;
    }

    get state()
    {
        return this._state;
    }
    
    get speed()
    {
        return this._speed;
    }

    set speed(value:number)
    {
        this._speed = value;
    }

    // ------------------ public methods

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
        this.wrapCheck();
    }
}