import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: [ './issue-report.component.css' ]
})
export class IssueReportComponent implements OnInit {

  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.issueForm = this.formBuilder.group({
      title: [ '', Validators.required ],
      description: [ '' ],
      priority: [ '', Validators.required ],
      type: [ '', Validators.required ]
    });
  }

  addIssue() {
    if (this.issueForm) {
      if (this.issueForm.invalid) {
        this.issueForm.markAllAsTouched();
        return;
      } else {
        this.issueService.createIssue(this.issueForm.value);
        this.formClose.emit();
      }
    }
  }
}
