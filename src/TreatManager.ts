import { AssetManager } from "./AssetManager";

export class TreatManager
{
    private _treat:number;
    private txtAmount:createjs.BitmapText;
    private txtText:string;
    //private _sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        this._treat = 0;
        this.txtText = "TREATS:";

        //this._sprite = assetManager.getSprite("sprites", "Scoretxt", 50, 362);
        this.txtAmount = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs")); //"glyphs" is the associated ID of the sprites
        this.txtAmount.letterSpacing = 1;
        this.txtAmount.x = 90;
        this.txtAmount.y = 310;
        stage.addChild(this.txtAmount);
        //stage.addChild(this._sprite);
    }

    get score()
    {
        return this._treat;
    }

    public resetMe():void
    {
        this._treat = 0;
        this.txtAmount.text = String(this._treat);
    }

    public incrementAmount():void
    {
        //createjs.Sound.play("scoreUp");
        this._treat++;
        console.log("Score is " + this._treat);
        this.txtAmount.text = String(this.txtText + this._treat);
    }
}