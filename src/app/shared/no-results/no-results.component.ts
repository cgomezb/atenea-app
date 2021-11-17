import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'atenea-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NoResultsComponent {
  @Input() message = 'No records found';
}
