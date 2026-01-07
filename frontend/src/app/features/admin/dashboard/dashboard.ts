import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Loader } from '../../../shared/components/loader/loader';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { IDashboardStats } from '../../../core/models/dashboard.models';
import { DashboardService } from '../../../core/services/dashboard.service';
import {
  LucideAngularModule,
  FileText,
  FolderOpen,
  CheckCheck,
  TrendingUp,
  AlertTriangle,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Loader, BaseChartDirective, LucideAngularModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dashboardStats = signal<IDashboardStats | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Icons
  fileText = FileText;
  folderOpen = FolderOpen;
  checkCheck = CheckCheck;
  trendingUp = TrendingUp;
  alertTriangle = AlertTriangle;

  private dashboardService = inject(DashboardService);

  priorityChartLabels = ['High Priority', 'Medium Priority', 'Low Priority'];
  priorityChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    },
  };

  priorityChartData = computed(() => {
    const stats = this.dashboardStats();
    if (!stats) return undefined;

    return {
      labels: this.priorityChartLabels,
      datasets: [
        {
          data: [stats.highPriorityTickets, stats.mediumPriorityTickets, stats.lowPriorityTickets],
          backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
          hoverBackgroundColor: ['#dc2626', '#d97706', '#2563eb'],
          borderWidth: 0,
        },
      ],
    };
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats.set(stats);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error fetching dashboard stats');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
