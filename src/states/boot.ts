
import * as Utils from '../utils/utils'

export class Boot extends Phaser.State {


    /**
     * Typically you wound want to preload assets in an independent state that follows booting.
     * 
     * @memberof Boot
     */
    public preload(): void {
    }

    /**
     * Use this to set global properties such as resolution, aspect ratio, et cetera.
     * 
     * 
     * @memberOf Boot
     */
    public create(): void {

        this.time.desiredFps = 60;
        this.time.physicsElapsed = 1 / this.time.desiredFps;

        this.input.maxPointers = 1; //multi-touch needed?
        this.stage.disableVisibilityChange = true;

        //Center aligned for devices with aspect ratios.
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        if (this.game.device.desktop) {
            //Desktop settings
        }
        else {
            this.game.scale.forceOrientation(true, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        }
        if (DEBUG) {
            console.log("Done booting up!");
            console.log("Revision : " + GIT_REVISION);
        }
        this.game.state.start(Utils.State.Preload);
    }
}
