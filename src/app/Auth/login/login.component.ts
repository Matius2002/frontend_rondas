import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import { LoginService } from '../../Services/Seguridad/auth.service';

interface Privilegio
{ id: number, nombrePrivilegio: string, enabled: boolean }

interface Rol
{ id: number, nombreRol: string, enabled: boolean, privilegios: Privilegio[] }

interface Usuario
{
  id: number; nombres: string; apellidos: string; identificationNumber: string;
  telefono: string; roles: Rol[]
  username: string;password: string; clearance: number;
  enabled: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
export class LoginComponent implements OnInit
{
  loginForm!: FormGroup;

  invalidEmail: boolean = false;
  emailNotFound: boolean = false;

  passwordRequired: boolean = false;
  passwordWrong: boolean = false;

  newUser: Usuario =
    {
      id: 0, nombres: '', apellidos: '',
      identificationNumber: '', telefono: '', roles: [],
      username: '', password: '', enabled: true, clearance: 0
    }

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService, private router: Router, private apiService: LoginService) { }

  ngOnInit(): void
  {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get username() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit()
  {
    const formData = this.loginForm.value;
    console.log(formData);
    localStorage.setItem('username', formData.username);
    this.apiService.login(formData).subscribe(resdata =>{
      if(resdata){
        this.router.navigate(['/rondas']);
      }
    })
  }

  checkEmailValidity()
  {
    if (this.username?.invalid)
    { this.invalidEmail = true; }
    else { this.invalidEmail = false; }
  }

  isBlankSpace(checkedString: string)
  {
    if (checkedString.trim() == "")
    { return true; }
    else { return false; }
  }

  trimString(toTrim: string)
  { return toTrim.trim(); }

  protected readonly localStorage = localStorage;
}
