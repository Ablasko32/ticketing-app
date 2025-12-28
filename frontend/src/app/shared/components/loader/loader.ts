import { Component } from '@angular/core';
import { LucideAngularModule, Loader as LoaderIcon } from 'lucide-angular';

@Component({
  selector: 'app-loader',
  imports: [LucideAngularModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loaderIcon = LoaderIcon;
}
