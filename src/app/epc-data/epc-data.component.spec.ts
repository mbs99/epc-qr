import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpcDataComponent } from './epc-data.component';

describe('EpcDataComponent', () => {
  let component: EpcDataComponent;
  let fixture: ComponentFixture<EpcDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpcDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
