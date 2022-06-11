import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { issues } from '../../assets/mock-issues';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = issues;

  constructor() {
  }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue): void {
    issue.issueNo = Math.trunc(Math.random() * 1_000_000); // LOL
    this.issues.push(issue);
  }

  completeIssue(issue: Issue): void {
    const index = this.issues.findIndex(i => i === issue);
    this.issues[ index ] = {
      ...issue,
      completed: new Date()
    };
  }

  getSuggestions(title: string): Observable<Issue[]> {
    if (title.length > 2) {
      return of(this.issues.filter(issue => issue.title.includes(title)));
    }
    return of([]);
  }
}
