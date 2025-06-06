import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketInfoDialogueComponent } from './bucket-info-dialogue.component';

describe('BucketInfoDialogueComponent', () => {
  let component: BucketInfoDialogueComponent;
  let fixture: ComponentFixture<BucketInfoDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketInfoDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketInfoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
