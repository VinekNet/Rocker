class Boss extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "boss");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(128,128);

        //on réduit un peu la zone de hit
        //this.setBodySize(this.body.width-400,this.body.height-400);
        //this.setOffset(0, 0);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-150;
        this.maxX=x+25;

        // Y
        this.originalY=y;
        this.minY=height-128;
        this.maxY=height-64;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.maxY;
        this.alpha=0;
        let me=this;
        this.setCollideWorldBounds(true);
        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*1000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();

                }
            })

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                delay: 2000,
                from: this.minX,
                to:this.maxX,
                duration:1000,
                
                yoyo:-1,
                hold:500,
                repeat:-1,
                repeatDelay:500,
            },
            y: {
                delay:2000,
                from: this.maxY,
                to:this.minY,
                duration: 500,
                yoyo:-1,
                repeat:-1,
               
                
            }
        });
        
    }

} //////