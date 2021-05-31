class Niveau1 extends Tableau{

    preload() {
        super.preload();
        var aImageFiles = ['monstre', 'monstre2', 'monstre3', 'monstre4'];
        var randImage = aImageFiles[Math.floor(Math.random()*aImageFiles.length)];
         
        this.load.image('star', 'assets/bolt.png');
        this.load.image('ground', 'assets/sol.png');
        this.load.image('sky-2', 'assets/1.png');
        this.load.image('sky-3', 'assets/2.png');
        this.load.image('sky-4', 'assets/3.png');
        this.load.image('sky-5', 'assets/4.png');
        this.load.image('sun', 'assets/sun.png');
        this.load.image('platforms', 'assets/plateforme1.png');
        this.load.image('monster-pattern', 'assets/' + randImage + '.png');
        this.load.image('twomp', 'assets/twompmonstre.png');
        
        this.load.image('shield', 'assets/shield.png');
        this.load.image('lim', 'assets/lim.png');
       
        this.load.audio('zik2', 'assets/NeoF.wav');

       this.load.audio('zik1', 'assets/Beach2.wav');


    }
    create() {
        super.create();

        this.mood = this.sound.add('zik1');
        this.mood2 = this.sound.add('zik2');
        
        this.mood.loop = true;
        this.mood.play();
        this.mood2.loop = true;
        this.mood2.play();
        

        //on définit la taille du tableau
        let largeurDuTableau=896*8  ;
        let hauteurDuTableau=448+152; 
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        for(let i=0 ;i<=largeurDuTableau/896;i++){
            let ground=this.physics.add.sprite(i*896,536,"ground");
            ground.setDisplaySize(896,64)//taille de l'objet
            ground.setOrigin(0,0);//pour positionner plus facilement
            ground.body.allowGravity=0; //la gravité n'a pas d'effet ici
            ground.setImmovable(true); //ne bouge pas quand on rentre dedans
            this.physics.add.collider(this.player, ground);//le joueur rebondit dessus*/*
            ground.setScrollFactor(1);
            ground.setDepth(1);
            ground.tilePositionX=this.cameras.main.scrollX*0.6;
            
        }
        
        
        
        
        this.platforms = this.physics.add.group();
       
        this.platforms.create(550, height, 'platforms'); //1
        this.platforms.create(650, height - 100, 'platforms');//2
        this.platforms.create(850, height, 'platforms');//3
        this.platforms.create(1100, height - 50, 'platforms');//4
        this.platforms.create(1200, 170, 'platforms');//5
        this.platforms.create(1320, 300, 'platforms');//6
        this.platforms.create(1600, 280, 'platforms');//7
        //this.platforms.create(1900, height - 200, 'platforms');//7.5

            

            this.platforms.children.iterate(function (child) {
                child.setImmovable(true);
                child.body.allowGravity=false;
                child.setVelocityX(0);
                child.setBounceX(1);
                child.setDisplaySize(128, 16);
                child.setCollideWorldBounds(true);
                child.setDepth(10);
                child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
            });
           
            
            this.physics.add.collider(this.player,this.platforms);
            this.stars=this.physics.add.group();
            /*this.stars.create(400,100,"star");
            this.stars.create(860,255,"star");
            this.stars.create(1320,105,"star");
            this.stars.create(1900,0,"star");
           */
            this.stars.children.iterate(function (child) {
                child.setCollideWorldBounds(true);
                child.setBounce(0);
                child.setDisplaySize(32,40)
                child.setDepth(10)
            });


            
            this.physics.add.collider(this.platforms, this.stars);
            this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //6: se retourne avant le mur
        this.monsters = new Array();
        this.monster = new LIM(this, 700, height + 60);
        this.monster1 = new LIM(this,1100,height+60);
        this.monster2 = new LIM(this,1600,height+60);
        //this.monster3 = new Twomp(this,450,300);
        //this.monster4 = new Twomp(this, 1250, 300);

        this.monsters.push(this.monster);
        this.monsters.push(this.monster1);
        this.monsters.push(this.monster2);
        this.monsters.push(this.monster3);
        this.monsters.push(this.monster4);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*this.sky = this.add.image(0, 448, 'sky').setOrigin(0, 1);
        this.sky.displayWidth = 14 * 64 * 8
            ;
        this.sky.setScrollFactor(1, 0);*/

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);

        /////                           1
        /*this.sky2=this.add.tileSprite(
            0,
            30,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );*/
        this.sky2 = this.add.image(0, 448, 'sky-2').setOrigin(0, 1);
        this.sky2.setScrollFactor(1,0);
        
        /////                           2
        this.sky3 = this.add.image(0, 448, 'sky-3').setOrigin(0, 1);
        this.sky3.setScrollFactor(1, 0);
        /////                           3
        this.sky4 = this.add.image(0, 448, 'sky-4').setOrigin(0, 1);
        this.sky4.setScrollFactor(0.8,0);
        /////                           4
        this.sky5 = this.add.image(0, 448, 'sky-5').setOrigin(0, 1);
        this.sky5.setScrollFactor(1, 0);
        
        
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;
        
        

        //fait passer les éléments devant le ciel
        
        this.stars.setDepth(10)
        this.player.setDepth(10)

        this.i = 0;
    }

    update(time,delta){
        super.update();

        this.i += delta;
        //console.log(this.i);

        if (this.i >= 700) {
            //console.log("+");
            if (this.player.energy <= 49) {
                this.player.energy += 1;
                ui.updateEnergy();
            }
            this.i = 0;
            ui.updateEnergy();
        }



        this.sky4.tilePositionX = this.cameras.main.scrollX * 0.6;
            
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.2-35;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;

        //his.mood.volume = 0
        //this.mood2.volume =0
        this.mood.volume = 1 - (this.player.x / (896*8));
        //console.log(this.mood.volume);
        this.mood2.volume = (this.player.x / (896 * 8));
        //console.log(this.mood2.volume);
    }



}

