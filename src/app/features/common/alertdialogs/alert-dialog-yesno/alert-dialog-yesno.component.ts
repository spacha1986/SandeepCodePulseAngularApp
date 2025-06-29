import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert-dialog-yesno',
  templateUrl: './alert-dialog-yesno.component.html',
  styleUrls: ['./alert-dialog-yesno.component.css']
})
export class AlertDialogYesnoComponent implements OnInit {

  @Input()
  title: string | undefined;
  @Input()
  message: string | undefined;
  @Input() btnOkText: string | undefined;
  @Input() btnCancelText: string | undefined;

  constructor(private activeModal: NgbActiveModal) { }
   
  ngOnInit() {
    
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss(false);
  }
}
