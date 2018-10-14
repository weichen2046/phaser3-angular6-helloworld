export class MyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload() {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    public create() {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles('red');

        const logo = this.physics.add.image(400, 100, 'logo');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD
        });
        emitter.startFollow(logo);
    }

}
