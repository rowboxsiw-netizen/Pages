
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../page/page.component';
import { PaperService } from '../../services/paper.service';
import { QuestionPaper } from '../../models/paper.model';

@Component({
  selector: 'app-paper-viewer',
  templateUrl: './paper-viewer.component.html',
  styleUrls: ['./paper-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PageComponent]
})
export class PaperViewerComponent implements OnDestroy {
  paperService = inject(PaperService);
  paper = computed(() => this.paperService.questionPaper());
  
  // Represents the page number currently open to the right. 
  // Page 1 is the cover, so we start with page 2 on the right.
  // We see pages `currentPage - 1` and `currentPage`.
  currentPage = signal(1); 
  isSaving = signal(false);

  totalPages = computed(() => this.paper()?.totalPages ?? 0);

  flipNext() {
    this.currentPage.update(p => Math.min(p + 2, this.totalPages()));
  }

  flipPrev() {
    this.currentPage.update(p => Math.max(p - 2, 1));
  }

  async saveAndExit() {
    this.isSaving.set(true);
    await this.paperService.saveProgress();
    this.isSaving.set(false);
    // In a real app with routing, you would navigate away here.
    // For now, we just show a message.
    alert('Progress saved!');
  }

  ngOnDestroy() {
    this.paperService.stopTimer();
  }
}
