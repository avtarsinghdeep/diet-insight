import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageImagePopComponent } from './message-image-pop.component';

describe('MessageImagePopComponent', () => {
  let component: MessageImagePopComponent;
  let fixture: ComponentFixture<MessageImagePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageImagePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageImagePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
