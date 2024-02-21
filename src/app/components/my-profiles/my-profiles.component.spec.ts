import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilesComponent } from './my-profiles.component';

describe('MyProfilesComponent', () => {
  let component: MyProfilesComponent;
  let fixture: ComponentFixture<MyProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfilesComponent]
    });
    fixture = TestBed.createComponent(MyProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
