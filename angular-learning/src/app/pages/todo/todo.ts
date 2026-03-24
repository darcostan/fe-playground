import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
})
export class Todo {
  newTodoText = signal('');
  filter = signal<FilterType>('all');
  private nextId = 1;

  todos = signal<TodoItem[]>([
    { id: this.nextId++, text: 'Learn Angular Signals', completed: true, createdAt: new Date() },
    { id: this.nextId++, text: 'Build a Todo App', completed: false, createdAt: new Date() },
    { id: this.nextId++, text: 'Explore Reactive Forms', completed: false, createdAt: new Date() },
  ]);

  filteredTodos = computed(() => {
    const f = this.filter();
    return this.todos().filter(t => {
      if (f === 'active') return !t.completed;
      if (f === 'completed') return t.completed;
      return true;
    });
  });

  totalCount = computed(() => this.todos().length);
  activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);
  allCompleted = computed(() => this.todos().length > 0 && this.todos().every(t => t.completed));

  addTodo() {
    const text = this.newTodoText().trim();
    if (!text) return;
    this.todos.update(items => [...items, {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date()
    }]);
    this.newTodoText.set('');
  }

  toggleTodo(id: number) {
    this.todos.update(items =>
      items.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTodo(id: number) {
    this.todos.update(items => items.filter(t => t.id !== id));
  }

  clearCompleted() {
    this.todos.update(items => items.filter(t => !t.completed));
  }

  toggleAll() {
    const shouldComplete = !this.allCompleted();
    this.todos.update(items => items.map(t => ({ ...t, completed: shouldComplete })));
  }

  setFilter(f: FilterType) { this.filter.set(f); }
  
  updateNewTodoText(value: string) { this.newTodoText.set(value); }
}
