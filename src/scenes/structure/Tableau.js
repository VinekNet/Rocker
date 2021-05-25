/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/fond.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('boom', 'assets/kaboom.png');
        this.load.audio('zik', 'assets/NeoF.wav');
        this.load.audio('ded', 'assets/clunk.wav');
        this.load.audio('kill', 'assets/flesh.wav');
        this.load.audio('pick', 'assets/coin.wav');
        this.load.spritesheet('player',
            'assets/player.png',
            { frameWidth: 40, frameHeight: 64  }
        );
        this.load.spritesheet('idle',
            'assets/idle.png',
            { frameWidth: 40, frameHeight: 64 }
        );
        this.load.spritesheet('idleR',
            'assets/idleR.png',
            { frameWidth: 40, frameHeight: 64 }
        );
        this.load.spritesheet('JUMP',
            'assets/jump.png',
            { frameWidth: 44, frameHeight: 64 }
        );
        this.load.spritesheet('JUMPB',
            'assets/jumpback.png',
            { frameWidth: 44, frameHeight: 64 }
        );
    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        this.sound.add('ded');
        this.sound.add('kill');
        this.sound.add('pick');
        this.mood = this.sound.add('zik');
        this.mood.loop=true;
        this.mood.play();
        
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,128,0);

        this.boom=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"boom")
        this.boom.displayWidth=64;
        this.boom.displayHeight=64;
        this.boom.visible=false;
        this.boom.setDepth(1000);  
        
        this.boutonTir = this.input.keyboard.addKey('A');
    }
    update(){
        super.update();
        this.player.move();
        this.tirPlayer();
    }

    tirPlayer() {
        if (Phaser.Input.Keyboard.JustDown(this.boutonTir)) {
            this.player.shoot();
        }
    }
    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this;
        me.boom.visible=true;
        me.boom.rotation = Phaser.Math.Between(0,6);
        me.boom.x=object.x;
        me.boom.y=object.y;
        me.tweens.add({
            targets:me.boom,
            duration:200,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.boom.visible=false;
                onComplete();
            }
        })
    }

    ramasserEtoile (player, star)
    {
        this.sound.play('pick');
        star.disableBody(true, true);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0){
            this.win();
        }
        /*
        // this.stars est un groupe (plus tard)
        if (this.stars.countActive(true) === 0)
        {
           this.win();
        }
         */
    }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    }
    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
     hitMonster(player, monster){
        let me=this;
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                this.sound.play('kill');
                monster.isDead=true; //ok le monstre est mort
                monster.visible=false;
                this.saigne(monster,function(){
                    //à la fin de la petite anim...ben il se passe rien :)
                })
                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead){
                    me.player.isDead=true;
                    me.player.visible=false;
                    this.mood.stop();
                    this.sound.play('ded');
                    //ça saigne...
                    me.saigne(me.player,function(){
                        //à la fin de la petite anim, on relance le jeu
                        me.boom.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })

                }


            }
        }

    }
        
    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        this.mood.stop();
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;