import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupovinaKarteComponent } from './kupovina-karte.component';

describe('KupovinaKarteComponent', () => {
  let component: KupovinaKarteComponent;
  let fixture: ComponentFixture<KupovinaKarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupovinaKarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupovinaKarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
