class LIM extends ObjetEnnemi {
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "lim");
        //pas de gravit�
        this.body.allowGravity = false;

        //gestion de la taille
        this.setDisplaySize(64, 64);

        //on r�duit un peu la zone de hit
        this.setBodySize(this.body.width, this.body.height);
        this.setOffset(0, 0);
        this.setDepth(10);
        //d�finir les propri�t� que l'on va utiliser dans notre animation

        // X
        this.originalX = x;
        this.minX = x - 200;
        this.maxX = x + 200;

        // Y
        this.originalY = y;
        this.minY = y - 5;
        this.maxY = y + 5;

        // on applique les propri�t� du d�but de l'animation
        this.x = this.minX;
        this.y = this.minY;
        this.alpha = 0;
        let me = this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de d�caler les animations pour ce m�me objet
        scene.tweens.add({
            targets: this,
            duration: 200,
            delay: Math.random() * 1000,
            alpha: {
                startDelay: Math.random() * 5000,
                from: 1,
                to: 1,
            },
            onComplete: function () {
                me.start();
            }
        })
        this.tweenMouvement;
    }

    start() {
        this.tweenMouvement = this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to: this.maxX,
                duration: 5000,
                ease: 'Cubic. Out',
                yoyo: -1,
                repeat: -1,
                flipX: true,
            },
            y: {
                t: 1,
                ease: 'Sine.easeInOut',
                duration: 4000,
                yoyo: true,
                repeat: -1
            }
        });
    }

    Shiled() {
        this.tweenMouvement.setTimeScale(-1);
        let here = this;
        setTimeout(function () {
            here.tweenMouvement.setTimeScale(1);
        }, 500);
    }

}