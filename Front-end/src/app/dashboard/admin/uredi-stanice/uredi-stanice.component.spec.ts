import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediStaniceComponent } from './uredi-stanice.component';

describe('UrediStaniceComponent', () => {
  let component: UrediStaniceComponent;
  let fixture: ComponentFixture<UrediStaniceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediStaniceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediStaniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
