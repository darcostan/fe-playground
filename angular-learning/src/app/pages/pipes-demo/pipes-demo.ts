import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe, AsyncPipe } from '@angular/common';
import { Observable, interval, map } from 'rxjs';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength = 50, ellipsis = '...'): string {
    if (!value || value.length <= maxLength) return value;
    return value.substring(0, maxLength) + ellipsis;
  }
}

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search.trim()) return value;
    const regex = new RegExp(`(${search})`, 'gi');
    return value.replace(regex, '<mark>$1</mark>');
  }
}

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, CurrencyPipe, DecimalPipe, PercentPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, JsonPipe, TruncatePipe, HighlightPipe, AsyncPipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.scss'
})
export class PipesDemo {
  now = new Date();
  price = signal(1234.5678);
  ratio = signal(0.756);
  longText = signal('Angular pipes are a simple way to transform values in a template. They take data as input, transform it, and display the desired output.');
  searchTerm = signal('');
  sampleText = 'Welcome to the Angular pipes demonstration page!';

  fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  ticker$: Observable<string> = interval(1000).pipe(
    map(n => `Tick #${n + 1} at ${new Date().toLocaleTimeString()}`)
  );

  sampleObject = {
    framework: 'Angular',
    version: 21,
    features: ['signals', 'standalone', 'control flow'],
  };

  updateSearchTerm(value: string) { this.searchTerm.set(value); }
}
