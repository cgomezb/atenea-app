import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'atenea-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() show = false;
  @Input() size = '100';
  @Input() opacity = 1;
}
