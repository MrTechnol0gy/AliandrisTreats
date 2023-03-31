import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";

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
    
}