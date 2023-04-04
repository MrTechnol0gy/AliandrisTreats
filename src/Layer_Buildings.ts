import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";
import { STAGE_WIDTH } from "./Constants";

export class Layer_Buildings extends Backgrounds
{

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("backgrounds", "HighRise");
        stage.addChild(this.sprite);
    }

    // ------------- gets/sets
    get sprite()
    {
        return this._sprite;
    }     

    set id(value:number)
    {
        this._sprite.gotoAndStop("HighRise" + value);
    }

    // ------------- public methods
    protected wrapCheck():void
    {
        if (this._sprite.x < -this._sprite.getBounds().width * 4) //modifed to account for scaled up sprite and misplaced anchor
        {
            this._sprite.x = STAGE_WIDTH; 
        }
    }
    public update():void
    {
        this._sprite.x -= this._speed * 2;
        this.wrapCheck();
    }
}