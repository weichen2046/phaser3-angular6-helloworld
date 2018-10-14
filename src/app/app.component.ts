import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MyScene } from './my-scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'angular-phaser';

  game: Phaser.Game;

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
    parent: 'content',
  };

  ngOnInit(): void {
    this.game = new Phaser.Game(this.gameConfig);
  }

  ngOnDestroy() {
    this.game.destroy(true);
  }

  ngAfterViewInit() {
    this.game.events.once('ready', () => {
      this.game.scene.add('Scene', new MyScene(), true);
    });
  }

}
