class Trou extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "Trou");
        //this.setDisplaySize(40, 38);
        //this.setBodySize(this.body.width - 10, this.body.height + 130);
        //this.setOffset(0, 3);
        this.setImmovable(true);
        //this.setTint(0xFF0035);
        this.body.allowGravity = false;
        this.isEnable = false;
        this.here = scene;

        let f = this;
        scene.physics.add.overlap(
            this,
            scene.player,
            function () { f.hitLaser() },
            null,
            scene
        );
    }


    hitLaser() {
        let s = this.here;
            if (!this.here.player.isDead) {
                this.here.player.isDead = true;
                this.here.player.visible = false;
                this.here.saigne(this.player, function () {
                    this.here.mood.stop();
                    this.here.mood2.stop();
                    this.here.mood3.stop();
                    this.here.sound.play('ded');
                    s.player.isDead = false;
                    s.scene.restart();
                })
            }
        }
}