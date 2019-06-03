import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchatComponent } from './adminchat.component';

describe('AdminchatComponent', () => {
  let component: AdminchatComponent;
  let fixture: ComponentFixture<AdminchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
