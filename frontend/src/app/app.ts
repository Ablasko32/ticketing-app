import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ToastsContainer } from './shared/components/toasts-container/toasts-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
