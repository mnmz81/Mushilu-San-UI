import { describe, expect, it } from 'vitest';
import { renderTemplate } from '../../../../core/testing';
import { Spacer } from './spacer';

describe('Spacer', () => {
  it('is hidden from assistive technology', async () => {
    await renderTemplate('<mui-spacer></mui-spacer>', { imports: [Spacer] });
    expect(document.querySelector('mui-spacer')).toHaveAttribute('aria-hidden', 'true');
  });

  it('grows to fill available space when no size is given', async () => {
    await renderTemplate('<mui-spacer></mui-spacer>', { imports: [Spacer] });
    const host = document.querySelector('mui-spacer') as HTMLElement;
    expect(host.style.flex).toBe('1 1 0%');
    expect(host.style.width).toBe('');
    expect(host.style.height).toBe('');
  });

  it('becomes a fixed-size box when size is given', async () => {
    await renderTemplate('<mui-spacer [size]="4"></mui-spacer>', { imports: [Spacer] });
    const host = document.querySelector('mui-spacer') as HTMLElement;
    expect(host.style.flex).toBe('0 0 auto');
    expect(host.style.width).toBe('var(--mui-space-4, 0px)');
    expect(host.style.height).toBe('var(--mui-space-4, 0px)');
  });

  it('exposes a part="root" attribute for styling hooks', async () => {
    await renderTemplate('<mui-spacer></mui-spacer>', { imports: [Spacer] });
    expect(document.querySelector('mui-spacer')).toHaveAttribute('part', 'root');
  });
});
