import React from 'react';

/**
 * Props for the ProblemCard component
 * Used in the Problems section to display pain points
 */
export interface ProblemCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * Props for the StepItem component
 * Used in the Steps section to show the 3-step process
 */
export interface StepItemProps {
    number: string;
    title: string;
    active?: boolean;
}

/**
 * Props for the FeatureItem component
 * Used in the Features section to showcase AI capabilities
 */
export interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * Props for the SecurityCard component
 * Used in the Security section to display security features
 */
export interface SecurityCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

/**
 * Navigation link type for header/mobile navigation
 */
export interface NavLink {
    href: string;
    label: string;
}

/**
 * SEO structured data types
 */
export interface OrganizationSchema {
    name: string;
    url: string;
    logo: string;
    email: string;
    telephone: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}
