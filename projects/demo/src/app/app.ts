import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgxShortcut, NgxShortcutService } from '../../../ngx-shortcut/src/public-api';

@Component({
  selector: 'app-root',
  imports: [
    NgxShortcut
  ],
  providers: [
    NgxShortcutService
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private readonly ngxShortcutService = inject(NgxShortcutService);
  
  ngOnInit(): void {
    this.ngxShortcutService.addShortcut({ keys: ["Shift", "a", "b"], cb: () => { console.log("Shortcut Shift + A + B triggered!")} });
  }
  
  freshCb() {
    console.log("Shortcut Shift + A + Y triggered!");
  }
}
