'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import PriceField from '@/components/controlled-table/price-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from '@/components/ui/button';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import { useMedia } from '@/hooks/use-media';
import { renderOptionDisplayValue, frequencyOptions } from '../form-utils';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <>
      {/* <PriceField
        value={filters['amount']}
        onChange={(data) => updateFilter('amount', data)}
      /> */}
      <DateFiled
        selected={getDateRangeStateValues(filters['date'][0])}
        startDate={getDateRangeStateValues(filters['date'][0])}
        endDate={getDateRangeStateValues(filters['date'][1])}
        onChange={(date: any) => {
          updateFilter('date', date);
        }}
        placeholderText="Select date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      />
      <StatusField
        options={frequencyOptions}
        value={filters['party']}
        onChange={(value: string) => {
          updateFilter('party', value);
        }}
        getOptionValue={(option) => option.value}
        // getOptionDisplayValue={(option) =>
        //   renderOptionDisplayValue(option.value as string)
        // }
        // displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        className={'w-auto'}
        {...(isMediumScreen && {
          label: 'Status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />
      {isFiltered ? (
        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  );
}
