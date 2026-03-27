import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-demo',
  template: `
    <div class="child-component">
      <strong>Child Component</strong> — value: {{ value() }}
    </div>
  `,
  styles: [`.child-component { background: #e8f4fd; border: 1px solid #bee3f8; border-radius: 6px; padding: 0.75rem 1rem; margin: 0.5rem 0; }`]
})
export class ChildDemo implements OnInit, OnChanges, OnDestroy {
  value = input<string>('');
  
  ngOnInit() { console.log('[ChildDemo] ngOnInit'); }
  ngOnChanges(changes: SimpleChanges) { console.log('[ChildDemo] ngOnChanges', changes); }
  ngOnDestroy() { console.log('[ChildDemo] ngOnDestroy'); }
}

@Component({
  selector: 'app-lifecycle-hooks',
  imports: [FormsModule, ChildDemo],
  templateUrl: './lifecycle-hooks.html',
  styleUrl: './lifecycle-hooks.scss'
})
export class LifecycleHooks implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  @ViewChild('logContainer') logContainer!: ElementRef;

  childValue = signal('Hello!');
  showChild = signal(true);
  hookLogs = signal<{hook: string, time: string, color: string}[]>([]);

  private log(hook: string, color = '#dd0031') {
    const time = new Date().toLocaleTimeString();
    this.hookLogs.update(logs => [{ hook, time, color }, ...logs.slice(0, 19)]);
  }

  ngOnInit() { this.log('ngOnInit', '#28a745'); }
  ngOnDestroy() { this.log('ngOnDestroy', '#dc3545'); }
  ngOnChanges(changes: SimpleChanges) { this.log(`ngOnChanges: ${JSON.stringify(Object.keys(changes))}`, '#fd7e14'); }
  ngAfterViewInit() { this.log('ngAfterViewInit', '#6f42c1'); }
  ngAfterViewChecked() { /* too frequent to log */ }
  ngAfterContentInit() { this.log('ngAfterContentInit', '#17a2b8'); }
  ngAfterContentChecked() { /* too frequent to log */ }

  updateChild(value: string) { this.childValue.set(value); }
  toggleChild() { this.showChild.update(v => !v); }
  clearLog() { this.hookLogs.set([]); }
}
