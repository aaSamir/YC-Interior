import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { ContactMessageRequest, ContactMessageResponse } from '../models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  private apiUrl = `${environment.apiUrl}/api/contact-messages`;

  constructor(private http: HttpClient) {}

  submitMessage(request: ContactMessageRequest): Observable<ApiResponse<ContactMessageResponse>> {
    return this.http.post<ApiResponse<ContactMessageResponse>>(this.apiUrl, request).pipe(
      catchError(error => {
        console.error('Error submitting contact message:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        throw error;
      })
    );
  }
}
