import { InjectionToken, Signal } from '@angular/core';

export interface SidebarContext {
  readonly expanded: Signal<boolean>;
  toggle(): void;
}

export const SIDEBAR_CONTEXT = new InjectionToken<SidebarContext>('SIDEBAR_CONTEXT');
