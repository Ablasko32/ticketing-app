import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [Button, LucideAngularModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
  standalone: true,
})
export class BackButton {
  arrowLeft = ArrowLeft;
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
