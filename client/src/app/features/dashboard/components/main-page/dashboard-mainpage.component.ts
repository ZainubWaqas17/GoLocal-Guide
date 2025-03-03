import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicGuard } from '../../../../core/guards/public.guard';
import { AuthService } from '../../../../core/services/auth.services';
import { BookingService, Destination } from '../../services/booking.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dashboard-mainpage',
  templateUrl: './dashboard-mainpage.component.html',
  styleUrls: ['./dashboard-mainpage.component.css']
})
export class DashboardMainpageComponent implements OnInit {
  username: string = 'Guest';
  searchForm: FormGroup;
  selectedCategory = 'hotel';
  filteredDestinations: Destination[] = [];
  destinations: Destination[] = [];
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private publicGuard: PublicGuard,
    private toastr: ToastrService,
    private dialogService: DialogService,

  ) {
    const today = new Date();
    this.minDate = today;
    
    this.searchForm = this.fb.group({
      destination: [''],
      startDate: [null, [Validators.required, this.minDateValidator(today)]],
      endDate: [null, [Validators.required, this.minDateValidator(today)]],
      guests: [1, [Validators.required, Validators.min(1)]]
    }, { validator: this.dateRangeValidator });

    // Update end date min value when start date changes
    this.searchForm.get('startDate')?.valueChanges.subscribe((date) => {
      const endDateControl = this.searchForm.get('endDate');
      if (date && endDateControl?.value && new Date(endDateControl.value) <= new Date(date)) {
        endDateControl.setValue(null);
      }
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.name) {
      this.username = currentUser.name;
    }

    this.bookingService.getAllDestinations().subscribe(
      destinations => {
        this.destinations = destinations;
        this.filterDestinations();
      },
      error => {
        console.error('Error fetching destinations:', error);
        this.destinations = [];
        this.filterDestinations();
      }
    );
  }

  private minDateValidator(minDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const date = new Date(control.value);
      return date < minDate ? { 'minDate': true } : null;
    };
  }

  private dateRangeValidator(form: FormGroup) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        form.get('endDate')?.setErrors({ 'invalidDateRange': true });
        return { 'invalidDateRange': true };
      }
    }
    return null;
  }
  
  setCategory(category: string): void {
    this.selectedCategory = category;
    this.filterDestinations();
  }

  filterDestinations(): void {
    if (!this.destinations) {
      this.filteredDestinations = [];
      return;
    }

    this.filteredDestinations = this.destinations.filter(dest => {
      const matchesCategory = dest.type === this.selectedCategory;
      const searchTerm = this.searchForm.get('destination')?.value?.toLowerCase() || '';
      const matchesSearch = !searchTerm || 
                          dest.name.toLowerCase().includes(searchTerm) ||
                          dest.location.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }

  onSearch(): void {
    if (!this.publicGuard.isAuthenticated()) {
      this.toastr.info('Login to access all features');
    if (this.searchForm.valid) {
      this.filterDestinations();
      this.bookingService.setSearchData(this.searchForm.value);
    }
  }
  }

  viewDetails(destination: Destination): void {
    if (!destination || !destination.id) {
      console.error('Invalid destination:', destination);
      return;
    }

    console.log('Navigating to destination:', destination.id);
    this.router.navigate(['/dashboard/destination', destination.id]);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>, type: 'start' | 'end'): void {
    const date = event.value;
    if (date) {
      if (type === 'start') {
        this.searchForm.get('startDate')?.setValue(date);
      } else {
        this.searchForm.get('endDate')?.setValue(date);
      }
    }
  }

  onDateSelection(event: any) {
    const startDate = this.searchForm.get('startDate');
    const endDate = this.searchForm.get('endDate');

    if (startDate && endDate) {
      const start = event.start;
      const end = event.end;

      if (start && !end) {
        startDate.setValue(start);
        endDate.setValue(null);
      } else if (start && end) {
        startDate.setValue(start);
        endDate.setValue(end);
      }
    }
  }
}

