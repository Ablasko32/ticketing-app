import { Component, inject, OnInit, signal } from '@angular/core';
import { UserRow } from './user-row/user-row';
import { Button } from '../../../shared/components/button/button';
import { ModalService } from '../../../core/services/modal.service';
import { AddNew } from '../../add-new/add-new';
import { UserManagerService } from '../../../core/services/userManager.service';
import { IUser } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-user-manager',
  imports: [UserRow, Button, Loader],
  templateUrl: './user-manager.html',
  styleUrl: './user-manager.css',
})
export class UserManager implements OnInit {
  users = signal<IUser[] | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  private modalService = inject(ModalService);
  private userManagerService = inject(UserManagerService);
  private toastService = inject(ToastService);

  openAddModal() {
    this.modalService.setOpen(AddNew);
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.userManagerService.getAllUsers().subscribe({
      next: (users) => {
        this.loading.set(false);
        this.users.set(users);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(error.error.message || 'Error fetching users');
        this.toastService.showToast(error.error.message || 'Error fetching users');
      },
    });
  }
}
