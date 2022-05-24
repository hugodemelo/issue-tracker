import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../services/issues.service';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: [ './issue-list.component.css' ]
})
export class IssueListComponent implements OnInit {

  issues!: Issue[];
  showReportIssue = false;

  constructor(private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseReport(): void {
    this.showReportIssue = false;
    this.getIssues();
  }

  private getIssues(): void {
    this.issues = this.issueService.getPendingIssues();
  }
}
