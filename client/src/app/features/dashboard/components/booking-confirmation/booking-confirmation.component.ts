import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, BookingService, Destination } from '../../services/booking.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  destination: Destination | undefined;
  bookingReference: string= '';

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bookingService.getCurrentBooking().subscribe(booking => {
      if (!booking) {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.booking = booking;
      this.bookingReference = this.bookingService.generateConfirmationNumber(booking);
      this.bookingService.getDestinationById(booking.destinationId).subscribe(
        destination => {
          this.destination = destination;
        }
      );
    });
  }


  returnToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

