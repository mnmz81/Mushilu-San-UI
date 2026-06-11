import { screen, fireEvent } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { renderTemplate } from '../../../../core/testing';
import { Sidebar } from './sidebar';
import { SidebarSection } from './sidebar-section';
import { SidebarItem } from './sidebar-item';
import { SidebarTrigger } from './sidebar-trigger';

const IMPORTS = [Sidebar, SidebarSection, SidebarItem, SidebarTrigger];

const BASIC = `
  <mui-sidebar>
    <button muiSidebarTrigger></button>
    <mui-sidebar-section label="Navigation">
      <a muiSidebarItem label="Home" href="#">Home</a>
      <a muiSidebarItem label="Settings" href="#">Settings</a>
    </mui-sidebar-section>
  </mui-sidebar>
`;

function getSidebar() {
  return document.querySelector('mui-sidebar') as HTMLElement;
}

function getTrigger() {
  return document.querySelector('[muiSidebarTrigger]') as HTMLButtonElement;
}

describe('Sidebar', () => {
  it('has role=navigation', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getSidebar()).toHaveAttribute('role', 'navigation');
  });

  it('has aria-label', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getSidebar()).toHaveAttribute('aria-label', 'Sidebar navigation');
  });

  it('custom aria-label via label input', async () => {
    await renderTemplate(
      `<mui-sidebar label="App navigation"><button muiSidebarTrigger></button></mui-sidebar>`,
      { imports: IMPORTS },
    );
    expect(getSidebar()).toHaveAttribute('aria-label', 'App navigation');
  });

  it('starts expanded with data-expanded attribute', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getSidebar()).toHaveAttribute('data-expanded');
  });

  it('starts collapsed when expanded=false', async () => {
    await renderTemplate(
      `<mui-sidebar [(expanded)]="exp"><button muiSidebarTrigger></button></mui-sidebar>`,
      { imports: IMPORTS, componentProperties: { exp: false } },
    );
    expect(getSidebar()).not.toHaveAttribute('data-expanded');
    expect(getSidebar()).toHaveAttribute('data-collapsed');
  });

  it('trigger has aria-expanded=true when sidebar is expanded', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  it('trigger has aria-label "Collapse sidebar" when expanded', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getTrigger()).toHaveAttribute('aria-label', 'Collapse sidebar');
  });

  it('clicking trigger collapses the sidebar', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    fireEvent.click(getTrigger());
    expect(getSidebar()).toHaveAttribute('data-collapsed');
    expect(getSidebar()).not.toHaveAttribute('data-expanded');
  });

  it('clicking trigger twice restores expanded state', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    const trigger = getTrigger();
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(getSidebar()).toHaveAttribute('data-expanded');
  });

  it('trigger aria-expanded updates after toggle', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    const trigger = getTrigger();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-label', 'Expand sidebar');
  });

  it('non-collapsible sidebar ignores toggle', async () => {
    await renderTemplate(
      `<mui-sidebar [collapsible]="false">
        <button muiSidebarTrigger></button>
      </mui-sidebar>`,
      { imports: IMPORTS },
    );
    fireEvent.click(getTrigger());
    expect(getSidebar()).toHaveAttribute('data-expanded');
  });

  it('section label is visible when expanded', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('section label is hidden when collapsed', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    fireEvent.click(getTrigger());
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('item label is hidden when collapsed', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    fireEvent.click(getTrigger());
    expect(document.querySelector('.item-label')).not.toBeInTheDocument();
  });

  it('active item has aria-current=page', async () => {
    await renderTemplate(
      `<mui-sidebar>
        <a muiSidebarItem label="Home" [active]="true" href="#">Home</a>
      </mui-sidebar>`,
      { imports: IMPORTS },
    );
    expect(document.querySelector('[muiSidebarItem]')).toHaveAttribute('aria-current', 'page');
  });

  it('inactive item has no aria-current', async () => {
    await renderTemplate(
      `<mui-sidebar>
        <a muiSidebarItem label="Settings" href="#">Settings</a>
      </mui-sidebar>`,
      { imports: IMPORTS },
    );
    expect(document.querySelector('[muiSidebarItem]')).not.toHaveAttribute('aria-current');
  });

  it('collapsed item shows tooltip via title attribute', async () => {
    await renderTemplate(
      `<mui-sidebar [(expanded)]="exp">
        <a muiSidebarItem label="Home" href="#">Home</a>
      </mui-sidebar>`,
      { imports: IMPORTS, componentProperties: { exp: false } },
    );
    expect(document.querySelector('[muiSidebarItem]')).toHaveAttribute('title', 'Home');
  });

  it('trigger has type=button', async () => {
    await renderTemplate(BASIC, { imports: IMPORTS });
    expect(getTrigger()).toHaveAttribute('type', 'button');
  });
});
