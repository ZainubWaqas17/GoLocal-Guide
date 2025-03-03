// src/app/components/about/team.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.css'],
  
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TeamComponent {
  teamMembers = [
    {
      name: 'John Steven',
      role: 'Founder & CEO',
      image: 'assets/imgs/man.png'
    },
    {
      name: 'Bill Wonk',
      role: 'Head of Operations',
      image: 'assets/imgs/girl.png'
    },
    {
      name: 'Monica Williams',
      role: 'Community Manager',
      image: 'assets/imgs/girl2.png'
    }
  ];
}