import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: 'game', component: BoardComponent },
  { path: '**', redirectTo: "" },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
