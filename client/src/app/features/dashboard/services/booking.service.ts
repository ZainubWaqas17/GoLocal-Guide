import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../core/services/auth.services';

export interface Destination {
  id: string;
  type: string;
  name: string;
  location: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  amenities: string[];
  availability: boolean;
  subImages: string[];
  description: string;
}

export interface Booking {
  id?: string;
  userId?: string;
  destinationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
  totalPrice: number;
  paymentStatus?: string;
  confirmationNumber?: string;
}
export interface SearchData {
  destination: string;
  startDate: Date;
  endDate: Date;
  guests: number;
}

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  private apiUrl = `${environment.apiBaseUrl}/api/destinations`;
  private apiUrl2 =`${environment.apiBaseUrl}/api/bookings`;

  private currentBooking = new BehaviorSubject<Booking | null>(null);
  private searchData = new BehaviorSubject<SearchData | null>(null);
  private bookings: Booking[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadStoredConfirmationNumbers();
    this.authService.currentUser$.subscribe(user => {
      console.log('Current user in BookingService:', user);
    });
  }

  setBooking(booking: Booking) {
    this.currentBooking.next(booking);
  }

  getCurrentBooking(): Observable<Booking | null> {
    return this.currentBooking.asObservable();
  }

  setSearchData(data: SearchData) {
    this.searchData.next(data);
  }

  getSearchData(): Observable<SearchData | null> {
    return this.searchData.asObservable();
  }

  calculateTotalPrice(
    pricePerNight: number,
    startDate: Date,
    endDate: Date
  ): number {
    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return pricePerNight * nights;
  }

  getDestinationById(id: string): Observable<Destination | undefined> {
    return this.getAllDestinations().pipe(
      map((destinations) => destinations.find((dest) => dest.id === id))
    );
  }

  // getAllDestinations(): Observable<Destination[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map((data) => {
  //       // Check if the data is an array and has at least one element
  //       if (Array.isArray(data) && data.length > 0) {
  //         // Directly return the destinations array
  //         return data;
  //       }
  //       // Return an empty array if data is not valid
  //       return [];
  //     }),
  //     catchError((error) => {
  //       console.error('Failed to fetch destinations:', error);
  //       // Return an observable with an error message
  //       return throwError(() => new Error('Failed to fetch destinations.'));
  //     })
  //   );
  // }

  // saveBooking(booking: Booking): Observable<any> {
  //   const currentUser = this.authService.currentUserValue;
  //   if (currentUser) {
  //     booking.userId = currentUser.id;
  //   }
  //   return this.http.post<any>(this.apiUrl2, booking).pipe(
  //     catchError((error) => {
  //       console.error('Failed to save booking:', error);
  //       return throwError(() => new Error('Failed to save booking.'));
  //     })
  //   );
  // }
  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${environment.apiBaseUrl}/api/destinations`)
      .pipe(
        map(destinations => destinations),
        catchError(error => {
          console.error('Failed to fetch destinations:', error);
          return throwError(() => new Error('Failed to fetch destinations.'));
        })
      );
  }
  
  // saveBooking(booking: Booking): Observable<any> {
  //   return this.http.post<any>(`${environment.apiBaseUrl}/api/bookings`, booking)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Failed to save booking:', error);
  //         return throwError(() => new Error('Failed to save booking.'));
  //       })
  //     );
  // }
  saveBooking(booking: Booking): Observable<any> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      booking.userId = currentUser.id; // Make sure userId is set
    }
    
    return this.http.post<any>(`${environment.apiBaseUrl}/api/bookings`, booking)
      .pipe(
        map(response => {
          console.log('Booking saved:', response); // Debug log
          return response;
        }),
        catchError(error => {
          console.error('Failed to save booking:', error);
          return throwError(() => new Error('Failed to save booking.'));
        })
      );
  }
  

  generateConfirmationNumber(booking: Booking): string {
    if (booking.confirmationNumber) {
      return booking.confirmationNumber;
    }
    const prefix = 'BK';
    const timestamp = new Date(booking.checkInDate)
      .getTime()
      .toString()
      .slice(-6);
    const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${timestamp}${suffix}`;
  }

  private loadStoredConfirmationNumbers(): void {
    this.bookings.forEach((booking) => {
      const key = `booking_${booking.id}_confirmation`;
      const storedConfirmationNumber = localStorage.getItem(key);
      if (storedConfirmationNumber) {
        booking.confirmationNumber = storedConfirmationNumber;
      }
    });
  }

  // getUserBookings(userId?: string): Observable<Booking[]> {
  //   const currentUser = this.authService.currentUserValue;
  //   if (!currentUser && !userId) {
  //     return throwError(() => new Error('User not authenticated'));
  //   }

  //   const effectiveUserId = userId || currentUser?.id;

  //   return this.http.get<Booking[]>(`${this.apiUrl2}`).pipe(
  //     map((bookings) =>
  //       bookings.filter((booking) => booking.userId === effectiveUserId)
  //     ),
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 404) {
  //         console.warn('No bookings found for user:', effectiveUserId);
  //         return [];
  //       }
  //       console.error('Failed to fetch user bookings:', error);
  //       return throwError(() => new Error('Failed to fetch user bookings.'));
  //     })
  //   );
  // }
  getUserBookings(userId?: string): Observable<Booking[]> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser && !userId) {
      return throwError(() => new Error('User not authenticated'));
    }
  
    const effectiveUserId = userId || currentUser?.id;
    console.log('Fetching bookings for userId:', effectiveUserId); // Debug log
    // Use the correct endpoint that filters by userId on the server
    return this.http.get<Booking[]>(`${this.apiUrl2}/user/${effectiveUserId}`).pipe(
      map(bookings => {
        console.log('Received bookings for user:', bookings); // Debug log
        return bookings;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to fetch user bookings:', error);
        if (error.status === 404) {
          return []; // Return empty array if no bookings found
        }
        return throwError(() => new Error('Failed to fetch user bookings.'));
      })
    );
  }

  
}
