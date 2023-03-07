import {Component, HostBinding, ViewChild} from '@angular/core';
import { CurrentNodes, NavigationNode, VersionInfo } from "../navigation/navigation.model";
import { DocumentContents } from "../documents/document-contents";
import {ScrollService} from "../shared/scroll.service";
import {MatSidenav} from "@angular/material/sidenav";
import {NotificationComponent} from "../layout/notification/notification.component";
import {Deployment} from "../shared/deployment.service";

const sideNavView = 'SideNav';

@Component({
  selector: 'app-slash',
  templateUrl: './slash.component.html',
  styleUrls: ['./slash.component.scss']
})
export class SlashComponent {
  currentDocument: DocumentContents = {id: "0", contents: null};
  currentNodes: CurrentNodes = {};
  docVersions: NavigationNode[] = [];
  dtOn = false;

  private isStarting = true;

  /**
   * An HTML friendly identifier for the currently displayed page.
   * This is computed from the `currentDocument.id` by replacing `/` with `-`
   */
  pageId: string = '0';

  /**
   * An HTML friendly identifier for the "folder" of the currently displayed page.
   * This is computed by taking everything up to the first `/` in the `currentDocument.id`
   */
  folderId: string = this.pageId;

  /**
   * These CSS classes are computed from the current state of the application
   * (e.g. what document is being viewed) to allow for fine grain control over
   * the styling of individual pages.
   * You will get three classes:
   *
   * * `page-...`: computed from the current document id (e.g. events, guide-security, tutorial-toh-pt2)
   * * `folder-...`: computed from the top level folder for an id (e.g. guide, tutorial, etc)
   * * `view-...`: computed from the navigation view (e.g. SideNav, TopBar, etc)
   */
  @HostBinding('class')
  hostClasses = '';
  isTransitioning = true;
  isFetching = false;
  showTopMenu = false;
  dockSideNav = false;
  private isFetchingTimeout: any;
  private isSideNavDoc = false;

  sideNavNodes: NavigationNode[] = [];
  topMenuNodes: NavigationNode[] = [];
  topMenuNarrowNodes: NavigationNode[] = [];

  hasFloatingToc = false;
  tocMaxHeight: string = '1200';

  currentDocsVersionNode?: NavigationNode;

  versionInfo: VersionInfo | undefined;

  @ViewChild(MatSidenav, { static: true })
  sidenav: MatSidenav | undefined;

  @ViewChild(NotificationComponent, { static: true })
  notification: NotificationComponent | undefined;
  notificationAnimating = false;

  constructor(public deployment: Deployment,
              private scrollService: ScrollService) {
  }

  get isOpened() { return this.dockSideNav && this.isSideNavDoc; }
  get mode() { return this.isOpened ? 'side' : 'over'; }


  onDocReady() {
    // About to transition to new view.
    this.isTransitioning = true;

    // Stop fetching timeout (which, when render is fast, means progress bar never shown)
    clearTimeout(this.isFetchingTimeout);

    // If progress bar has been shown, keep it for at least 500ms (to avoid flashing).
    setTimeout(() => this.isFetching = false, 500);
  }

  onDocRemoved() {
    this.scrollService.removeStoredScrollInfo();
  }

  onDocInserted() {
    // Update the shell (host classes, sidenav state) to match the new document.
    // This may be called as a result of actions initiated by view updates.
    // In order to avoid errors (e.g. `ExpressionChangedAfterItHasBeenChecked`), updating the view
    // (e.g. sidenav, host classes) needs to happen asynchronously.
    setTimeout(() => this.updateShell());

    // Scroll the good position depending on the context
    this.scrollService.scrollAfterRender(500);
  }

  onDocRendered() {
    if (this.isStarting) {
      // In order to ensure that the initial sidenav-content left margin
      // adjustment happens without animation, we need to ensure that
      // `isStarting` remains `true` until the margin change is triggered.
      // (Apparently, this happens with a slight delay.)
      setTimeout(() => this.isStarting = false, 100);
    }

    this.isTransitioning = false;
  }

  updateShell() {
    // Update the SideNav state (if necessary).
    this.updateSideNav();

    // Update the host classes.
    this.setPageId(this.currentDocument.id);
    this.setFolderId(this.currentDocument.id);
    this.updateHostClasses();
  }

  updateSideNav() {
    if (this.sidenav == null) return;
    // Preserve current sidenav open state by default.
    let openSideNav = this.sidenav.opened;
    const isSideNavDoc = !!this.currentNodes[sideNavView];

    if (this.isSideNavDoc !== isSideNavDoc) {
      // View type changed. Is it now a sidenav view (e.g, guide or tutorial)?
      // Open if changed to a sidenav doc; close if changed to a marketing doc.
      openSideNav = this.isSideNavDoc = isSideNavDoc;
    }

    // May be open or closed when wide; always closed when narrow.
    this.sidenav.toggle(this.dockSideNav && openSideNav);
  }

  setPageId(id: string) {
    // Special case the home page
    this.pageId = (id === 'index') ? 'home' : id.replace('/', '-');
  }

  setFolderId(id: string) {
    // Special case the home page
    this.folderId = (id === 'index') ? 'home' : id.split('/', 1)[0];
  }

  updateHostClasses() {
    const mode = `mode-${this.deployment.mode}`;
    const sideNavOpen = `sidenav-${this.sidenav == null? 'closed' : this.sidenav.opened ? 'open' : 'closed'}`;
    const pageClass = `page-${this.pageId}`;
    const folderClass = `folder-${this.folderId}`;
    const viewClasses = Object.keys(this.currentNodes).map(view => `view-${view}`).join(' ');
    const notificationClass = `aio-notification-${this.notification == null? "hide" : this.notification.showNotification}`;
    const notificationAnimatingClass = this.notificationAnimating ? 'aio-notification-animating' : '';

    this.hostClasses = [
      mode,
      sideNavOpen,
      pageClass,
      folderClass,
      viewClasses,
      notificationClass,
      notificationAnimatingClass
    ].join(' ');
  }

  notificationDismissed() {
    this.notificationAnimating = true;
    // this should be kept in sync with the animation durations in:
    // - aio/src/styles/2-modules/_notification.scss
    // - aio/src/app/layout/notification/notification.component.ts
    setTimeout(() => this.notificationAnimating = false, 250);
    this.updateHostClasses();
  }
}
