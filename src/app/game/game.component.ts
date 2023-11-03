import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  gameId: string;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  async ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params: any) => {

      let currentGame = docData(this.getSingleDocRef(params.id));
      this.gameId = params.id;
      currentGame.subscribe((game: any) => {
        this.game.currentplayer = game.currentplayer;
        this.game.playedCard = game.playedCard;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      })
    })
  }



  getSingleDocRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }

  async newGame() {
  }


  ref() {
    return collection(this.firestore, `games`);
  }

  takeCard() {
    if (this.game.players.length > 0) {
      if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.saveGame();
        setTimeout(() => {
          this.game.playedCard.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.game.currentplayer++;
          this.game.currentplayer = this.game.currentplayer % this.game.players.length;
          this.saveGame();
        }, 1000);

      }
    }

  }

  saveGame() {
    let currentGame = this.getSingleDocRef(this.gameId);
    updateDoc(currentGame, this.game.toJson());


    // let currentGame = docData(this.getSingleDocRef(this.gameId)).update(this.game.toJson());
    // currentGame.update(this.game.toJson());


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.game.players.push(result);
        this.saveGame();
      }
    });

  }

  addPlayer() {
    if (this.game.players.length <= 0) {
      this.openDialog();
    } else {
      this.takeCard();
    }
  }
}