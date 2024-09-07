import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RondasMainComponent } from './rondas-main.component';

describe('RondasMainComponent', () => {
  let component: RondasMainComponent;
  let fixture: ComponentFixture<RondasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RondasMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RondasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
