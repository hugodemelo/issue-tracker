import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [ './confirm-dialog.component.css' ]
})
export class ConfirmDialogComponent {

  @Input() issueNo: number | null = null;
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm(status: boolean): void {
    this.confirm.emit(status);
    this.issueNo = null;
  }
}
