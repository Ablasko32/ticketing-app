import { Component, computed, effect, input, signal } from '@angular/core';
import { LucideAngularModule, Plus, Trash } from 'lucide-angular';
import { Button } from '../button/button';
import { FormControl } from '@angular/forms';

export interface IFile {
  id: string;
  file: File;
}

@Component({
  selector: 'app-file-drop-zone',
  imports: [LucideAngularModule, Button],
  templateUrl: './file-drop-zone.html',
  styleUrl: './file-drop-zone.css',
})
export class FileDropZone {
  disabled = input(false);
  acceptedFileList = input<string[]>();
  fileList = signal<IFile[]>([]);
  plusIcon = Plus;
  trashIcon = Trash;
  control = input.required<FormControl<IFile[]>>();

  getAcceptedFileInputs = computed(() => {
    const list = this.acceptedFileList();
    return list && list.length > 0 ? list.join(',') : '';
  });

  constructor() {
    effect(() => {
      this.control().setValue(this.fileList(), { emitEvent: true });
    });
  }

  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const updateFileArray: IFile[] = Array.from(input.files).map((file) => {
        return {
          id: crypto.randomUUID(),
          file: file,
        };
      });
      const currentFileArray = this.fileList();
      this.fileList.set([...currentFileArray, ...updateFileArray]);
    }
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    if (this.disabled()) return;
    if (!e.dataTransfer) return;
    const eventFiles = Array.from(e.dataTransfer.files);
    const validFiles = eventFiles.filter((file) => {
      if (this.acceptedFileList()) {
        if (this.acceptedFileList()?.includes(file.type)) {
          return file;
        }
      } else {
        return file;
      }
      return;
    });
    if (validFiles.length > 0) {
      const newFiles: IFile[] = Array.from(validFiles).map((file) => ({
        id: crypto.randomUUID(),
        file: file,
      }));
      console.log('Files dropped:', newFiles);
      this.fileList.update((prev) => [...prev, ...newFiles]);
    }
  }

  handleRemoveFile(id: string) {
    const currentList = this.fileList();
    this.fileList.set(currentList.filter((f) => f.id !== id));
  }
}
