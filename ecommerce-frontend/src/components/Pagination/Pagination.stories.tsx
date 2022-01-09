import React from 'react';
import Pagination, { PaginationProps } from './Pagination';

export default {
    title: 'Pagination',
    component: Pagination,
    argTypes: {
        page: {
            defaultValue: 1,
            type: 'number',
            control: { type: 'number' },
        },
        totalPages: {
            defaultValue: 2,
            type: 'number',
            control: { type: 'number' },
        },
        onNext: {
            action: 'Next'
        },
        onPrevious: {
            action: 'Previous'
        },
    }
};

export const Default = (args: PaginationProps) => <Pagination {...args} />;