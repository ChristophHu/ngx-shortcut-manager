import { UpperCasePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core'
import { NgxShortcutService } from '../../services/ngx-shortcut.service'
import { Shortcut } from '../../models/shortcut.type'

@Component({
  selector: 'ngx-shortcut',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './ngx-shortcut.html',
  styleUrls: ['./ngx-shortcut.sass', '../../styles/ngx-shortcut.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxShortcut {
  private readonly shortcutService = inject(NgxShortcutService)

  readonly keys = input<string[]>([])
  readonly separator = input<string>('')
  readonly useSymbols = input<boolean>(true)

  readonly cb = input<(() => void) | undefined>(undefined)

  constructor() {
    effect(() => {
      console.log('Registering shortcut:', this.keys())
      const keysValue = this.keys()
      if (Array.isArray(keysValue) && keysValue.length > 0) {
        this.shortcutService.addShortcut({
          keys: keysValue,
          cb: () => {
            const cbFn = this.cb()
            if (cbFn) {
              cbFn()
            }
          }
        })
      }
    })
  }
}
