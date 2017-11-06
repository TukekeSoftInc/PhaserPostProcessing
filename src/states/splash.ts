
import * as Utils from '../utils/utils'

/**
 * Branding stub.
 * 
 * @export
 * @class Splash
 * @extends {Phaser.State}
 */
export class Splash extends Phaser.State {

    /**
     * Creates an instance of Splash.
     * @memberof Splash
     */
    constructor() {
        super();
    }

    /**
     * Some fancy branding here :)
     * 
     * @memberof Splash
     */
    public create(): void {
        this.mStartSprite = this.game.add.sprite(
            Utils.deviceConfig.worldBoundHorizontalSpan() * 0.5,
            Utils.deviceConfig.worldBoundVerticalSpan() * 0.5
            , 'phaserLogo');
        this.mStartSprite.anchor.setTo(0.5, 0.5);
        this.mStartSprite.scale.setTo(Utils.deviceConfig.scaleFactor() * 0.5, Utils.deviceConfig.scaleFactor() * 0.5);
        this.game.stage.addChild(this.mStartSprite);
        //Branding goes here...
        this.state.start(Utils.State.Play);
    }

    /**
     * Cleanup.
     * 
     * @memberof Splash
     */
    public shutdown() {
        this.mStartSprite.destroy();
        this.mStartSprite = null;
    }

    private mStartSprite: Phaser.Sprite;

}