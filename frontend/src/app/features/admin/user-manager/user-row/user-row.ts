import { Component, input, inject, signal, computed } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { UserManagerService } from '../../../../core/services/userManager.service';
import { ToastService } from '../../../../core/services/toast.service';
import { IUser } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-row',
  imports: [Button, LucideAngularModule, DatePipe],
  templateUrl: './user-row.html',
  styleUrl: './user-row.css',
})
export class UserRow {
  loading = signal<boolean>(false);
  userData = input.required<IUser>();
  trashIcon = Trash;

  private userManagerService = inject(UserManagerService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isOwnProfile = computed(() => {
    if (this.userData().id === this.authService.authStatus()!.userId) {
      return true;
    }
    return false;
  });

  handleDeleteUser() {
    this.loading.set(true);

    this.userManagerService.deleteUser(this.userData().id).subscribe({
      next: () => {
        this.loading.set(false);
        this.userManagerService.refreshUsers();
        this.toastService.showToast({
          title: 'Success',
          message: 'User deleted successfully',
          type: 'success',
        });
      },
      error: (error) => {
        this.loading.set(false);
        this.toastService.showToast({
          title: 'Error',
          message: error.error.message || 'Error deleting user',
          type: 'error',
        });
      },
    });
  }
}
