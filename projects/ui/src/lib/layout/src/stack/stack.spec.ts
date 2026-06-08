import { describe, expect, it } from 'vitest';
import { renderTemplate } from '../../../../core/testing';
import { Stack } from './stack';

describe('Stack', () => {
  it('renders projected content', async () => {
    await renderTemplate('<mui-stack>Content</mui-stack>', { imports: [Stack] });
    expect(document.querySelector('mui-stack')?.textContent?.trim()).toBe('Content');
  });

  it('is a flex container', async () => {
    await renderTemplate('<mui-stack></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(getComputedStyle(host).display).toBe('flex');
  });

  it('defaults to column direction', async () => {
    await renderTemplate('<mui-stack></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.flexDirection).toBe('column');
  });

  it('reflects direction as inline flex-direction', async () => {
    await renderTemplate('<mui-stack direction="row"></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.flexDirection).toBe('row');
  });

  it('maps align to align-items', async () => {
    await renderTemplate('<mui-stack align="center"></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.alignItems).toBe('center');
  });

  it('maps justify="between" to space-between', async () => {
    await renderTemplate('<mui-stack justify="between"></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.justifyContent).toBe('space-between');
  });

  it('defaults to nowrap', async () => {
    await renderTemplate('<mui-stack></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.flexWrap).toBe('nowrap');
  });

  it('sets flex-wrap to wrap when wrap is true', async () => {
    await renderTemplate('<mui-stack [wrap]="true"></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.flexWrap).toBe('wrap');
  });

  it('maps gap to the spacing token', async () => {
    await renderTemplate('<mui-stack [gap]="8"></mui-stack>', { imports: [Stack] });
    const host = document.querySelector('mui-stack') as HTMLElement;
    expect(host.style.gap).toBe('var(--mui-space-8, 0px)');
  });

  it('exposes a part="root" attribute for styling hooks', async () => {
    await renderTemplate('<mui-stack></mui-stack>', { imports: [Stack] });
    expect(document.querySelector('mui-stack')).toHaveAttribute('part', 'root');
  });
});
