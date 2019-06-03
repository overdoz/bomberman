const Element = require('./Element.js');

class PowerUp extends Element {

    constructor(player) {
        super();
        this.player = player;

    }
    // move in 1.5 times quicker, can get power up for only one time
   speedPlus(){
        this.player.frameTime = 1000/3;
   }
   // bomb in 1.5 radius wide, limit in radius 5
   bombRadiusPlus(){
        this.player.radius = 1.5 * this.player.radius;
        while(this.player.radius > 5){
            this.player.radius = 5;
        }
   }
   // idea for later version :)
   explodeTimePlus(){

   }


}
module.exports = PowerUp;
