import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PopoverComponent} from "./page/popover/popover.component";

const routes: Routes = [
  {
    path: '',
    component: PopoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
