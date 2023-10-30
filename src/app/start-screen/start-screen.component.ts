import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})


export class StartScreenComponent implements OnInit {



  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }


  async newGame() {
    let game = new Game();

    const docRef = await addDoc(collection(this.firestore, `games`), game.toJson())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });


  }


}
