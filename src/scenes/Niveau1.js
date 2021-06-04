class Niveau1 extends Tableau{

    preload() {
        super.preload();
       // var aImageFiles = ['monstre', 'monstre2', 'monstre3', 'monstre4'];
       // var randImage = aImageFiles[Math.floor(Math.random()*aImageFiles.length)];
         

        
        this.load.image('sky-2', 'assets/1.png');
        this.load.image('sky-3', 'assets/2.png');
        this.load.image('sky-4', 'assets/3.png');
        this.load.image('sky-5', 'assets/4.png');

        this.load.image('tas', 'assets/tas.png');
        this.load.image('tasf', 'assets/tasfond.png');

        this.load.image('NEOF', 'assets/10.png');
        this.load.image('NEOF2', 'assets/110.png');
        this.load.image('NEOF3', 'assets/111.png');
        this.load.image('NEOF4', 'assets/112.png');
        this.load.image('NEOF5', 'assets/12.png');
        this.load.image('NEOF6', 'assets/13.png');
        this.load.image('NEOF7', 'assets/131.png');

        this.load.image('ROOF', 'assets/ROOF.png');
        this.load.image('PRf', 'assets/PRf.png');

        this.load.image('r2', 'assets/r2.png');
        this.load.image('r3', 'assets/r3.png');
        this.load.image('r4', 'assets/r4.png');

        this.load.image('sun', 'assets/sun.png');
        this.load.image('tuto', 'assets/tuto.png');
        this.load.image('platforms', 'assets/plateforme1.png');
        this.load.image('platformsz', 'assets/plateforme2.png');
        this.load.image('ground ', 'assets/sol.png')
        
        this.load.image('shield', 'assets/shield.png');
        
        this.load.audio('zik3', 'assets/roof.wav');
        this.load.audio('zik2', 'assets/NeoF.wav');
        this.load.audio('zik1', 'assets/beach3.wav');



    }
    create() {
        super.create();

        this.mood = this.sound.add('zik1');
        this.mood2 = this.sound.add('zik2');
        this.mood.volume = 0;
        this.mood2.volume = 0;
        this.mood3 = this.sound.add('zik3');
        this.mood3.volume = 0;

        this.mood.loop = true;
        this.mood.play();
        this.mood2.loop = true;
        this.mood2.play();
        this.mood3.loop = true;
        this.mood3.play();

        this.canEnd = true;
        

        //on définit la taille du tableau
        let largeurDuTableau=896*8  ;
        let hauteurDuTableau=448+152; 
        this.cameras.main.setBounds(0, -200, largeurDuTableau, hauteurDuTableau+200);
        this.physics.world.setBounds(0, -200, largeurDuTableau,  hauteurDuTableau+200);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.monster25 = new EnnemiTombe(this, 2500, 200);
        this.monster26 = new EnnemiTombe(this, 4000, 200);
        this.monster27 = new EnnemiTombe(this, 6000, 200);

        for(let i=0 ;i<=largeurDuTableau/896;i++){
            let ground=this.physics.add.sprite(i*896,536,"ground");
            ground.setDisplaySize(896,64)//taille de l'objet
            ground.setOrigin(0,0);//pour positionner plus facilement
            ground.body.allowGravity=0; //la gravité n'a pas d'effet ici
            ground.setImmovable(true); //ne bouge pas quand on rentre dedans
            this.physics.add.collider(this.player, ground);//le joueur rebondit dessus*/*
            this.physics.add.collider(this.monster25, ground);
            this.physics.add.collider(this.monster26, ground);
            this.physics.add.collider(this.monster27, ground);
            ground.setScrollFactor(1);
            ground.setDepth(60);
            ground.tilePositionX=this.cameras.main.scrollX*0.6;
            
        }
        
        //6264 + 125, 260
        //this.Trou
        
        this.platforms = this.physics.add.group();
        this.platformsz = this.physics.add.group();
        this.platformszz = this.physics.add.group();
        this.platformszzz = this.physics.add.group();

        this.ROOF = this.physics.add.group();
        this.ROOF2 = this.physics.add.group();
        this.ROOF3 = this.physics.add.group();


        this.platforms.create(550, height, 'platforms'); //1
        this.platforms.create(650, height - 100, 'platforms');//2
        this.platforms.create(850, height, 'platforms');//3
        this.platforms.create(1100, height - 25, 'platforms');//4
        this.platforms.create(1100, 180, 'platforms');//5
        this.platforms.create(1320, 300, 'platforms');//6
        this.platforms.create(1600, 280, 'platforms');//7
        this.platformsz.create(1805, 500, 'platformsz');//8
        this.platformsz.create(1900, 465, 'platformsz');//9
        this.platformsz.create(1932, 409, 'platformsz');//10
        this.platformsz.create(1955, 366, 'platformsz');//11
        this.platformsz.create(1970, 366, 'platformsz');//11.5
        this.platformsz.create(2116, 320, 'platformsz');//12
        this.platformsz.create(2193, 320, 'platformsz');//13
        this.platformsz.create(2260, 415, 'platformsz');//14
        this.platformsz.create(2395, 506, 'platformsz');//15

        this.platformszz.create(3075, 434, 'platformsz');//16
        this.platformszzz.create(3279, 340, 'platformsz');//17
        this.platformszz.create(3775, 434, 'platformsz');//18
        this.platformszzz.create(3979, 340, 'platformsz');//19
        this.platformszzz.create(4122, 335, 'platformsz');//20
        this.platformszz.create(4308, 250, 'platformsz');//21
        this.platformszzz.create(4502, 154, 'platformsz');//22

        this.ROOF.create(4742 + 212, 347, 'ROOF');//23
        this.ROOF2.create(5296 + 175, 260, 'ROOF2');//24
        this.ROOF2.create(5768 + 175, 180, 'ROOF2');//25
           this.ROOF3.create(6264 + 125, 260, 'ROOF2');//24
        //this.platforms.create(1900, height - 200, 'platforms');//7.5

        //this.trou = New Trou(6264 + 125, 260);

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
        this.platformsz.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(128, 16);
            child.setCollideWorldBounds(true);
            child.setDepth(10);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });
        this.platformszz.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(105, 16);
            child.setCollideWorldBounds(true);
            child.setDepth(-15);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });
        this.platformszzz.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(95, 16);
            child.setCollideWorldBounds(true);
            child.setDepth(-15);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });
           
        this.ROOF.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(424, 400);
            child.setCollideWorldBounds(true);
            child.setDepth(-15);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });
        
        this.ROOF2.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(350, 400);
            child.setCollideWorldBounds(true);
            child.setDepth(-15);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });
        this.ROOF3.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setVelocityX(0);
            child.setBounceX(1);
            child.setDisplaySize(250, 400);
            child.setCollideWorldBounds(true);
            child.setDepth(-15);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });


        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.collider(this.player, this.platformsz);

        this.physics.add.collider(this.player, this.platformszz);
        this.physics.add.collider(this.player, this.platformszzz);
        this.physics.add.collider(this.player, this.ROOF);
        this.physics.add.collider(this.player, this.ROOF2);
        this.physics.add.collider(this.player, this.ROOF3);
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
        this.monster = new LXM(this, 700, height + 60);
        this.monster1 = new LIM(this,1100,height+60);
        this.monster2 = new LIM(this, 1400, height + 60);
        this.monster3 = new LXM(this, 5000, 116);
        this.monster4 = new LXM(this, 5950, -49);
        this.monster5= new LIM(this, 6750, height + 60);
        this.monster6 = new LXM(this, 2800, height + 60);
        

        //this.monster3 = new Twomp(this,450,300);
        //this.monster4 = new Twomp(this, 1250, 300);

        this.monsters.push(this.monster);
        this.monsters.push(this.monster1);
        this.monsters.push(this.monster2);
        this.monsters.push(this.monster3);
        this.monsters.push(this.monster4);
        this.monsters.push(this.monster5);
        this.monsters.push(this.monster6);
        this.monsters.push(this.monster25);
        this.monsters.push(this.monster26);
        this.monsters.push(this.monster27);
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
        this.tuto = this.add.image(-120, 370       , 'tuto').setOrigin(0, 1);
        this.tuto.setScrollFactor(0);
        this.tuto.setDepth(90);
        /////
        this.sun = this.add.image(600, 132, 'sun').setOrigin(0, 1);
        this.sun.setScrollFactor(0, 0);
        this.sun.setDepth(-0.1);
        /////   
        this.sky2 = this.add.image(0, 448, 'sky-2').setOrigin(0, 1);
        this.sky2.setScrollFactor(0.2, 0);
        
        
        /////                           2
        this.sky3 = this.add.image(0, 448, 'sky-3').setOrigin(0, 1);
        this.sky3.setScrollFactor(0.2, 0);
        /////                           3
        this.sky4 = this.add.image(0, 444, 'sky-4').setOrigin(0, 1);
        this.sky4.setScrollFactor(0.3,0);
        /////                           4
        this.sky5 = this.add.image(0, 448, 'sky-5').setOrigin(0, 1);
        this.sky5.setScrollFactor(0.2, 0);


        this.sky2.setDepth(-0.04)
        this.sky3.setDepth(-0.03)
        this.sky4.setDepth(0.01)
        this.sky5.setDepth(0.009)
        /////
        this.tas = this.add.image(-50, 580, 'tas').setOrigin(0, 1);
        this.tas.setScrollFactor(1, 1);
        this.tas.setDepth(50);
        this.tasf = this.add.image(-50, 580, 'tasf').setOrigin(0, 1);
        this.tasf.setScrollFactor(1, 0.9);
        this.tasf.setDepth(0.1);
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;
        /////                                                           /////NEOF
        this.n1 = this.add.image(0, 448, 'NEOF').setOrigin(0, 1);
        this.n1 .setScrollFactor(1, 0);
        this.n1.setDepth(-1);
        ////
        this.b1 = this.add.image(0, 448, 'NEOF2').setOrigin(0, 1);
        this.b1.setScrollFactor(0.7, 0);
        this.b1.setDepth(0.081);
        this.b2 = this.add.image(0, 448, 'NEOF3').setOrigin(0, 1);
        this.b2.setScrollFactor(0.8, 0);
        this.b2.setDepth(0.0811);
        this.b3 = this.add.image(0, 448, 'NEOF4').setOrigin(0, 1);
        this.b3.setScrollFactor(0.90, 0);
        this.b3.setDepth(0.08111);
        ////
        this.n2 = this.add.image(0, 400, 'NEOF5').setOrigin(0, 1);
        this.n2.setScrollFactor(1, 0);
        this.n2.setDepth(0.09);
        this.n21 = this.add.image(0, 450, 'NEOF5').setOrigin(0, 1);
        this.n21.setScrollFactor(1, 0);
        this.n21.setDepth(0.09);
        this.n22 = this.add.image(0, 500, 'NEOF5').setOrigin(0, 1);
        this.n22.setScrollFactor(1, 0);
        this.n22.setDepth(0.09);
        ///
        this.n3 = this.add.image(-50, 592, 'NEOF6').setOrigin(0, 1);
        this.n3.setScrollFactor(1, 1);
        this.n3.setDepth(0.3);
        this.n4 = this.add.image(-50, 592, 'NEOF7').setOrigin(0, 1);
        this.n4.setScrollFactor(1, 1);
        this.n4.setDepth(0.3);
        ////////////////
        

        this.PRf = this.add.image(0, 592, 'PRf').setOrigin(0, 1);
        this.PRf.setScrollFactor(1, 1);
        this.PRf.setDepth(20);
        ///
        this.r2 = this.add.image(-500, 448, 'r2').setOrigin(0, 1);
        this.r2.setScrollFactor(0.7, 0);
        this.r2.setDepth(1.081);
        
        this.r3 = this.add.image(-500, 448, 'r3').setOrigin(0, 1);
        this.r3.setScrollFactor(0.9, 0);
        this.r3.setDepth(1.0911);

        this.r2 = this.add.image(-450, 448, 'r2').setOrigin(0, 1);
        this.r2.setScrollFactor(0.8, 0);
        this.r2.setDepth(1.08111);
        //fait passer les éléments devant le ciel
        
        this.stars.setDepth(10);
        this.player.setDepth(10);

        this.i = 0;
        this.j = 0;
        this.dirUp = false;
    }

    update(time, delta) {
        super.update();
        this.tuto.alpha =1-((this.player.x-138)/700);
        this.i += delta;
        this.j += delta;
        //console.log(this.player.x);

        if (this.i >= 700) {
            //console.log("+");
            if (this.player.energy <= 49) {
                this.player.energy += 1;
                ui.updateEnergy();
            }
            this.i = 0;
        }
        ui.updateEnergy();
        if (this.dirUp == false) {
            if (this.j >= 1300) {
                this.platforms.children.iterate(function (child) {
                    child.y += 1;

                })
                this.j = 0;
                this.dirUp = true;
            }
        }
            if (this.dirUp == true) {
                if (this.j >= 1300) {
                    this.platforms.children.iterate(function (child) {
                        child.y -= 1;
                        
                    })
                    this.j = 0;
                    this.dirUp = false;
                }
            }   
            
        



        this.sky4.tilePositionX = this.cameras.main.scrollX * 0.6;
            
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.2-35;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;

        //his.mood.volume = 0
        //this.mood2.volume =0
        if (this.player.x >= 2500) {
            this.mood.volume = 0;
        }
        else { this.mood.volume = (1 - (this.player.x / (896 * 3))) / 3; }
        //console.log(this.mood.volume);
        //this.mood2.volume = ((this.player.x / (896 * 8)))/3;
        if (this.player.x >= 4500) {
            this.mood2.volume = 0;
        }
   
       
        else { this.mood2.volume = ((this.player.x / (896 * 3))) / 3; }
        //console.log(this.mood2.volume);
        if (this.player.x <= 3000) {
            this.mood3.volume = 0;
        }


        else {
            this.mood3.volume = (((this.player.x - 2500) / (896 * 3))) / 3;
        }
        //console.log((((this.player.x - 2500) / (896 * 3))) / 3);
        //console.log(this.mood3.volume);

        //FIN
        if (this.player.x > 7150 && this.canEnd) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.canEnd = false;
            
            setTimeout(function () {
                Tableau.suivant();
            }, 1000);
        }

    }

    
        
    



}

