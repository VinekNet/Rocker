class Shield extends ObjetPhysique {
    constructor(scene, x, y) {
        super(scene, x, y, "shield");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(32, 128);
        this.setBodySize(this.body.width, this.body.height);
        
        this.key = 'default';
        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('shield', { start: 0, end: 3 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.play('default');

        this.setImmovable(true);
        this.setBounce(0);
        this.setDepth(1000);
        //scene.monstersContainer.iterate(monster => {
            //scene.physics.add.overlap(this, monster, function () { monster.Tmortlol() }, null, scene);
        //})
        let ici = scene;
        let ceci = this;
        scene.monsters.forEach(function (enfant, index) {
            ici.physics.add.overlap(ceci, enfant, function () {
                enfant.Shiled()
            });
            scene.physics.add.collider(scene.monster25, ceci);
            scene.physics.add.collider(scene.monster26, ceci);
            scene.physics.add.collider(scene.monster27, ceci);
        });
    }
}