import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs'; 
import { Subject } from 'rxjs';
import { AlertDialogYesnoComponent } from '../alert-dialog-yesno/alert-dialog-yesno.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(AlertDialogYesnoComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
