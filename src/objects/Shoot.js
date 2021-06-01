class Shoot extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "tir");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(48, 24);
        this.setBodySize(this.body.width, this.body.height);

        this.setVelocityX(450 * scene.player.sens);
        this.setBounce(1);
        this.setDepth(1000);
        //scene.monstersContainer.iterate(monster => {
            //scene.physics.add.overlap(this, monster, function () { monster.Tmortlol() }, null, scene);
        //})
        let ici = scene;
        let tir = this;

        this.key = 'default';
        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('tir', { start: 0, end: 2 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.play('default');
        scene.monsters.forEach(function (enfant, index) {
            ici.physics.add.overlap(tir, enfant, function () {
                enfant.Tmortlol()
                tir.destroy();
                scene.sound.play('kill');
                scene.saigneE(enfant, function () {
                    //à la fin de la petite anim...ben il se passe rien :)
                })
            });
        });
    }
}