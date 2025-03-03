import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: 'features.component.html',
  styleUrls: ['features.component.css']
})
export class FeaturesComponent {
  features = [
    {
      icon: 'bi bi-shield-check',
      title: 'Safe & Reliable Tours',
      description: 'Experience verified and secure local tours with trusted guides and guaranteed satisfaction.'
    },
    {
      icon: 'bi bi-map',
      title: 'Local Expertise',
      description: 'Discover hidden gems and authentic experiences with knowledgeable local guides.'
    },
    {
      icon: 'bi bi-star',
      title: 'Personalized Experience',
      description: 'Get customized tours that match your interests and preferences perfectly.'
    },
    {
      icon: 'bi bi-people',
      title: 'Community-Driven',
      description: 'Join a thriving community of travelers, guides, and local businesses.'
    }
  ];
}