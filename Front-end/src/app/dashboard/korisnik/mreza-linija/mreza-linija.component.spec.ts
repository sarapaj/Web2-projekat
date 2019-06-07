import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrezaLinijaComponent } from './mreza-linija.component';

describe('MrezaLinijaComponent', () => {
  let component: MrezaLinijaComponent;
  let fixture: ComponentFixture<MrezaLinijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrezaLinijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrezaLinijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
