(global as any).p2 = require('p2');
(global as any).PIXI = require('pixi');
(global as any).Phaser = require('phaser');

import { Game } from './game'
import { functions } from "./utils/utils";

let impulseGame: Game;

function initGame() {
    let dprDimensions = functions.getDPRDimensions();
    let gameConfig: Phaser.IGameConfig = {
        width: dprDimensions.width,
        height: dprDimensions.height,
        renderer: Phaser.WEBGL_MULTI,
        parent: '',
        resolution: 1,
        enableDebug: false,
        antialias: true,
        transparent: true
    }

    impulseGame = new Game(gameConfig);
}

//Entry point.
window.onload = () => {
    //Check browser related config here.    
    initGame();
    impulseGame.bootGame();
}
