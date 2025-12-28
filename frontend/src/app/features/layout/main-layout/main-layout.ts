import { Component } from '@angular/core';
import { Navigation } from '../../navigation/navigation';
import { RouterOutlet } from '@angular/router';
import { Modal } from '../../../shared/components/modal/modal';

@Component({
  selector: 'app-main-layout',
  imports: [Navigation, RouterOutlet, Modal],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
