   class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('energyBack', 'assets/ui/stormBack.png');
        this.load.image('energyContainer', 'assets/ui/stormEmpty.png');
        this.load.image('energyFilled', 'assets/ui/stormFull.png');
        this.load.image('energyMask', 'assets/ui/stormMask.png');
    }
    create (){
        console.log("create Ui")

        this.score=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        //this._scoreText = this.add.text(16, 16, '...', {
        //    font:'32px "Hanalei Fill"',
        //    fill: '#fff'
        //});

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })*/

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        /*this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })*/

        //met l'ui au dessus du tableau
        
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);
        

        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)

        //if (this.sys.game.device.os.desktop !== true) {
            let pad = new GamePad(this, 0, 0);
            //pad.x=this.sys.canvas.width-pad.size-32;
            pad.x = 32;
            pad.y = this.sys.canvas.height - pad.size - 32;

            let padTir = new Spells(this, 0, 0);
            padTir.x = this.sys.canvas.width - pad.size - 32;

            padTir.y = this.sys.canvas.height - pad.size - 32;

        //}
        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;
        this.containerBG = this.physics.add.sprite(825, 90, 'energyBack');
        this.containerBG.body.enable = false;
        this.energyFill = this.physics.add.sprite(825 - 32, 90 + 60, 'energyFilled');
        this.energyFill.body.enable = false;
        this.energyFill.setOrigin(0, 1);
        this.containerEnergy = this.physics.add.sprite(825, 90, 'energyContainer');
        this.containerEnergy.body.enable = false;
        this.mask = this.physics.add.sprite(825, 90, 'energyMask');
        this.mask.body.enable = false;
        
        this.energyFill.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
        this.mask.visible = false;
    }

    gagne(points=10)
    {
        this.score+=points;
        //this._scoreText.setText('Score: ' + this.score);
       }

       updateEnergy() {
           this.energyFill.scaleY = Tableau.current.player.energy/50;
       }

    update(){
        if(Tableau.current){
            //this._tableauText.setText(Tableau.current.scene.key);
            //this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
