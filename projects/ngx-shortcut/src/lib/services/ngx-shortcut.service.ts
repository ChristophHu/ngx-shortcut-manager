import { Injectable } from '@angular/core';
import { Shortcut } from '../models/shortcut.type';
import { combineLatest, distinctUntilChanged, filter, fromEvent, map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxShortcutService {
  shortcuts: Shortcut[] = [
    // { keys: ["Shift", "r", "x"], cb: () => { console.log("RxJS is cool!")} },
  ]

  public addShortcut(shortcut: Shortcut | Shortcut[]) {
    console.log('Adding shortcut(s):', shortcut);
    const addAndWatch = (s: Shortcut) => {
      this.shortcuts.push(s)
      console.log('Current shortcuts:', this.shortcuts);
      this.hotkey(s)
    }
    if (Array.isArray(shortcut)) {
      shortcut.forEach(addAndWatch)
    } else {
      addAndWatch(shortcut)
    }
  }

  public removeShortcut(shortcut: Shortcut) {
    const index = this.shortcuts.indexOf(shortcut)
    if (index !== -1) {
      this.shortcuts.splice(index, 1)
    }
  }

  public clearShortcuts() {
    this.shortcuts = []
  }

  private hotkey(shortcut: Shortcut) {
    const keyState$ForKey = (key: string) =>
      merge(
        fromEvent<KeyboardEvent>(document, "keydown").pipe(
          filter((e) => e.key.toLowerCase() === key.toLowerCase()),
          map(() => true)
        ),
        fromEvent<KeyboardEvent>(document, "keyup").pipe(
          filter((e) => e.key.toLowerCase() === key.toLowerCase()),
          map(() => false)
        )
      );

    const keysState$ForKeys = (keys: string[]) =>
      combineLatest(keys.map(keyState$ForKey));

    keysState$ForKeys(shortcut.keys)
      .pipe(
        distinctUntilChanged((prev, cur) => JSON.stringify(prev) === JSON.stringify(cur)),
        filter((keysState) => keysState.every(Boolean))
      )
      .subscribe(shortcut.cb);
  }
}