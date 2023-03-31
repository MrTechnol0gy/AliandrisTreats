import { AssetManager } from "./AssetManager";
import { Backgrounds } from "./Backgrounds";

export class Layer_Road extends Backgrounds
{

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("backgrounds", "Road");
        stage.addChild(this.sprite);
    }

    // ------------- gets/sets
    get sprite()
    {
        return this._sprite;
    }     

    // ------------- public methods
    
}