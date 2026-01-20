
import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Page, QuestionPaper } from '../../models/paper.model';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class PageComponent {
  page = input.required<Page>();
  paperService = inject(PaperService);
  paper = this.paperService.questionPaper;

  onAnswerChange(questionId: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.paperService.updateAnswer(questionId, target.value);
  }
}
