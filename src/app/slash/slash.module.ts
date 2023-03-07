import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";

// import { MaterialImportModule } from '../material-import/material-import.module';
//import { SvgViewerModule } from '../svg-viewer/svg-viewer.module';

import { SlashComponent } from './slash.component';
import { slashRoutes } from './slash.routes';
import {FooterComponent} from "../layout/footer/footer.component";
import {NotificationComponent} from "../layout/notification/notification.component";
import {TopMenuComponent} from "../layout/top-menu/top-menu.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NavMenuComponent} from "../layout/nav-menu/nav-menu.component";
import {DocViewerComponent} from "../layout/doc-viewer/doc-viewer.component";
import {DtComponent} from "../layout/doc-viewer/dt.component";
import {ThemeToggleComponent} from "../shared/theme-picker/theme-toggle.component";
import {NavItemComponent} from "../layout/nav-item/nav-item.component";
import {AnalyticsService} from "../shared/analytics.service";
import {Deployment} from "../shared/deployment.service";
import {DocumentService} from "../documents/document.service";
import {Logger} from "../shared/logger.service";
import {LocationService} from "../shared/location.service";
import {NavigationService} from "../navigation/navigation.service";
import {ScrollService} from "../shared/scroll.service";
import {ScrollSpyService} from "../shared/scroll-spy.service";
import {STORAGE_PROVIDERS} from "../shared/storage.service";
import {TocService} from "../shared/toc.service";
import {currentDateProvider, CurrentDateToken} from "../shared/current-date";
import {windowProvider, WindowToken} from "../shared/window";
import {ReportingErrorHandler} from "../shared/reporting-error-handler";
import {CustomIconRegistry} from "../shared/custom-icon-registry";


@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(slashRoutes),
    MatProgressBarModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule
  ],
  declarations: [
    SlashComponent, FooterComponent, NotificationComponent, TopMenuComponent, NavMenuComponent,
    DocViewerComponent, DtComponent, ThemeToggleComponent, NavItemComponent
  ],
  providers: [
    AnalyticsService,
    Deployment,
    DocumentService,
    { provide: ErrorHandler, useClass: ReportingErrorHandler },
    Logger,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    LocationService,
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    NavigationService,
    ScrollService,
    ScrollSpyService,
    // SearchService,
    STORAGE_PROVIDERS,
    // svgIconProviders,
    TocService,
    { provide: CurrentDateToken, useFactory: currentDateProvider },
    { provide: WindowToken, useFactory: windowProvider },
  ]
})
export class SlashModule {
}
