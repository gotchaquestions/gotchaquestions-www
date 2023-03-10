import { Component, Input } from '@angular/core';

@Component({
  selector: 'aio-top-menu',
  template: `
    <nav aria-label="primary">
      <ul>
        <li routerLinkActive="selected" routerLink="/doc/quick-start">
          <a class="nav-link" title="demo">
          <span class="nav-link-inner">demo</span>
          </a>
        </li>
        <li routerLinkActive="selected" routerLink="/doc/more">
          <a class="nav-link" title="more">
            <span class="nav-link-inner">learn more</span>
          </a>
        </li>
      </ul>
    </nav>`
})
export class TopMenuComponent {
}
