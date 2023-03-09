import { Component, Input } from '@angular/core';

import { NavigationNode, VersionInfo } from '../../navigation/navigation.service';

@Component({
  selector: 'aio-footer',
  templateUrl: 'footer.component.html',
  host: {'class': 'aio-footer'}
})
export class FooterComponent {
  @Input() nodes: NavigationNode[] = [];
  @Input() versionInfo: VersionInfo | undefined;

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
