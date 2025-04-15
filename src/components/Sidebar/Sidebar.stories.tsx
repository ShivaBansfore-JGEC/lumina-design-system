import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar, { SidebarProps, SidebarItem } from './Sidebar';

export default {
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

// Sample icons for the sidebar items
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L2 8V18H18V8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 18V12H13V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProjectsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4H4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V6C18 4.89543 17.1046 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RepositoriesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18H14C15.1046 18 16 17.1046 16 16V4C16 2.89543 15.1046 2 14 2H6C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 11H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.1667 10C16.1667 10.275 16.1667 10.55 16.1667 10.825C16.1667 12.825 15.4167 14.5 14.1667 15.75C13.3333 16.5833 12.3333 17.1667 11.1667 17.5C10.4167 17.75 9.58333 17.75 8.83333 17.5C7.66667 17.1667 6.66667 16.5833 5.83333 15.75C4.58333 14.5 3.83333 12.825 3.83333 10.825C3.83333 10.55 3.83333 10.275 3.83333 10C3.83333 9.725 3.83333 9.45 3.83333 9.175C3.83333 7.175 4.58333 5.5 5.83333 4.25C6.66667 3.41667 7.66667 2.83333 8.83333 2.5C9.58333 2.25 10.4167 2.25 11.1667 2.5C12.3333 2.83333 13.3333 3.41667 14.1667 4.25C15.4167 5.5 16.1667 7.175 16.1667 9.175C16.1667 9.45 16.1667 9.725 16.1667 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3334 12.5H6.66671C5.78265 12.5 4.93481 12.8512 4.30968 13.4763C3.68456 14.1014 3.33337 14.9493 3.33337 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Logo = () => (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#0052CC" />
        <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white" />
        <text x="40" y="22" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#172B4D">Bitbucket</text>
    </svg>
);

// Sample sidebar items
const sampleItems: SidebarItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: <HomeIcon />,
        isActive: true,
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: <ProjectsIcon />,
        children: [
            {
                id: 'project-1',
                label: 'Project Alpha',
                onClick: () => console.log('Project Alpha clicked'),
            },
            {
                id: 'project-2',
                label: 'Project Beta',
                onClick: () => console.log('Project Beta clicked'),
            },
            {
                id: 'project-3',
                label: 'Project Gamma',
                onClick: () => console.log('Project Gamma clicked'),
            },
        ],
    },
    {
        id: 'repositories',
        label: 'Repositories',
        icon: <RepositoriesIcon />,
        badge: 12,
        children: [
            {
                id: 'repo-1',
                label: 'frontend-app',
                onClick: () => console.log('frontend-app clicked'),
            },
            {
                id: 'repo-2',
                label: 'backend-api',
                onClick: () => console.log('backend-api clicked'),
            },
            {
                id: 'repo-3',
                label: 'mobile-app',
                onClick: () => console.log('mobile-app clicked'),
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon />,
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: <UserIcon />,
    },
];

const Template: Story<SidebarProps> = (args) => {
    const [isCollapsed, setIsCollapsed] = useState(args.isCollapsed || false);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                {...args}
                isCollapsed={isCollapsed}
                onCollapse={setIsCollapsed}
                logo={<Logo />}
            />
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>Main Content Area</h1>
                <p>This is the main content area that would be displayed alongside the sidebar.</p>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{ padding: '8px 16px', marginTop: '20px' }}
                >
                    {isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                </button>
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    items: sampleItems,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
    items: sampleItems,
    isCollapsed: true,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    items: sampleItems,
    theme: 'dark',
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
    items: sampleItems,
    width: 300,
    collapsedWidth: 80,
}; 