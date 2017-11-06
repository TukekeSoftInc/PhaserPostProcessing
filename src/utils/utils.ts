
/**
 * Used as an enum for state names (Phaser likes to use strings for referencing states :/ ).
 * 
 * @export
 * @class State
 */
export class State {
    public static Boot: string = 'Boot';
    public static Preload: string = 'Preload';
    public static Splash: string = 'Splash';
    public static Play: string = 'Play';
    public static GameOver: string = "GameOver";
}

/**
 * Provides device data.
 * 
 * @export
 * @class deviceConfig
 */
export class deviceConfig {
    public static init() {
        //primary resolution    
        this.primaryWidth = 720;
        this.primaryHeight = 1280;
        if (window.innerWidth > window.innerHeight) {
            //Landscape
            this.primaryWidth = 1280;
            this.primaryHeight = 720;
        }

        //device resolution
        let dprDimensions = functions.getDPRDimensions();
        let deviceWidth = dprDimensions.width;
        let deviceHeight = dprDimensions.height;
        this.mScaleFactor = deviceWidth / this.primaryWidth;
        this.idealHeight = (this.primaryHeight / this.primaryWidth) * deviceWidth;

        this.mWorldBoundHorizontalSpan = deviceWidth;
        this.mWorldBoundVerticalSpan = deviceHeight;
    }

    public static scaleFactor(): number {
        return this.mScaleFactor;
    }

    public static worldBoundHorizontalSpan(): number {
        return this.mWorldBoundHorizontalSpan;
    }
    public static worldBoundVerticalSpan(): number {
        return this.mWorldBoundVerticalSpan;
    }

    private static mScaleFactor: number;
    public static idealHeight: number;
    public static primaryWidth: number;
    public static primaryHeight: number;
    private static mWorldBoundHorizontalSpan;
    private static mWorldBoundVerticalSpan;

}

//Some functions that I use often.
export namespace functions {
    export function formatTime(milliseconds): string {
        let seconds = Math.floor((milliseconds / 1000) % 60);
        let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        let minuteString = "";
        if (minutes > 0) {
            minuteString = ("0" + minutes.toString()).substr(-2) + ":";
        }
        return minuteString + ("0" + seconds.toString()).substr(-2) + "." + ("0" + milliseconds.toString()).substr(-3);
    }

    export function getDPRDimensions() {
        let width = window.innerWidth * window.devicePixelRatio;
        let height = window.innerHeight * window.devicePixelRatio;
        if (width < 2048 && height < 2048) {
            //alert("Dimensitons under limit!");
        }
        else if (width > 2048) {
            //alert("width exceeds limit!");
            let maxRatio = 2048 / window.innerWidth;
            width = window.innerWidth * maxRatio;
            height = window.innerHeight * maxRatio;
        }
        else {          // height > 2048
            //alert("height exceeds limit!");
            let maxRatio = 2048 / window.innerHeight;
            width = window.innerWidth * maxRatio;
            height = window.innerHeight * maxRatio;
        }
        return { width, height };
    }

    //cosine interpolation
    export function Interpolate(pa, pb, px) {
        let f = (1 - Math.cos(px * Math.PI)) * 0.5;
        return pa * (1 - f) + pb * f;
    }
    //linear interpolation
    export function lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }

    //sigmoid
    export function smoothStep(y0, y1, t) {
        return lerp(y0, y1, (t * t) * (3 - 2 * t));
    }

    export function transformed(x: number, y: number, cx: number, cy: number, slope: number) {
        let nx = x - cx;
        let ny = y - cy;
        let tx = nx * Math.cos(slope) - ny * Math.sin(slope);
        let ty = nx * Math.sin(slope) + ny * Math.cos(slope);
        return [tx + cx, ty + cy]
    }

    //https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
    export function tryParseJSON(jsonString) {
        try {
            var o = JSON.parse(jsonString);
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { }
        return false;
    };

}

