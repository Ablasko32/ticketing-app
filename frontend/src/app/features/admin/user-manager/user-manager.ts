import { Component, inject, signal } from '@angular/core';
import { UserRow } from './user-row/user-row';
import { Button } from '../../../shared/components/button/button';
import { ModalService } from '../../../core/services/modal.service';
import { AddNew } from '../../add-new/add-new';
@Component({
  selector: 'app-user-manager',
  imports: [UserRow, Button],
  templateUrl: './user-manager.html',
  styleUrl: './user-manager.css',
})
export class UserManager {
  users = signal([
    { username: 'user1@email.com', createdAt: '2025-12-28' },
    { username: 'user2@email.com', createdAt: '2025-12-28' },
    { username: 'user3@email.com', createdAt: '2025-12-28' },
  ]);

  private modalService = inject(ModalService);

  openAddModal() {
    this.modalService.setOpen(AddNew);
  }
}
