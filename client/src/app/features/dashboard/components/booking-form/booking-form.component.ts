import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.services';
import { Booking, BookingService, Destination, SearchData } from '../../services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  destination: Destination | undefined;
  bookingForm: FormGroup;
  totalPrice = 0;
  numberOfNights = 0;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.bookingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{10,}$/)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      specialRequests: [''],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validator: this.dateRangeValidator });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingService.getDestinationById(id).subscribe(
        destination => {
          this.destination = destination;
          if (!this.destination) {
            this.router.navigate(['/dashboard']);
          } else {
            this.autofillForm();
          }
        }
      );
    } else {
      this.router.navigate(['/dashboard']);
    }

    this.bookingForm.get('checkInDate')?.valueChanges.subscribe(() => this.updatePrice());
    this.bookingForm.get('checkOutDate')?.valueChanges.subscribe(() => this.updatePrice());
  }

  dateRangeValidator(form: FormGroup) {
    const checkIn = form.get('checkInDate')?.value;
    const checkOut = form.get('checkOutDate')?.value;
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      form.get('checkOutDate')?.setErrors({ 'invalidDateRange': true });
    } else {
      form.get('checkOutDate')?.setErrors(null);
    }
  }

  autofillForm() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.bookingForm.patchValue({
        firstName: currentUser.name.split(' ')[0],
        lastName: currentUser.name.split(' ')[1] || '',
        email: currentUser.email
      });
    }

    this.bookingService.getSearchData().subscribe((searchData: SearchData | null) => {
      if (searchData) {
        this.bookingForm.patchValue({
          checkInDate: this.datePipe.transform(searchData.startDate, 'yyyy-MM-dd'),
          checkOutDate: this.datePipe.transform(searchData.endDate, 'yyyy-MM-dd'),
          guests: searchData.guests
        });
      }
    });

    this.updatePrice();
  }

  updatePrice(): void {
    if (!this.destination) return;

    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);

    if (checkIn && checkOut && checkOut > checkIn) {
      this.numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      this.totalPrice = parseFloat((this.numberOfNights * this.destination.price).toFixed(2));
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.bookingForm.valid && this.destination) {
      const formValue = this.bookingForm.value;
      const booking: Booking = {
        destinationId: this.destination.id,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        checkInDate: this.datePipe.transform(formValue.checkInDate, 'yyyy-MM-dd') || '',
        checkOutDate: this.datePipe.transform(formValue.checkOutDate, 'yyyy-MM-dd') || '',
        guests: formValue.guests,
        specialRequests: formValue.specialRequests,
        totalPrice: this.totalPrice
      };

      this.bookingService.saveBooking(booking).subscribe(
        response => {
          console.log('Booking saved successfully:', response);
          this.bookingService.setBooking(booking);
          this.router.navigate(['/dashboard/booking-confirmation']);
        },
        error => {
          console.error('Error saving booking:', error);
          this.errorMessage = 'An error occurred while saving your booking. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}

