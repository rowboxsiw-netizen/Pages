
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PaperViewerComponent } from './components/paper-viewer/paper-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HomeComponent, PaperViewerComponent]
})
export class AppComponent {
  view = signal<'home' | 'paper'>('home');

  startPaper(studentName: string) {
    if (studentName.trim()) {
      this.view.set('paper');
    }
  }
}
