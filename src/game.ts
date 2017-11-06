(global as any).p2 = require('p2');
(global as any).PIXI = require('pixi');
(global as any).Phaser = require('phaser');

import { Boot } from './states/boot'
import { Preloader } from './states/preloader'
import { Splash } from './states/splash'
import { Play } from './states/play'
import { GameOver } from './states/gameOver'

import * as Utils from './utils/utils'


export class Game extends Phaser.Game {

    /**
     * Creates an instance of Game.
     * @param {Phaser.IGameConfig} config 
     * 
     * @memberOf Game
     */
    constructor(config: Phaser.IGameConfig) {
        super(config);

        //Add states
        this.state.add(Utils.State.Boot, new Boot(), false);
        this.state.add(Utils.State.Preload, new Preloader(this), false);
        this.state.add(Utils.State.Splash, new Splash(), false);
        this.state.add(Utils.State.Play, new Play(this), false);
        this.state.add(Utils.State.GameOver, new GameOver(), false);
    }

    /**
     * Boots game by starting the boot state.
     * 
     * @memberOf Game
     */
    public bootGame(): void {
        //Boot
        this.state.start(Utils.State.Boot);
    }

    /**
     * Stub.
     * 
     * @param {number} progress - Goes from 0 to 100.
     * 
     * @memberOf Game
     */
    public setGameLoadingProgress(progress: number) {
    }

 
    /**
     * Stub. Use to return back control to the parent webview.
     * 
     * 
     * @memberOf Game
     */
    public end(): void {
    }

    /**
     * Stub. Restart play state.
     * 
     * 
     * @memberOf Game
     */
    public restart(): void {
    }

}