import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import SideDrawer, { SideDrawerProps } from './SideDrawer';
import Button from '../Button/Button';

export default {
    title: 'Components/SideDrawer',
    component: SideDrawer,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

const Template: Story<SideDrawerProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => setIsOpen(true)} label="Open Drawer" />
            <SideDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    children: <div>Default Side Drawer Content</div>,
};

export const WithHeaderAndFooter = Template.bind({});
WithHeaderAndFooter.args = {
    header: <h2>Drawer Header</h2>,
    footer: (
        <div>
            <Button variant="solid" label="Cancel" style={{ marginRight: '8px' }} />
            <Button variant="outline" label="Save" />
        </div>
    ),
    children: <div>Drawer content with header and footer</div>,
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
    position: 'left',
    children: <div>Left-positioned drawer</div>,
};

export const TopPosition = Template.bind({});
TopPosition.args = {
    position: 'top',
    children: <div>Top-positioned drawer</div>,
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
    position: 'bottom',
    children: <div>Bottom-positioned drawer</div>,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
    size: 'small',
    children: <div>Small drawer content</div>,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
    size: 'large',
    children: <div>Large drawer content</div>,
};

export const FullSize = Template.bind({});
FullSize.args = {
    size: 'full',
    children: <div>Full-size drawer content</div>,
};

export const OverlayVariant = Template.bind({});
OverlayVariant.args = {
    variant: 'overlay',
    children: <div>Overlay variant drawer</div>,
};

export const PushVariant = Template.bind({});
PushVariant.args = {
    variant: 'push',
    children: <div>Push variant drawer</div>,
};

export const NoBackdrop = Template.bind({});
NoBackdrop.args = {
    showBackdrop: false,
    children: <div>Drawer without backdrop</div>,
};

export const CustomAnimation = Template.bind({});
CustomAnimation.args = {
    animation: 'scale',
    children: <div>Drawer with scale animation</div>,
};

export const ComplexContent: Story<SideDrawerProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => setIsOpen(true)} label="Open Complex Drawer" />
            <SideDrawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                header={<h2>Complex Drawer Example</h2>}
                footer={
                    <div>
                        <Button variant="solid" onClick={() => setIsOpen(false)} label="Cancel" style={{ marginRight: '8px' }} />
                        <Button variant="outline" onClick={() => setIsOpen(false)} label="Save Changes" />
                    </div>
                }
                size="large"
            >
                <div style={{ padding: '20px' }}>
                    <h3>Form Section</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                        <textarea rows={4} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
                        <select style={{ width: '100%', padding: '8px' }}>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h4>Additional Settings</h4>
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                <input type="checkbox" /> Enable notifications
                            </label>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                <input type="checkbox" /> Make public
                            </label>
                        </div>
                    </div>
                </div>
            </SideDrawer>
        </div>
    );
}; 