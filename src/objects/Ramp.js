class Ramp extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "Rampe");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(128, 64);
        
        this.setBodySize(this.body.width, this.body.height);

        this.key = 'default';
        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('Rampe', { start: 0, end: 3 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.play('default');
        this.setBounce(0);
        this.setDepth(1000);


        //scene.monstersContainer.iterate(monster => {
        scene.physics.add.overlap(this, scene.player, function () {
            scene.player.ramped = true;
            scene.player.stop();
            scene.player.boostRamp();
            let here = scene;
            setTimeout(function () {
                here.player.ramped = false;
            }, 500);
        }, null, scene);
        //})
    }
}