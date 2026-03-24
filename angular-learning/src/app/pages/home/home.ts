import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Feature {
  title: string;
  description: string;
  route: string;
  icon: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  readonly features: Feature[] = [
    {
      title: 'Counter',
      description: 'Learn basic signal-based reactivity with a counter component. Demonstrates signal(), computed(), and template bindings.',
      route: '/counter',
      icon: '🔢',
      tags: ['signals', 'computed', 'template binding']
    },
    {
      title: 'Todo List',
      description: 'Build a CRUD application using signals. Learn signal arrays, adding/removing items, and filtering.',
      route: '/todo',
      icon: '✅',
      tags: ['signals', 'CRUD', 'filtering', 'NgClass']
    },
    {
      title: 'Signals Deep Dive',
      description: 'Explore Angular signals in depth: signal(), computed(), effect(), linkedSignal(), and toSignal().',
      route: '/signals',
      icon: '⚡',
      tags: ['signal', 'computed', 'effect', 'linkedSignal']
    },
    {
      title: 'Reactive Forms',
      description: 'Learn Angular Reactive Forms with FormBuilder, validators, form groups and form arrays.',
      route: '/forms',
      icon: '📝',
      tags: ['FormBuilder', 'validators', 'FormGroup', 'FormArray']
    },
    {
      title: 'Lifecycle Hooks',
      description: 'Understand Angular component lifecycle: OnInit, OnDestroy, OnChanges, AfterViewInit, and more.',
      route: '/lifecycle',
      icon: '♻️',
      tags: ['OnInit', 'OnDestroy', 'OnChanges', 'AfterViewInit']
    },
    {
      title: 'Pipes',
      description: 'Master Angular pipes: built-in pipes (date, currency, async, json) and creating custom pipes.',
      route: '/pipes',
      icon: '🔧',
      tags: ['DatePipe', 'CurrencyPipe', 'AsyncPipe', 'custom pipe']
    },
  ];
}
