import { AssetManager } from "./AssetManager";
import { Platform } from "./Platform";

export class Aliandris
{
    public static STATE_IDLE:number = 0;
    public static STATE_JUMPING:number = 1;
    public static STATE_WALKING:number = 2;
    
    public static LEFT:number = 0;
    public static RIGHT:number = 1;

    private _state:number;
    private _sprite:createjs.Sprite;    
    private platform:Platform[];    
    private isDodging:boolean;
    private _speed:number;
    private _direction:number;
    private _moving:boolean;

    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, platform:Platform[])
    {
        this.stage = stage;
        this.platform = platform;
        this._state = Aliandris.STATE_IDLE;
        this._speed = 1;
        this._moving = false;
        this._direction = Aliandris.RIGHT;

        this._sprite = assetManager.getSprite("aliandris", "Aliandris_Idle", 100, 550);
        this._sprite.play();

        stage.addChild(this._sprite);
    }
    // ---------- gets/sets
    get sprite()
    {
        return this._sprite;
    }

    get state()
    {
        return this._state;
    }

    set speed(value:number) 
    {
        this._speed = value;
    }

    get moving() 
    {
        return this._moving;   
    }

    get speed() 
    {
        return this._speed;
    }

    set state(value:number)
    {
        this._state = value;
    }

    set direction(value:number) 
    {
        this._direction = value;        
        if (this._direction == Aliandris.RIGHT) 
        {
            this._sprite.scaleX = 1;
        }         
        else if (this._direction == Aliandris.LEFT) 
        {
            this._sprite.scaleX = -1;
        }         
    }

    get direction() 
    {
        return this._direction;
    }

    // --------- public methods
    public startMe():void
    {
        if (this._state == Aliandris.STATE_IDLE)
        {
            this._state = Aliandris.STATE_WALKING;
            this._moving = true;
            //action goes here OR DOES IT
        }
    }
    public jumpMe():void
    {
        if (this._state == Aliandris.STATE_WALKING || this._state == Aliandris.STATE_IDLE)
        {
            this._state = Aliandris.STATE_JUMPING
            this._moving = true;
        }
    }

    public stopMe():void
    {
        if (this._state == Aliandris.STATE_JUMPING)
        {
            this._state = Aliandris.STATE_IDLE;
            this._moving = false;
        }
    }

    public positionMe(x:number, y:number):void 
    {
        this._sprite.x = x;
        this._sprite.y = y;
    }

    public resetMe():void
    {
        this._state = Aliandris.STATE_IDLE;
        this.stage.addChild(this._sprite);
        this._sprite.x = 50;
        this._sprite.y = 550;
        this._sprite.gotoAndPlay("Aliandris_Idle");        
    }

    public update():void
    {
        if (this._state == Aliandris.STATE_IDLE)
        {
            this._sprite.gotoAndPlay("Aliandris_Idle");
        }
        else if (this._state == Aliandris.STATE_WALKING)
        {
            this._sprite.gotoAndPlay("Aliandris_Walk");
        }
        else if (this._state == Aliandris.STATE_JUMPING)
        {
            this._sprite.gotoAndPlay("Aliandris_Jump");
        }
    }
}