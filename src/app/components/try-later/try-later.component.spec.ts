import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryLaterComponent } from './try-later.component';

describe('TryLaterComponent', () => {
  let component: TryLaterComponent;
  let fixture: ComponentFixture<TryLaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TryLaterComponent]
    });
    fixture = TestBed.createComponent(TryLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
