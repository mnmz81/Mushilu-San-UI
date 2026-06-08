import type { Meta, StoryObj } from '@storybook/angular';
import { Spacer } from './spacer';

const meta: Meta<Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<Spacer>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <div>
        <p style="margin:0 0 8px;font-size:12px;color:#64748b;">No size — flexible spacer pushes items to opposite ends</p>
        <div style="display:flex;align-items:center;width:340px;background:#f1f5f9;border-radius:6px;padding:12px;">
          <strong style="font-size:14px;">Card title</strong>
          <mui-spacer></mui-spacer>
          <button style="background:#6366f1;color:#fff;border:none;border-radius:6px;padding:6px 12px;font-size:12px;cursor:pointer;">Action</button>
        </div>
      </div>
    `,
    imports: [Spacer],
  }),
};

export const FixedSize: Story = {
  render: () => ({
    props: {},
    template: `
      <div>
        <p style="margin:0 0 8px;font-size:12px;color:#64748b;">size — fixed-width gap between items (steps on the spacing scale)</p>
        <div style="display:flex;align-items:center;background:#f1f5f9;border-radius:6px;padding:12px;">
          <span style="background:#6366f1;color:#fff;border-radius:6px;padding:8px 14px;font-size:12px;">A</span>
          <mui-spacer [size]="2"></mui-spacer>
          <span style="background:#6366f1;color:#fff;border-radius:6px;padding:8px 14px;font-size:12px;">B (gap 2)</span>
          <mui-spacer [size]="8"></mui-spacer>
          <span style="background:#6366f1;color:#fff;border-radius:6px;padding:8px 14px;font-size:12px;">C (gap 8)</span>
        </div>
      </div>
    `,
    imports: [Spacer],
  }),
};

export const VerticalLayout: Story = {
  render: () => ({
    props: {},
    template: `
      <div>
        <p style="margin:0 0 8px;font-size:12px;color:#64748b;">In a column flex container, Spacer fills/divides the vertical axis</p>
        <div style="display:flex;flex-direction:column;height:220px;width:240px;background:#f1f5f9;border-radius:6px;padding:12px;box-sizing:border-box;">
          <span style="font-size:13px;">Header</span>
          <mui-spacer></mui-spacer>
          <span style="font-size:13px;">Footer</span>
        </div>
      </div>
    `,
    imports: [Spacer],
  }),
};

export const InContext: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="width:340px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:center;">
          <strong style="font-size:15px;">Notifications</strong>
          <mui-spacer></mui-spacer>
          <span style="background:#dc2626;color:#fff;border-radius:9999px;font-size:11px;padding:2px 8px;">3 new</span>
        </div>
        <mui-spacer [size]="4"></mui-spacer>
        <p style="margin:0;font-size:13px;color:#64748b;">You're all caught up on the rest of your alerts.</p>
      </div>
    `,
    imports: [Spacer],
  }),
};

export const Accessibility: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="width:340px;">
        <p style="margin:0 0 12px;font-size:13px;color:#64748b;">
          Spacer is purely presentational — <code>aria-hidden="true"</code> removes it
          from the accessibility tree entirely so screen readers skip it without
          announcing an empty, meaningless element.
        </p>
        <div style="display:flex;align-items:center;background:#f1f5f9;border-radius:6px;padding:12px;">
          <span id="spacer-a11y-label" style="font-size:14px;">Plan: Pro</span>
          <mui-spacer aria-hidden="true"></mui-spacer>
          <button style="background:#6366f1;color:#fff;border:none;border-radius:6px;padding:8px 14px;font-size:13px;cursor:pointer;">Upgrade</button>
        </div>
      </div>
    `,
    imports: [Spacer],
  }),
  parameters: { a11y: { disable: false } },
};

export const MobilePreview: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="width:375px;padding:16px;">
        <div style="display:flex;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:14px;">
          <span style="font-size:15px;">Wi-Fi</span>
          <mui-spacer></mui-spacer>
          <span style="font-size:14px;color:#64748b;">Connected</span>
        </div>
      </div>
    `,
    imports: [Spacer],
  }),
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
