class EnnemiTombe extends ObjetEnnemi {
    /**
 *
 * @param {Tableau} scene
 * @param x
 * @param y
**/
    constructor(scene, x, y) {
        super(scene, x, y, "GDucky");
        this.setDisplaySize(96, 42);
        this.setBodySize(this.body.width, this.body.height);

        this.setOffset(0, 0);
        this.isAlive = true;
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setDepth(102);
        this.setVelocityX(-200);
        this.here = scene;
        this.mob = this;
        this.reset = y;
        this.setDepth(10);
        scene.time.addEvent({ delay: 100, callback: this.mouv, callbackScope: this, loop: true });
        this.minX = x + 700;
        this.maxX = x - 700;

        scene.physics.add.collider(this, scene.ground, function () {
        });

        // this.anims.create({
        //     key: 'suiveurLeft',
        //     frames: this.anims.generateFrameNumbers('suiveur', { start: 3, end: 5 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'suiveurRight',
        //     frames: this.anims.generateFrameNumbers('suiveur', { start: 0, end: 2 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
        this.key = 'left';

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('GDucky', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1,
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('GDucky', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('fall', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('fall', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.play('left', true);
    }




    mouv() {
        this.direction();

        if (this.isAlive) {
            if (this.scene.player.y > this.mob.y) {
                //console.log("Bébou");
                if (Math.abs(this.scene.player.x - this.mob.x) < 40) {
                    this.mob.setVelocity(0, 200);
                    if (this.mob.body.velocity.y > 0) {
                        this.anims.play('fall', true);
                        this.setBodySize(32, 64);
                    }
                    //else {this.anims.play('up', true);}
                }
                if (Math.abs(this.mob.y - this.reset) < 20 && this.mob.body.velocity.y < 0) {
                    this.mob.setVelocity(200 * this.here.player.sens, 0);
                    this.anims.play('up', true);

                }
                if (this.mob.body.velocity.y < 0) {
                    this.anims.play('up', true);
                }

            }
        }
    }

    direction() {
        if (this.mob.body.velocity.x < 0) {
            this.anims.play('left', true);
            this.setBodySize(64, 32);
            this.dir = -1;
        }
        else if (this.mob.body.velocity.x > 0) {
            this.anims.play('right', true);
            this.setBodySize(64, 32);
            this.dir = 1;
        }
    }

    Shiled() {

    }
}
