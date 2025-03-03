// import { Component, OnInit } from '@angular/core';
// import { forkJoin } from 'rxjs';
// import { Booking, BookingService, Destination } from '../../services/booking.service';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.css']
// })
// export class BookingComponent implements OnInit {
//   bookings: (Booking & { destinationName: string, confirmationNumber: string })[] = [];
//   isLoading = true;
//   error: string | null = null;

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     this.fetchBookings();
//   }

//   fetchBookings(): void {
//     this.bookingService.getUserBookings().subscribe(
//       (bookings) => {
//         const destinationRequests = bookings.map(booking => 
//           this.bookingService.getDestinationById(booking.destinationId)
//         );

//         forkJoin(destinationRequests).subscribe(
//           (destinations: (Destination | undefined)[]) => {
//             this.bookings = bookings.map((booking, index) => ({
//               ...booking,
//               destinationName: destinations[index]?.name || 'Unknown',
//               confirmationNumber: this.bookingService.generateConfirmationNumber(booking)
//             }));
//             this.isLoading = false;
//           },
//           (error) => {
//             this.error = 'Failed to load destination details. Please try again later.';
//             this.isLoading = false;
//           }
//         );
//       },
//       (error) => {
//         this.error = 'Failed to load bookings. Please try again later.';
//         this.isLoading = false;
//       }
//     );
//   }

  
// }

import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.services';
import { Booking, BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: (Booking & { destinationName: string, confirmationNumber: string })[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('Current user in component:', currentUser);

    if (!currentUser) {
      this.error = 'Please log in to view your bookings.';
      this.isLoading = false;
      return;
    }

    this.bookingService.getUserBookings(currentUser.id).subscribe({
      next: (bookings) => {
        console.log('Received bookings in component:', bookings);
        
        if (!bookings.length) {
          this.bookings = [];
          this.isLoading = false;
          return;
        }

        const destinationRequests = bookings.map(booking => 
          this.bookingService.getDestinationById(booking.destinationId).pipe(
            catchError(error => {
              console.error(`Error fetching destination ${booking.destinationId}:`, error);
              return of(undefined);
            })
          )
        );

        forkJoin(destinationRequests).subscribe({
          next: (destinations) => {
            console.log('Received destinations:', destinations);
            
            this.bookings = bookings.map((booking, index) => ({
              ...booking,
              destinationName: destinations[index]?.name || 'Unknown',
              confirmationNumber: booking.confirmationNumber || 
                this.bookingService.generateConfirmationNumber(booking)
            }));
            
            console.log('Final processed bookings:', this.bookings);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error processing destinations:', error);
            this.error = 'Failed to load destination details.';
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.error = 'Failed to load bookings.';
        this.isLoading = false;
      }
    });
  }
}