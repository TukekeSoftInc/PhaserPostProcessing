
import { Game } from '../game'
import * as Utils from '../utils/utils'
import { GRenderer } from "../renderer/gRenderer";


export class Play extends Phaser.State {

    /**
     * Creates an instance of Play.
     * @param {Game} game 
     * @memberof Play
     */
    constructor(game: Game) {
        super();
        this.mGame = game;
    }

    /**
     * Initialize utility variables. Preload required assets.
     * 
     * @memberof Play
     */
    public preload(): void {
        this.mWorldBoundHorizontalSpan = Utils.deviceConfig.worldBoundHorizontalSpan();
        this.mWorldBoundVerticalSpan = Utils.deviceConfig.worldBoundVerticalSpan();
    }

    /**
     * Create your initail gameplay state.
     * 
     * @memberof Play
     */
    public create(): void {

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 770 * Utils.deviceConfig.scaleFactor();
        this.game.physics.p2.restitution = 0.2;
        this.game.physics.p2.friction = 5;
        this.game.input.enabled = true;

        //this.time.desiredFps = 60;
        //this.time.physicsElapsed = 1 / this.time.desiredFps;
        //this.game.physics.p2.frameRate = 1 / 60;
        this.game.physics.p2.useElapsedTime = true;

        this.game.clearBeforeRender = false;
        this.game.lockRender = true;

        if (!window.document.getElementById("fpsText").hasChildNodes()) {
            this.mFpsText = window.document.createTextNode("");
            window.document.getElementById("fpsText").appendChild(this.mFpsText);
        }
        else this.mFpsText = window.document.getElementById("fpsText").firstChild as Text;
        this.mFps = 0;

        window.document.getElementById('versionText').textContent = "git_r:"+GIT_REVISION;
        this.game.clearBeforeRender = false;

        this.mHalfUpdateTimer = this.game.time.create(true);
        this.mHalfUpdateTimer.loop(0.5 * Phaser.Timer.SECOND, this.updateHalfSecond, this);
        this.mHalfUpdateTimer.start();

        (<HTMLBodyElement>window.document.getElementById("body")).style.backgroundColor = '#ffedbd';

        this.mSprite = this.game.add.sprite(
            Utils.deviceConfig.worldBoundHorizontalSpan() * 0.5,
            Utils.deviceConfig.worldBoundVerticalSpan() * 0.5,
            'phaserLogo');
        this.mSprite.anchor.setTo(0.5, 0.5);
        this.mSprite.scale.setTo(Utils.deviceConfig.scaleFactor() * 0.7, Utils.deviceConfig.scaleFactor() * 0.7);
        this.game.stage.addChild(this.mSprite);

        this.mSpriteTween = this.game.add.tween(this.mSprite.position).to(
            { y: Utils.deviceConfig.worldBoundVerticalSpan() * 0.45 },
            1000,
            Phaser.Easing.Back.Out, true, 1000, -1);

        this.mSpriteTween.yoyo(true, 1500);

        this.gRenderer = new GRenderer(this.game);
        this.gRenderer.useProgram();
        this.gRenderer.addPostProcessingQuad();
        this.gRenderer.restoreProgram();
        this.game.lockRender = false;
    }


    /**
     * Don't do too much here!
     * 
     * @memberof Play
     */
    public update(): void {
        //let current = 1000 / this.game.time.elapsedMS;
        //this.mFps = (this.mFps * 0.9) + (current * (1.0 - 0.9))
        // ==>
        this.mFps = (this.mFps * 0.9) + (100 / this.game.time.elapsedMS)
    }


    /**
     * Cleanup.
     * 
     * @memberof Play
     */
    public shutdown(): void {

        if (this.mHalfUpdateTimer) {
            this.mHalfUpdateTimer.destroy();
            this.mHalfUpdateTimer = null;
        }
        if (this.gRenderer) {
            this.gRenderer.shutdown();
        }
        if (this.mSprite) {
            this.mSprite.destroy();
            this.mSprite = null;
        }
        if (this.mSpriteTween) {
            this.mSpriteTween.stop();
            this.mSpriteTween = null;
        }
        this.stage.removeChildren();
        this.stage.addChild(this.game.world);
        this.stage.addChild(this.camera.fx);
    }

    /**
     * Render!
     * 
     * @memberof Play
     */
    public render() {
        this.gRenderer.useProgram();
        this.gRenderer.render();
        this.gRenderer.restoreProgram();
    }

    /**
     * Periodic tasks that don't need to be real time.
     * 
     * @memberof Play
     */
    public updateHalfSecond() {
        this.mFpsText.nodeValue = this.mFps.toFixed(0);
    }


    private mGame: Game;
    private gRenderer: GRenderer;

    private mWorldBoundHorizontalSpan: number;
    private mWorldBoundVerticalSpan: number;

    private mSprite: Phaser.Sprite;
    private mSpriteTween: Phaser.Tween;

    private mHalfUpdateTimer: Phaser.Timer;
    private mFpsText: Text;
    private mFps: number;
}