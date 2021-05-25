class Ramp extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "ramp");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(128, 64);
        this.setBodySize(this.body.width, this.body.height);


        this.setBounce(0);
        this.setDepth(1000);
        //scene.monstersContainer.iterate(monster => {
        scene.physics.add.overlap(this, scene.player, function () {
            scene.player.ramped = true;
            scene.player.boostRamp();
            let here = scene;
            setTimeout(function () {
                here.player.ramped = false;
            }, 500);
        }, null, scene);
        //})
    }
}