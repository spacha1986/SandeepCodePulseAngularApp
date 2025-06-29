import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogYesnoComponent } from './alert-dialog-yesno.component';

describe('AlertDialogYesnoComponent', () => {
  let component: AlertDialogYesnoComponent;
  let fixture: ComponentFixture<AlertDialogYesnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDialogYesnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogYesnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
