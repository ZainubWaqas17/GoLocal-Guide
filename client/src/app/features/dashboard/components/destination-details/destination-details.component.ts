import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicGuard } from '../../../../core/guards/public.guard';
import { BookingService, Destination } from '../../services/booking.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  destination: Destination | undefined;
  similarDestinations: Destination[] = [];
  selectedImageIndex = 0;
  imageGallery: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private publicGuard: PublicGuard,
    private toastr: ToastrService,
    private dialogService: DialogService,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDestination(id);
    }
  }

  loadDestination(id: string): void {
    this.bookingService.getDestinationById(id).subscribe(
      destination => {
        if (destination) {
          this.destination = destination;
          this.imageGallery = [destination.image, ...destination.subImages];
          this.loadSimilarDestinations(destination.type);
        }
      }
    );
  }

  loadSimilarDestinations(type: string): void {
    this.bookingService.getAllDestinations().subscribe(
      destinations => {
        this.similarDestinations = destinations
          .filter(d => d.type === type && d.id !== this.destination?.id)
          .slice(0, 3);
      }
    );
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  getAmenityIcon(amenity: string): string {
    const iconMap: { [key: string]: string } = {
      'Guide': 'bi bi-person-badge-fill',
      'Transportation': 'bi bi-truck-front-fill',
      'Meals': 'bi bi-cup-hot-fill',
      'Accommodation': 'bi bi-house-door-fill',
      'WiFi': 'bi bi-wifi',
      'Pool': 'bi bi-water',
      'Breakfast': 'bi bi-egg-fried',
      'Parking': 'bi bi-p-circle-fill',
      'Room Service': 'bi bi-bell-fill',
      'Gym': 'bi bi-bicycle',
      'Spa': 'bi bi-heart-pulse-fill',
      'Restaurant': 'bi bi-cup-straw',
      'Bar': 'bi bi-cup-fill',
      'Air Conditioning': 'bi bi-thermometer-snow',
      'Laundry': 'bi bi-washing-machine',
      'Beach Access': 'bi bi-umbrella-fill',
      'Free Parking': 'bi bi-p-circle-fill',
      'Airport Shuttle': 'bi bi-airplane-fill',
      'Concierge': 'bi bi-person-circle',
      '24/7 Front Desk': 'bi bi-clock-fill',
      'Photography': 'bi bi-camera-fill',
      'Daily Tours': 'bi bi-compass-fill',
      'Equipment': 'bi bi-tools',
      'Safety Gear': 'bi bi-shield-fill-check'
    };
    return iconMap[amenity] || 'bi bi-check-circle-fill';
  }

  viewSimilarDestination(id: string): void {
    this.router.navigate(['/dashboard/destination', id]).then(() => {
      window.scrollTo(0, 0);
      this.loadDestination(id); // Reload the destination data
    });
  }

  proceedToBooking(): void {
    if (!this.publicGuard.isAuthenticated()) {
      this.dialogService.showLoginPrompt('You need to login to make a booking.').subscribe(result => {
        if (result) {
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this.router.url }
          });
        }
      });
      return;
    }
    if (this.destination) {
      this.router.navigate(['/dashboard/booking', this.destination.id]);
    }
  }
}

