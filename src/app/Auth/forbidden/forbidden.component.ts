import { Component } from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css',
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
        )
      ])
    ]
})
export class ForbiddenComponent
{
}
