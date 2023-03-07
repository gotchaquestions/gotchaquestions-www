import { Injectable } from '@angular/core';
import { LocationService } from "./location.service";

/**
 * Information about the deployment of this application.
 */
@Injectable()
export class Deployment {
  /**
   * The deployment mode set from the environment provided at build time;
   * or overridden by the `mode` query parameter: e.g. `...?mode=archive`
   */
  mode: string = this.location.search()['mode'] || 'stable';

  constructor(private location: LocationService) {}
}
