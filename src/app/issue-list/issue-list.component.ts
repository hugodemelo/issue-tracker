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
  selectedIssue: Issue | null = null;

  constructor(private readonly issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseReport(): void {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean): void {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

  private getIssues(): void {
    this.issues = this.issueService.getPendingIssues();
  }
}
