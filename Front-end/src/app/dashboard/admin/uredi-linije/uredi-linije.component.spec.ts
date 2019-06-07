import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediLinijeComponent } from './uredi-linije.component';

describe('UrediLinijeComponent', () => {
  let component: UrediLinijeComponent;
  let fixture: ComponentFixture<UrediLinijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediLinijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediLinijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
