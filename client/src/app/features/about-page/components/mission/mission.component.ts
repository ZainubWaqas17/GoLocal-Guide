// src/app/components/about/mission.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: 'mission.component.html',
  styleUrls: ['mission.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms {{delay}}', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MissionComponent {
  missionCards = [
    {
      icon: 'bi bi-bullseye',
      title: 'Purpose',
      description: 'To revolutionize travel by making local experiences accessible and authentic'
    },
    {
      icon: 'bi bi-people',
      title: 'Community',
      description: 'Building bridges between travelers and local communities worldwide'
    },
    {
      icon: 'bi bi-globe',
      title: 'Impact',
      description: 'Supporting sustainable tourism and local economic growth'
    }
  ];
}