import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    NgxSkeletonLoaderModule.forRoot(),
    // NgxSkeletonLoaderModule,
    CommonModule,
    WelcomeRoutingModule,
    NgxUsefulSwiperModule

  ]
})
export class WelcomeModule { }
