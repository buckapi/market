import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyordersRoutingModule } from './myorders-routing.module';
import { MyordersComponent } from './myorders.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    MyordersComponent
  ],
  imports: [
    NgxSkeletonLoaderModule.forRoot(),
    CommonModule,
    MyordersRoutingModule
  ]
})
export class MyordersModule { }
