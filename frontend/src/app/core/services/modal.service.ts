import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  inject,
  EnvironmentInjector,
  createComponent,
} from '@angular/core';
import { Modal } from '../../shared/components/modal/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<any> | null = null;
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  setOpen(component: any, data?: any) {
    this.closeModal();

    this.modalRef = createComponent(Modal, {
      environmentInjector: this.injector,
    });

    const contentRef = createComponent(component, {
      environmentInjector: this.injector,
    });

    if (data) {
      Object.assign(contentRef.instance as any, data);
    }

    const modalElement = this.modalRef.location.nativeElement;
    const contentElement = contentRef.location.nativeElement;

    this.appRef.attachView(contentRef.hostView);
    this.appRef.attachView(this.modalRef.hostView);

    document.body.appendChild(modalElement);
    modalElement.querySelector('.modal-content')?.appendChild(contentElement);

    Promise.resolve().then(() => {
      contentRef?.changeDetectorRef.detectChanges();
      this.modalRef?.changeDetectorRef.detectChanges();
    });

    // Handle modal close
    this.modalRef.instance.closed?.subscribe(() => {
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
