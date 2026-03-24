import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals-demo',
  imports: [FormsModule],
  templateUrl: './signals-demo.html',
  styleUrl: './signals-demo.scss'
})
export class SignalsDemo {
  // --- Basic signal ---
  firstName = signal('Angular');
  lastName = signal('Student');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  // --- Effect log ---
  effectLog: string[] = [];
  private nameEffect = effect(() => {
    this.effectLog = [`[${new Date().toLocaleTimeString()}] fullName changed to: "${this.fullName()}"`, ...this.effectLog.slice(0, 4)];
  });

  // --- linkedSignal ---
  options = signal(['Option A', 'Option B', 'Option C']);
  selected = linkedSignal(() => this.options()[0]);

  addOption() {
    const n = this.options().length + 1;
    this.options.update(o => [...o, `Option ${String.fromCharCode(64 + n)}`]);
  }

  // --- Number with transform ---
  temperature = signal(20);
  tempUnit = signal<'C' | 'F'>('C');
  displayTemp = computed(() => {
    if (this.tempUnit() === 'F') {
      return `${(this.temperature() * 9/5 + 32).toFixed(1)} °F`;
    }
    return `${this.temperature()} °C`;
  });

  // --- Signal with object ---
  user = signal({ name: 'Alice', age: 25, role: 'Developer' });
  incrementAge() { this.user.update(u => ({ ...u, age: u.age + 1 })); }
  
  updateFirstName(value: string) { this.firstName.set(value); }
  updateLastName(value: string) { this.lastName.set(value); }
  updateTemperature(value: number) { this.temperature.set(value); }
}
