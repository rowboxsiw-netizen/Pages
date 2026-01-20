
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../page/page.component';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-paper-viewer',
  standalone: true,
  templateUrl: './paper-viewer.component.html',
  styleUrls: ['./paper-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PageComponent]
})
export class PaperViewerComponent implements OnInit, OnDestroy {
  paperService = inject(PaperService);
  paper = computed(() => this.paperService.questionPaper());
  
  isMobileView = signal(false);
  currentPage = signal(1); 
  isSaving = signal(false);

  totalPages = computed(() => this.paper()?.totalPages ?? 0);

  // Computed property to drive the desktop book-flip animation.
  // It calculates the right-hand page of the current spread.
  desktopBookStatePage = computed(() => {
    if (this.currentPage() <= 1) return 1;
    // Calculates the start of the spread and adds 1 to get the right page.
    return Math.floor((this.currentPage() - 2) / 2) * 2 + 3;
  });

  // Computed property for the page number display text.
  pageDisplay = computed(() => {
    if (this.isMobileView() || !this.paper()) {
      return `${this.currentPage()}`;
    }

    const page = this.currentPage();
    const total = this.totalPages();

    if (page === 1) return '1';
    // If we are on the last page, just show that page number.
    if (page >= total) return `${total}`;

    const leftPageOfSpread = Math.floor((page - 2) / 2) * 2 + 2;
    return `${leftPageOfSpread} - ${leftPageOfSpread + 1}`;
  });

  constructor() {
    // Binding with an arrow function to preserve `this` context
    this.onResize = this.onResize.bind(this);
  }

  ngOnInit() {
    this.onResize(); // Initial check
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
    this.paperService.stopTimer();
  }

  private onResize(): void {
    this.isMobileView.set(window.innerWidth < 1024);
  }

  flipNext() {
    this.currentPage.update(p => Math.min(p + 1, this.totalPages()));
  }

  flipPrev() {
    this.currentPage.update(p => Math.max(p - 1, 1));
  }

  async saveAndExit() {
    this.isSaving.set(true);
    await this.paperService.saveProgress();
    this.isSaving.set(false);
    alert('Progress saved!');
  }
}
