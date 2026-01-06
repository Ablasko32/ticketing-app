import { Component, computed, input } from '@angular/core';
import { LucideAngularModule, Flame } from 'lucide-angular';
import { TicketPriority } from '../../../../core/constants/ticket.constants';

@Component({
  selector: 'app-priority-flames',
  imports: [LucideAngularModule],
  templateUrl: './priority-flames.html',
  styleUrl: './priority-flames.css',
})
export class PriorityFlames {
  priority = input.required<TicketPriority>();
  flameIcon = Flame;

  priorityIndicator = computed(() => {
    switch (this.priority()) {
      case TicketPriority.LOW:
        return 1;
      case TicketPriority.MEDIUM:
        return 2;
      case TicketPriority.HIGH:
        return 3;
      default:
        return 0;
    }
  });
}
