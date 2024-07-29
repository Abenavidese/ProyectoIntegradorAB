import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionRComponent } from './devolucion-r.component';

describe('DevolucionRComponent', () => {
  let component: DevolucionRComponent;
  let fixture: ComponentFixture<DevolucionRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolucionRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
