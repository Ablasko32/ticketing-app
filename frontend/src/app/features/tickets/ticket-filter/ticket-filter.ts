import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export type TFilter = 'all' | 'user';
export const ALLOWED_FILTERS = ['all', 'user'];

@Component({
  selector: 'app-ticket-filter',
  imports: [],
  templateUrl: './ticket-filter.html',
  styleUrl: './ticket-filter.css',
})
export class TicketFilter implements OnInit {
  value = signal<TFilter>('all');
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const filter = params.get('filter');

      if (filter && ALLOWED_FILTERS.includes(filter)) {
        this.value.set(filter as TFilter);
      } else {
        this.updateUrl(this.value());
      }
    });
  }

  handleFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value as TFilter;
    this.updateUrl(newValue);
  }

  private updateUrl(value: TFilter) {
    this.router.navigate([], {
      queryParams: { filter: value },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
