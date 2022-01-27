import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // we create new variable-stream as type Subject (observable+we can emit events)
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string | any {
    const expDate = new Date(JSON.stringify(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any>{
    user.returnSecureToken = true
    //request for authorization
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        // tap is used when you want to affect outside state with a notification without altering the notification
        tap(this.setToken),
        // catchError operator for processing errors; the bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    // !! transforms variables into boolean (for instance if string is empty it will be false)
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch(message) {
      // inside of cases we need to report that there is some error and process it
      case 'EMAIL_NOT_FOUND':
        // next() emits new event/value (we dispatch message that we need to take out)
        this.error$.next('Email not found')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password')
        break
    }

    // returning observable from error (handleerror function must return observable in catcherror operator function)
    return throwError(() => error)
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      console.log(response)
      // + before response to convert it in number and * 1000 to make it in ms
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}

