import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageUpgradeComponent } from './package-upgrade.component';

describe('PackageUpgradeComponent', () => {
  let component: PackageUpgradeComponent;
  let fixture: ComponentFixture<PackageUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
