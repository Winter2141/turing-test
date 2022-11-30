import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Job } from './structure';

@Injectable({ providedIn: 'root' })
export class JobService {
  private jobURL = 'https://www.turing.com/api/remote-jobs';

  constructor(private http: HttpClient) {}

  getJobs(searchParams: any): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobURL, {
      params: searchParams,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}