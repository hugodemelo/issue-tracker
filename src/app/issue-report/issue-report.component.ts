import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../services/issues.service';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: [ './issue-report.component.css' ]
})
export class IssueReportComponent implements OnInit {

  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;
  suggestedIssues: Issue[] = [];

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

    this.issueForm.controls[ 'title' ].valueChanges.subscribe(title => {
      this.suggestedIssues = this.issueService.getSuggestions(title);
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
