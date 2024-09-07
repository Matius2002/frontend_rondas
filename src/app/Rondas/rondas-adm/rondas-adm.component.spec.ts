import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RondasAdmComponent } from './rondas-adm.component';

describe('RondasAdmComponent', () => {
  let component: RondasAdmComponent;
  let fixture: ComponentFixture<RondasAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RondasAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RondasAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
