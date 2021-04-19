class Ramp extends ObjetPhysique{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
     constructor(scene, x, y) {
        super(scene, x, y, "ramp");
        //pas de gravité
        this.body.allowGravity=false;
        this.setImmovable(1);
        //gestion de la taille
        this.setDisplaySize(64,64);
        
        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0, 0);
        this.setDepth(10);
        this.setRotation(130);
        
        
        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+200;

        // Y
        this.originalY=y;
        this.minY=y-50;
        this.maxY=height+60;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:1,
                //delay:Math.random()*1000,
                alpha:{
                    
                    from:1,
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
            
        });
    }

}