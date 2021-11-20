import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchControlComponent {
  @Output() search = new EventEmitter<string>();

  query = '';

  onSearch() {
    if (!this.query.trim()) {
      return;
    }

    this.search.emit(this.query);
  }

  onClear(): void {
    this.query = '';
    this.search.emit('');
  }
}
