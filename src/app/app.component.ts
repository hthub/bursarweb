import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { Store, select } from '@ngrx/store';
import { AuthState } from './reducers/auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'BursarWeb';
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    const auth = this.store.select(state => state);
    console.log(auth.subscribe( s => console.log(s)))
  }
}
