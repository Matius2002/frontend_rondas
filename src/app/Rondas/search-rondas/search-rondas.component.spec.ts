import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRondasComponent } from './search-rondas.component';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { SearchRondaService } from '../../Services/search-ronda.service';

describe('SearchRondasComponent', () => {
  let component: SearchRondasComponent;
  let fixture: ComponentFixture<SearchRondasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRondasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchRondasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



