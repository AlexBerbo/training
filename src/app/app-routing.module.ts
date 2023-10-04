import { compileClassMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ResultsComponent } from './component/results/results.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:league', component: HomeComponent },
  { path: 'result/:teamId/:league/:season', component: ResultsComponent},
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
