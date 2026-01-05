import {
  Directive,
  input,
  inject,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  effect,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TRoles } from '../../core/models/user.model';

@Directive({
  selector: '[appRole]',
  standalone: true,
})
export class RoleDirective {
  appRole = input<TRoles[]>(['user']);

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const roles = this.appRole();
      const userRole = this.authService.authStatus()!.role;

      const hasAccess = userRole && roles.includes(userRole);

      if (hasAccess) {
        if (this.viewContainerRef.length === 0) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
