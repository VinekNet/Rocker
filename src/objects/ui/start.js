/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class Start extends Phaser.GameObjects.Container {

    constructor(scene, x, y, size = 80) {
        super(scene, x, y)
        scene.add.existing(this);
   
        this.size = size;
        let w = this.size;
        this.pause =false;
        let pad2 = scene.add.container();

        let starttext = scene.add.text(0, 0, "START", { font: "65px Arial", fill: "#ff0044", align: "center" });
        console.log("onfaitstart");
        let quittext = scene.add.text(50, 100, "QUIT", { font: "65px Arial", fill: "#ff0044", align: "center" });
       
        this.add(pad2);
        pad2.add(starttext);

        pad2.add(quittext);

        pad2.x = w / 2;
        pad2.y = w / 2;

        starttext.setInteractive();
        quittext.setInteractive();

        //this.cursors = scene.input.keyboard.createCursorKeys();



        starttext.on('pointerover', function (pointer) {
      
            starttext.alpha = 0.7;


        })
        starttext.on('pointerout', function (pointer) {
   
            starttext.alpha = 1;
        })
        starttext.on('pointerdown', function (pointer) {

            starttext.alpha = 0.5;

                Tableau.current.back.stop();
           
            Tableau.suivant();
        })
        /////////////
        quittext.on('pointerover', function (pointer) {

            quittext.alpha = 0.7;


        })
        quittext.on('pointerout', function (pointer) {

            quittext.alpha = 1;
        })
        quittext.on('pointerdown', function (pointer) {

            quittext.alpha = 0.5;

            Tableau.current.back.stop();

            Tableau.current.scene.restart();
        })


    }


}