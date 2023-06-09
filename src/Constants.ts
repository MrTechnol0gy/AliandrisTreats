// game constants
export const STAGE_WIDTH:number = 900;
export const STAGE_HEIGHT:number = 600;
export const FRAME_RATE:number = 30;

export const ASSET_MANIFEST:Object[] = [
    {
        type: "json",
        src: "./lib/spritesheets/Aliandris.json",
        id:"aliandris",
        data:0
    },
    {
        type: "image",
        src: "./lib/spritesheets/Aliandris.png",
        id:"aliandris",
        data:0
    },
    {
        type: "json",
        src: "./lib/spritesheets/Backgrounds.json",
        id:"backgrounds",
        data:0
    },
    {
        type: "image",
        src: "./lib/spritesheets/Backgrounds.png",
        id:"backgrounds",
        data:0
    },
    {
        type: "json",
        src: "./lib/spritesheets/Treat.json",
        id:"treat",
        data:0
    },
    {
        type: "image",
        src: "./lib/spritesheets/Treat.png",
        id:"treat",
        data:0
    },
    {
        type:"json",
        src:"./lib/spritesheets/aliglyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/aliglyphs.png",
        id:"glyphs",
        data:0
    },
    {
        type:"sound",
        src:"./lib/sounds/aliJump.wav",
        id:"aliJump",
        data:1 //number of audio channels/audio 'layer'
    },
    {
        type:"sound",
        src:"./lib/sounds/treatBite.wav",
        id:"treatBite",
        data:1
    },
];