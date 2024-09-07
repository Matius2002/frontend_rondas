import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRondaComponent } from './create-ronda.component';

describe('CreateRondaComponent', () => {
  let component: CreateRondaComponent;
  let fixture: ComponentFixture<CreateRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRondaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
