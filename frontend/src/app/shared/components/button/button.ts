import { Component, input, output, computed } from '@angular/core';
import { LucideAngularModule, Loader, LucideIconData } from 'lucide-angular';

type TButtonVariants = 'primary' | 'secondary';
type TButtonSizes = 'sm' | 'md' | 'lg' | 'full';
type TButtonTypes = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  imports: [LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<TButtonVariants>('primary');
  disabled = input<boolean>(false);
  size = input<TButtonSizes>('md');
  type = input<TButtonTypes>('button');
  loading = input<boolean>(false);
  icon = input<LucideIconData>();
  text = input<string>();
  ariaLabel = input<string>();
  loaderIcon = Loader;
  btnClick = output<MouseEvent>();

  iconOnly = computed(() => !this.text() && !!this.icon());
  buttonClasses = computed(() => {
    const classes = ['btn', `btn--${this.variant()}`, `btn--${this.size()}`];
    if (this.iconOnly()) {
      classes.push('btn--icon-only');
    }
    return classes.join(' ');
  });

  iconSize = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 13;
      case 'md':
        return 15;
      case 'lg':
        return 18;
      default:
        return 15;
    }
  });

  onClick(event: MouseEvent) {
    this.btnClick.emit(event);
  }
}
