import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";

export class Layer_Foreground extends Backgrounds
{

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("backgrounds", "Fence");
        stage.addChild(this.sprite);
    }

    // ------------- gets/sets
    get sprite()
    {
        return this._sprite;
    }     

    // ------------- public methods
    
}