'use client';

import Link from 'next/link';
import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  // handleSelectAll: any;
  // checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  // onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  // checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  // handleSelectAll,
  // onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Ch No" />,
    dataIndex: 'ch_no',
    key: 'ch_no',
    width: 30,
    render: (value: number) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        {value}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Bill No" />,
    dataIndex: 'bill_no',
    key: 'bill_no',
    width: 30,
    render: (value: number) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        {value}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Party Name" />,
    dataIndex: 'party',
    key: 'party',
    width: 250,
    hidden: 'party',

    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        {value}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('date'),
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('amount'),
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ₹{value}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={'Edit Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.edit(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.details(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the invoice`}
          description={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
