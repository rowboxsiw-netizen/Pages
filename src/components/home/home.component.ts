
import { Component, ChangeDetectionStrategy, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent {
  start = output<string>();
  paperService = inject(PaperService);
  studentName = signal('');
  isLoading = signal(false);

  startNewSession() {
    if (this.studentName().trim()) {
      this.paperService.startSession(this.studentName());
      this.start.emit(this.studentName());
    }
  }

  async loadSession() {
    if (this.studentName().trim()) {
      this.isLoading.set(true);
      await this.paperService.loadProgress(this.studentName());
      this.isLoading.set(false);
      this.start.emit(this.studentName());
    }
  }
}
