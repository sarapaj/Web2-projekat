import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenutnaLokacijaComponent } from './trenutna-lokacija.component';

describe('TrenutnaLokacijaComponent', () => {
  let component: TrenutnaLokacijaComponent;
  let fixture: ComponentFixture<TrenutnaLokacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrenutnaLokacijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenutnaLokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
