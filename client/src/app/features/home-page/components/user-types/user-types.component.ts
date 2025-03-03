import { Component } from '@angular/core';

@Component({
  selector: 'app-user-types',
  templateUrl: 'user-types.component.html',
  styleUrls: ['user-types.component.css']
})
export class UserTypesComponent {
  activeType = 0;
  userTypes = [
    {
      title: 'Tourists',
      icon: 'bi bi-compass',
      description: 'Discover authentic local experiences and create unforgettable memories with trusted guides.',
      image: 'assets/imgs/tourist1.jpg'
    },
    {
      title: 'Local Guides',
      icon: 'bi bi-people',
      description: 'Share your local expertise and earn while showing travelers the best of your city.',
      image: 'assets/imgs/guide1.jpg'
    },
    {
      title: 'Business Owners',
      icon: 'bi bi-building',
      description: 'Connect with travelers and grow your business by showcasing your services to a global audience.',
      image: 'assets/imgs/business1.jpg'
    }
  ];
}