class TableauBoss extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star2.png');
        this.load.image('boss','assets/boss.png');
    }
    create() {
        super.create();

        //des étoiles
        this.star1=this.physics.add.sprite(width-50,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        //notre monstre
        new Boss(this,800,0)    }
}