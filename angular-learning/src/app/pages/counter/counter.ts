import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  // Basic signal
  count = signal(0);
  
  // Computed signal - derived from count
  doubled = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);
  isPositive = computed(() => this.count() > 0);
  isNegative = computed(() => this.count() < 0);
  absValue = computed(() => Math.abs(this.count()));
  
  // Step size signal
  step = signal(1);
  
  increment() { this.count.update(v => v + this.step()); }
  decrement() { this.count.update(v => v - this.step()); }
  reset() { this.count.set(0); }
  setStep(value: number) { this.step.set(value); }
}
