import { Component, input } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { LucideAngularModule, Trash } from 'lucide-angular';

@Component({
  selector: 'app-user-row',
  imports: [Button, LucideAngularModule],
  templateUrl: './user-row.html',
  styleUrl: './user-row.css',
})
export class UserRow {
  userData = input.required<any>();
  trashIcon = Trash;
}
