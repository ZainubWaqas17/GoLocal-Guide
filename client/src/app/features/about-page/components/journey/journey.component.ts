// src/app/components/about/journey.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-journey',
  templateUrl: 'journey.component.html',
  styleUrls: ['journey.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms {{delay}}', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class JourneyComponent {
  journeyItems = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'GoLocal Guide was founded with a vision to transform local tourism'
    },
    {
      year: '2022',
      title: 'Growing Community',
      description: 'Expanded to 50+ cities and built a network of trusted local guides'
    },
    {
      year: '2023',
      title: 'Innovation',
      description: 'Launched new features to enhance the travel experience'
    },
    {
      year: '2024',
      title: 'Global Impact',
      description: 'Making a difference in local communities worldwide'
    }
  ];
}