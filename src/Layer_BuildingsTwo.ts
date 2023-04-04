import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";
import { STAGE_WIDTH } from "./Constants";

export class Layer_BuildingsTwo extends Backgrounds
{

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("backgrounds", "HighRise_Lit");
        stage.addChild(this.sprite);
    }

    // ------------- gets/sets
    get sprite()
    {
        return this._sprite;
    }   

    // ------------- public methods
    protected wrapCheck():void
    {
        if (this._sprite.x < -this._sprite.getBounds().width / 2)
        {
            this._sprite.x = STAGE_WIDTH; 
        }
    }
    public update():void
    {
        this._sprite.x -= this._speed;
        this.wrapCheck();
    }
}