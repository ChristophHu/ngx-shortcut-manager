# ngx-shortcut-manager

**ngx-shortcut-manager** is an Angular service for managing keyboard shortcuts in scalable web applications. It provides a simple API to register, remove, and clear shortcuts, and triggers callbacks when defined key combinations are pressed.

## Features

- Register single or multiple keyboard shortcuts
- Remove or clear shortcuts at runtime
- Zoneless and signal-friendly
- Designed for strict TypeScript and Angular best practices
- Observable-based shortcut detection

## Installation

```bash
npm install ngx-shortcut-manager
```

## Usage

### 1. Provide the Service

The service is provided in root by default. Inject it using Angular's `inject()` function:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { NgxShortcutManager } from 'ngx-shortcut-manager';

@Component({
  selector: 'app-root',
  template: `<h1>Shortcut Demo</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private readonly shortcutManager = inject(NgxShortcutManager);

  ngOnInit(): void {
    this.shortcutManager.addShortcut({
      keys: ['Shift', 'A', 'B'],
      cb: () => { console.log('Shortcut Shift + A + B triggered!'); }
    });
  }
}
```

### 2. Register Shortcuts

```typescript
shortcutManager.addShortcut({
  keys: ['Control', 'S'],
  cb: () => { /* Save logic */ }
});
```

### 3. Remove or Clear Shortcuts

```typescript
shortcutManager.removeShortcut(myShortcut);
shortcutManager.clearShortcuts();
```

## API

### `addShortcut(shortcut: Shortcut | Shortcut[])`

Registers one or more shortcuts.  
- `shortcut.keys`: Array of key names (e.g. `['Shift', 'A']`)
- `shortcut.cb`: Callback function triggered when keys are pressed

### `removeShortcut(shortcut: Shortcut)`

Removes a specific shortcut.

### `clearShortcuts()`

Removes all shortcuts.

## Testing

Unit tests are provided using Jasmine and Angular's TestBed.  
Run tests with:

```bash
ng test
```

## Best Practices

- Use strict type checking
- Prefer signals for state management in components
- Use `inject()` for service injection
- Avoid `any` type; use `unknown` if needed

## License

MIT