import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  className$;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.className$ = fromEvent(this.document, 'wheel').pipe(
      map((event) => {
        return event['wheelDeltaY'];
      }),
      filter((event) => {
        return Number.isInteger(event);
      }),
      switchMap((wheelDelta) => {
        return wheelDelta > 0 ? of('') : of('hidden');
      })
    );
  }
}
