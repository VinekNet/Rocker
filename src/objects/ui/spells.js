/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class Spells extends Phaser.GameObjects.Container {
    constructor(scene, x, y, size = 80    ) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size = size;
        let w = this.size;

        let pad2 = scene.add.container();

        let circlefond = scene.add.circle(0, 0, this.size / 1.8, 0x31daf0, 1)
        circlefond.setStrokeStyle(2, 0x1a65ac);
        let circle = scene.add.circle(0, 0, this.size / 2, 0xFFFFFF, 0.5)

        let circlefondS = scene.add.circle(-120, 0, this.size / 1.8, 0x31daf0, 0.8)
        circlefondS.setStrokeStyle(2, 0x1a65ac);
        let circleS = scene.add.circle(-120, 0, this.size / 2, 0xFFFFFF, 0.5)

        let circlefondR = scene.add.circle(-0, -110, this.size / 1.8, 0x31daf0, 0.6)
        circlefondR.setStrokeStyle(2, 0x1a65ac);
        let circleR = scene.add.circle(-0, -110, this.size / 2, 0xFFFFFF, 0.5)

        this.add(pad2);
        pad2.add(circlefond);
        pad2.add(circle);
        pad2.add(circlefondS);
        pad2.add(circleS);
        pad2.add(circlefondR);
        pad2.add(circleR);
        pad2.x = w / 2;
        pad2.y = w / 2;

        circle.setInteractive();
        circleS.setInteractive();
        circleR.setInteractive();

        this.cursors = scene.input.keyboard.createCursorKeys();

        

        circle.on('pointerdown', function () {
            Tableau.current.player.shoot();
            ui.updateEnergy();;
            circle.setAlpha(0.1);
            circlefond.setAlpha(0.8);
        });
        circle.on('pointerup', function () {
            circle.setAlpha(0.5);
            circlefond.setAlpha(1);
        });

        circleS.on('pointerdown', function () {
            Tableau.current.player.shield();
            ui.updateEnergy();;
            circleS.setAlpha(0.1);
            circlefondS.setAlpha(0.6);
        });
        circleS.on('pointerup', function () {
            circleS.setAlpha(0.5);
            circlefondS.setAlpha(0.8);
        });

        circleR.on('pointerdown', function () {
            Tableau.current.player.ramp();
            ui.updateEnergy();;
            circleS.setAlpha(0.1);
            circlefondS.setAlpha(0.2);
        });
        circleR.on('pointerup', function () {
            circleS.setAlpha(0.5);
            circlefondS.setAlpha(0.6);
        });

    }


}