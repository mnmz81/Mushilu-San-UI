import { screen } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { renderComponent, renderTemplate } from '../../../../core/testing';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders an svg element', async () => {
    await renderComponent(Spinner, {});
    expect(document.querySelector('svg')).toBeTruthy();
  });

  it('defaults to md size (24px)', async () => {
    await renderComponent(Spinner, {});
    const svg = document.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders sm size (16px)', async () => {
    await renderComponent(Spinner, { inputs: { size: 'sm' } });
    const svg = document.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  it('renders lg size (32px)', async () => {
    await renderComponent(Spinner, { inputs: { size: 'lg' } });
    const svg = document.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders xl size (48px)', async () => {
    await renderComponent(Spinner, { inputs: { size: 'xl' } });
    const svg = document.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('has role="status" for screen readers', async () => {
    await renderTemplate('<mui-spinner></mui-spinner>', { imports: [Spinner] });
    expect(document.querySelector('mui-spinner')).toHaveAttribute('role', 'status');
  });

  it('has default aria-label "Loading"', async () => {
    await renderTemplate('<mui-spinner></mui-spinner>', { imports: [Spinner] });
    expect(document.querySelector('mui-spinner')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts a custom label', async () => {
    await renderTemplate('<mui-spinner label="Saving file"></mui-spinner>', { imports: [Spinner] });
    expect(document.querySelector('mui-spinner')).toHaveAttribute('aria-label', 'Saving file');
  });

  it('is discoverable by screen readers via getByRole', async () => {
    await renderTemplate('<mui-spinner label="Uploading"></mui-spinner>', { imports: [Spinner] });
    expect(screen.getByRole('status', { name: 'Uploading' })).toBeInTheDocument();
  });

  it('inner svg is aria-hidden to prevent double announcement', async () => {
    await renderComponent(Spinner, {});
    expect(document.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('reflects size as data-size attribute', async () => {
    await renderTemplate('<mui-spinner size="lg"></mui-spinner>', { imports: [Spinner] });
    expect(document.querySelector('mui-spinner')).toHaveAttribute('data-size', 'lg');
  });

  it('reflects color as data-color attribute', async () => {
    await renderTemplate('<mui-spinner color="primary"></mui-spinner>', { imports: [Spinner] });
    expect(document.querySelector('mui-spinner')).toHaveAttribute('data-color', 'primary');
  });

  it('renders two circles (track + arc)', async () => {
    await renderComponent(Spinner, {});
    expect(document.querySelectorAll('svg circle')).toHaveLength(2);
  });

  it('has a 0 0 24 24 viewBox', async () => {
    await renderComponent(Spinner, {});
    expect(document.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
  });
});
