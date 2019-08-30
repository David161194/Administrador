import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestrosComponent } from './siniestros.component';

describe('SiniestrosComponent', () => {
  let component: SiniestrosComponent;
  let fixture: ComponentFixture<SiniestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiniestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
