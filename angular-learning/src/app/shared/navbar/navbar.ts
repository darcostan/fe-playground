import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/counter', label: 'Counter', icon: '🔢' },
    { path: '/todo', label: 'Todo List', icon: '✅' },
    { path: '/signals', label: 'Signals', icon: '⚡' },
    { path: '/forms', label: 'Forms', icon: '📝' },
    { path: '/lifecycle', label: 'Lifecycle', icon: '♻️' },
    { path: '/pipes', label: 'Pipes', icon: '🔧' },
  ];
}
