import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneReviewDialogueComponent } from './step-one-review-dialogue.component';

describe('StepOneReviewDialogueComponent', () => {
  let component: StepOneReviewDialogueComponent;
  let fixture: ComponentFixture<StepOneReviewDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOneReviewDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOneReviewDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
