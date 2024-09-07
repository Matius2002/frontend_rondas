import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-rondas-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './rondas-main.component.html',
  styleUrl: './rondas-main.component.css',
  animations:
    [
      trigger('listAnimation', [
        transition('* <=> *', [
          query(':enter',
            [style({ opacity: 0 }), stagger('20ms', animate('100ms ease-out', style({ opacity: 1 })))],
            { optional: true }
          )
        ])
      ]),
      trigger('fadeAnimation', [
        transition(':enter', [
          style({ opacity: 0 }), animate('100ms ease-out', style({ opacity: 1 }))]
        ),
        transition(':leave', [
          style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]
        )
      ]),
      trigger('fadeAnimationBlack', [
        transition(':enter', [
          style({ opacity: 0 }), animate('100ms ease-out', style({ opacity: 0.6 }))]
        ),
        transition(':leave', [
          style({ opacity: 0.6 }), animate('100ms ease-out', style({ opacity: 0 }))]
        )
      ])
    ]
})
export class RondasMainComponent
{
  constructor(private router: Router) {  }
  navCreateRonda()
  {
    this.router.navigate(['rondas/createRonda'])
  }
  navSearchRonda()
  {
    this.router.navigate(['rondas/searchRonda'])
  }
}
