import { AssetManager } from "./AssetManager";

export class TreatManager
{
    private _treat:number;
    private txtAmount:createjs.BitmapText;
    private txtText:createjs.BitmapText;
    //private _sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager)
    {
        this._treat = 0;
        
        this.txtAmount = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs")); //"glyphs" is the associated ID of the sprites
        this.txtText = new createjs.BitmapText("TREATS:", assetManager.getSpriteSheet("glyphs"));
        this.txtAmount.letterSpacing = 1;
        this.txtAmount.x = 175;
        this.txtAmount.y = 20;
        this.txtText.x = 10;
        this.txtText.y = 20;
        stage.addChild(this.txtAmount);
        stage.addChild(this.txtText);        
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
        this.txtAmount.text = String(this._treat);
    }
}