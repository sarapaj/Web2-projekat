import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutniciComponent } from './putnici.component';

describe('PutniciComponent', () => {
  let component: PutniciComponent;
  let fixture: ComponentFixture<PutniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
