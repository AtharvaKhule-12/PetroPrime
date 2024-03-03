'use client';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useFieldArray, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionIcon } from '@/components/ui/action-icon';
import { calculateTotalPrice } from '@/utils/calculate-total-price';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { FormBlockWrapper, items, GST } from './form-utils';
import { Select } from '@/components/ui/select';

interface Item {
  id: number;
  item: string;
}

// quantity component for invoice
function QuantityInput({
  name,
  error,
  onChange,
  defaultValue,
}: {
  name?: string;
  error?: string;
  onChange?: (value: number) => void;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue ?? 1);

  function handleIncrement() {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleDecrement() {
    let newValue = value > 1 ? value - 1 : 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleOnChange(inputValue: number) {
    setValue(Number(inputValue));
    onChange && onChange(inputValue);
  }

  useEffect(() => {
    setValue(defaultValue ?? 1);
    onChange && onChange(defaultValue ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      label="Quantity"
      type="number"
      min={1}
      name={name}
      value={value}
      placeholder="1"
      onChange={(e) => handleOnChange(Number(e.target.value))}
      suffix={
        <>
          <ActionIcon
            title="Decrement"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleDecrement()}
          >
            <PiMinusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
          <ActionIcon
            title="Increment"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleIncrement()}
          >
            <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
        </>
      }
      suffixClassName="flex gap-1 items-center -me-2"
      error={error}
    />
  );
}

const itemsData: Item[] = [
  { id: 1, item: 'Item 1' },
  { id: 2, item: 'Item 2' },
  { id: 3, item: 'Item 3' },
  { id: 4, item: 'Item 4' },
  // Add more items as needed
];

// multiple invoice items generate component
export function AddInvoiceItems({ watch, register, control, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const shippingCost = watch('shipping') as number;
  const discount = watch('discount') as number;
  const taxes = watch('taxes') as number;

  function calculateSubTotal(): number {
    let subTotal = 0;
    fields.forEach((_, index) => {
      const itemPrice = watch(`items.${index}.rate` ?? 0) as number;
      const itemQuantity = watch(`items.${index}.qty` ?? 1) as number;
      subTotal += itemPrice * itemQuantity;
    });
    return subTotal as number;
  }

  return (
    // <FormBlockWrapper
    //   title={'Item Details:'}
    //   description={'Add one or multiple item'}
    //   className="pt-7 @2xl:pt-9 @3xl:pt-11"
    // >
    <div className="col-span-2 ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Item Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Qty
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Rate
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Discount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              GST
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Amount
            </th> */}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {fields.map((field: any, index) => {
            const priceValue = watch(
              `items.${index}.rate`,
              field.price ?? 0
            ) as number;

            const quantityValue = watch(
              `items.${index}.qty`,
              field.quantity ?? 1
            ) as number;

            return (
              <tr key={field.id}>
                <td className="whitespace-nowrap px-4 py-2">{index + 1}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Controller
                    name={`items.${index}.item`}
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        options={items}
                        value={value}
                        onChange={onChange}
                        name={name}
                        // label="Item Name"
                        error={errors?.items?.[index]?.item?.message}
                        getOptionValue={(option) => option.value}
                        className='min-w-24'
                      />
                    )}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Input
                    type="number"
                    defaultValue={0}
                    {...register(`items.${index}.qty`)}
                    error={errors?.items?.[index]?.qty?.message}
                    className='min-w-12'
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Input
                    type="number"
                    prefix={'₹'}
                    placeholder="10"
                    {...register(`items.${index}.rate`)}
                    error={errors?.items?.[index]?.rate?.message}
                    className='min-w-12'
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Input
                    type="number"
                    suffix={'%'}
                    placeholder="10"
                    {...register(`items.${index}.disc`)}
                    error={errors?.items?.[index]?.disc?.message}
                    className='min-w-12'
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Controller
                    name={`items.${index}.GST`}
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        options={GST}
                        value={value}
                        suffix={'%'}
                        onChange={onChange}
                        name={name}
                        error={errors?.items?.[index]?.GST?.message}
                        getOptionValue={(option) => option.value}
                        className='min-w-24'
                      />
                    )}
                  />
                </td>
                {/* <td className="whitespace-nowrap px-4 py-2">
                  <Input
                    type="number"
                    prefix={'₹'}
                    placeholder="10"
                    {...register(`items.${index}.amt`)}
                    error={errors?.items?.[index]?.amt?.message}
                    className='min-w-12'
                  />
                </td> */}
                <td className="whitespace-nowrap px-4 py-2">
                  <Button
                    variant="text"
                    color="danger"
                    onClick={() => remove(index)}
                    className="h-auto font-semibold"
                  >
                    <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
                  </Button>
                </td>
              </tr>
              // <div
              //   key={field.id}
              //   className="mb-8 grid grid-cols-1 items-start rounded-lg border border-muted p-4 shadow @md:p-5 @xl:p-6"
              // >
              //   <div className="grid w-full items-start gap-3 @md:grid-cols-2 @lg:gap-4 @xl:grid-cols-3 @2xl:gap-5 @4xl:grid-cols-4">
              //     <Input
              //       label="Item"
              //       placeholder="Enter item name"
              //       {...register(`items.${index}.item`)}
              //       defaultValue={field.item}
              //       error={errors?.items?.[index]?.item?.message}
              //       className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
              //     />
              //     <Controller
              //       name={`items.${index}.quantity`}
              //       control={control}
              //       render={({ field: { name, onChange, value } }) => (
              //         <QuantityInput
              //           name={name}
              //           onChange={(value) => onChange(value)}
              //           defaultValue={field.quantity ?? value}
              //           error={errors?.items?.[index]?.quantity?.message}
              //         />
              //       )}
              //     />
              //     <div className="flex items-start @xl:col-span-2 @2xl:col-span-1">
              //       <Input
              //         label="Price"
              //         type="number"
              //         prefix={'$'}
              //         placeholder="100"
              //         {...register(`items.${index}.price`)}
              //         defaultValue={field.price}
              //         error={errors?.items?.[index]?.price?.message}
              //         className="w-full"
              //       />

              //       <div className="ms-3 mt-9 flex items-start text-sm">
              //         <Text className="me-1 text-gray-500">Total:</Text>
              //         <Text as="b" className="font-medium">
              //           ${priceValue * quantityValue}
              //         </Text>
              //       </div>
              //     </div>
              //     <Textarea
              //       label="Description"
              //       placeholder="Enter item description"
              //       {...register(`items.${index}.description`)}
              //       defaultValue={field.description}
              //       error={errors?.items?.[index]?.description?.message}
              //       className="row-start-2 @md:col-span-2 @xl:col-span-3 @xl:row-start-2 @4xl:col-span-4"
              //       textareaClassName="h-20"
              //     />
              //   </div>
              //   <Button
              //     variant="text"
              //     color="danger"
              //     onClick={() => remove(index)}
              //     className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
              //   >
              //     <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
              //   </Button>
              // </div>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-col w-full items-start justify-between pt-6 @xl:flex-row">
        <Button
          onClick={() =>
            append({ item: '', qty: 1, rate: 0, disc: 0, GST: 0, })
          }
          variant="flat"
          className="w-full @xl:w-auto"
        >
          <PiPlusBold className="me-1.5 h-4 w-4" /> Add Item
        </Button>

        <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 @xl:max-w-xs">
          {/* <div className="grid grid-cols-3 gap-3 @lg:gap-4">
            <Input
              type="number"
              label="Shipping"
              prefix={'$'}
              placeholder="10"
              {...register('shipping')}
              error={errors.shipping?.message}
            />
            <Input
              type="number"
              label="Discount"
              prefix={'$'}
              placeholder="50"
              {...register('discount')}
              error={errors.discount?.message}
            />
            <Input
              type="number"
              label="Taxes"
              suffix={'%'}
              placeholder="15"
              {...register('taxes')}
              error={errors.taxes?.message}
            />
          </div> */}

          {/* <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 @xl:max-w-xs"> */}
          <Text className="flex items-center justify-between">
            Subtotal:{' '}
            <Text as="span" className="font-medium text-gray-700">
              ${calculateSubTotal()}
            </Text>
          </Text>
          <Text className="flex items-center justify-between">
            Discount:{' '}
            <Text as="span" className="font-medium text-gray-700">
              {discount ? `$${discount}` : '--'}
            </Text>
          </Text>
          <Text className="flex items-center justify-between">
            Taxes:{' '}
            <Text as="span" className="font-medium text-red">
              {taxes ? `${taxes}%` : '--'}
            </Text>
          </Text>
          <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
            Total:{' '}
            <Text as="span">
              $
              {calculateTotalPrice(
                calculateSubTotal(),
                shippingCost,
                discount,
                taxes
              ) ?? '--'}
            </Text>
          </Text>
          {/* </div> */}
        </div>
      </div>
    </div>
    //  </FormBlockWrapper>
  );
}
