import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {VersionInfo} from "./shared-types";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'class': 'page-home'}
})
export class AppComponent implements OnInit {
  title = 'gotchaquestions-ng';

  versionInfo: VersionInfo = {major: 0, full: "0.0.0.0-alpha"}
  pageId = 0
  showTopMenu: boolean = true;

  isHome = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     this.isHome = event.url === "/"; // Toggle a boolean based on url
    //   });
  }
}
