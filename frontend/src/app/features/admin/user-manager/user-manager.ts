import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { UserRow } from './user-row/user-row';
import { Button } from '../../../shared/components/button/button';
import { ModalService } from '../../../core/services/modal.service';
import { AddNewUser } from './add-new-user/add-new-user';
import { UserManagerService } from '../../../core/services/userManager.service';
import { IUser } from '../../../core/models/user.model';
import { ToastService } from '../../../core/services/toast.service';
import { Loader } from '../../../shared/components/loader/loader';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private destroyRef = inject(DestroyRef);
  private modalService = inject(ModalService);
  private userManagerService = inject(UserManagerService);
  private toastService = inject(ToastService);

  openAddModal() {
    this.modalService.setOpen(AddNewUser);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.userManagerService.refresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers() {
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
