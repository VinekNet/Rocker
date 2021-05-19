class TableauLevel extends Tableau{

    preload() {
        super.preload();
        var aImageFiles = ['monstre', 'monstre2', 'monstre3', 'monstre4'];
        var randImage = aImageFiles[Math.floor(Math.random()*aImageFiles.length)];
         
        this.load.image('star', 'assets/bolt.png');
        this.load.image('ground', 'assets/sol.png');
        this.load.image('sky-2', 'assets/immeuble.png');
        this.load.image('sky-3', 'assets/immeuble2.png');
        this.load.image('platforms', 'assets/plateforme1.png');
        this.load.image('monster-pattern', 'assets/' + randImage + '.png');
        this.load.image('twomp', 'assets/twompmonstre.png');
        this.load.image('tir', 'assets/concombre.png');

    }
    create() {
        super.create();

        
        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        for(let i=0 ;i<=2;i++){
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
        this.platforms.create(400, height-200, 'platforms');
        this.platforms.create(550, height, 'platforms');
        this.platforms.create(650, height-100, 'platforms');
            this.platforms.create(850, height, 'platforms');
            this.platforms.create(1200, height-30, 'platforms');
            this.platforms.create(1300, 150, 'platforms');
            this.platforms.create(1420 , 280, 'platforms');
            this.platforms.create(1700 , 280, 'platforms');
            this.platforms.create(1900 , height-200, 'platforms');
            

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
            this.stars.create(400,100,"star");
            this.stars.create(860,255,"star");
            this.stars.create(1320,105,"star");
            this.stars.create(1900,0,"star");
           
            this.stars.children.iterate(function (child) {
                child.setCollideWorldBounds(true);
                child.setBounce(0);
                child.setDisplaySize(32,40)
                child.setDepth(10)
            });


            
            this.physics.add.collider(this.platforms, this.stars);
            this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //6: se retourne avant le mur
    new MonsterTest(this,700,height+60);
    new MonsterTest(this,1100,height+60);
    new MonsterTest(this,1600,height+60);
    new Twomp(this,450,300);
    new Twomp(this,1250,300);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //new Ramp(this,300,605);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        this.sky2=this.add.tileSprite(
            0,
            30,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);

        this.sky3=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-3'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);

        
        
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;
        
        

        //fait passer les éléments devant le ciel
        
        this.stars.setDepth(10)
        this.player.setDepth(10)
    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.2-35;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.1;
    }



}

