
import * as Utils from '../utils/utils'
import { Game } from '../game'

/**
 * Preload needed assets here.
 * 
 * @export
 * @class Preloader
 * @extends {Phaser.State}
 */
export class Preloader extends Phaser.State {

    /**
     * Creates an instance of Preloader.
     * @param {Game} game 
     * @memberof Preloader
     */
    constructor(game: Game) {
        super();
        this.mGame = game;
    }

    /**
     * Preload assets here.
     * 
     * @memberof Preloader
     */
    public preload(): void {
        this.game.load.image('phaserLogo', './assets/phaserLogo.png');
    }

    /**
     * Show progress and move on.
     * 
     * @memberof Preloader
     */
    public create(): void {

        this.mGame.setGameLoadingProgress(0);
        /*
        ..load and configure
        */
        Utils.deviceConfig.init();
        let webGLRenderer = this.game.renderer as PIXI.WebGLRenderer;
        if (webGLRenderer) {
            webGLRenderer.setTexturePriority(['phaserLogo']);
        }
        this.mGame.setGameLoadingProgress(85);
        this.state.start(Utils.State.Splash);
    }

    private mGame: Game;
}