import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBucketMenuComponent } from './switch-bucket-menu.component';

describe('SwitchBucketMenuComponent', () => {
  let component: SwitchBucketMenuComponent;
  let fixture: ComponentFixture<SwitchBucketMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchBucketMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchBucketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
