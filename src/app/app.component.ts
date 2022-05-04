import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, map, pairwise, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  className$;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.className$ = fromEvent(this.document, 'scroll').pipe(
      map(() => {
        return this.document.documentElement.scrollTop;
      }),
      pairwise(),
      map(([prev, next]) => {
        return next > prev;
      }),
      distinctUntilChanged(),
      switchMap((isDistanceBigger: boolean) => {
        return isDistanceBigger ? of('hidden') : of('');
      })
    );
  }
}
