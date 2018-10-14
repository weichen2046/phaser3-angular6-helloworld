import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-phaser';

  public readonly gameConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        debug: false,
      }
    },
    scene: {
      preload: this.preload,
      create: this.create,
    },
    parent: 'content',
  };

  ngAfterViewInit() {
    const game = new Phaser.Game(this.gameConfig);
  }

  /**
   * `this` in this method is an instance of Phaser.Scene at runtime.
   */
  private preload() {
    // Avoid compile error.
    const scene = this as any as Phaser.Scene;
    scene.load.setBaseURL('http://labs.phaser.io');
    scene.load.image('sky', 'assets/skies/space3.png');
    scene.load.image('logo', 'assets/sprites/phaser3-logo.png');
    scene.load.image('red', 'assets/particles/red.png');
  }

  /**
   * `this` in this method is an instance of Phaser.Scene at runtime.
   */
  private create() {
    const scene = this as any as Phaser.Scene;
    scene.add.image(400, 300, 'sky');

    const particles = scene.add.particles('red');

    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: Phaser.BlendModes.ADD
    });

    const logo = scene.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

}
