import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import { CommonModule } from '@angular/common';
import {initFlowbite} from "flowbite";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "./Environment/environment";
import { LoginService } from './Services/Seguridad/auth.service';
import { ReactiveFormsModule } from '@angular/forms';  // Solo necesitas ReactiveFormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
export class AppComponent implements OnInit {
  title = 'ProyectoRondas';

  constructor(private router: Router, private authService: LoginService) {  }

  variable = false;

  surprise = 0;

  ngOnInit()
  {
    initFlowbite();
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  controlMenu()
  { this.variable = !this.variable; }

  logOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['login'])
  }

  /*
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onUserActivity(event: MouseEvent | KeyboardEvent): void {
    console.log("SE MOVIÓ");
  }
  */

  easterEgg()
  {
    this.surprise += 1;
    console.log(this.surprise)
  }

  protected readonly localStorage = localStorage;
  protected readonly environment = environment;
}
