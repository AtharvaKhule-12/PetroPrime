'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneNumber } from '@/components/ui/phone-input';
import { DatePicker } from '@/components/ui/datepicker';
import { Select } from '@/components/ui/select';
import {
  FormBlockWrapper,
  statusOptions,
  renderOptionDisplayValue,
  driverOptions,
  firmOptions,
  customerOptions,
} from './form-utils';
import { AddInvoiceItems } from './add-invoice-items';
import FormFooter from '@/components/form-footer';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];

interface Item {
  id: number;
  label: string;
  bal: number;
}

export default function CreateInvoice({
  id,
  record,
}: {
  id?: string;
  record?: InvoiceFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const itemsData: Item[] = [
    { id: 1, label: 'Customer A', bal: 2.5 },
    { id: 2, label: 'Customer B', bal: 3.0 },
    { id: 3, label: 'Customer C', bal: 1.8 },
    { id: 3, label: 'Customer D', bal: 1000 },
    // Add more items as needed
  ];

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const handleItemChange = (value: string) => {
    const selectedOption = itemsData.find((item) => item.label === value) || null;
    setBalance(selectedOption ? selectedOption.bal : null);
    // setSelectedItem(selectedOption ? selectedOption : null)
  };

  useEffect(() => {
    // Log the updated balance whenever it changes
    console.log(balance);
  }, [balance]);

  // const onChangeWithAdditionalFunction = (onChange: (...event: any[]) => void, selectedOption: string, additionalFunction: (option: string) => void) => {
  //   return (e: ChangeEvent<HTMLSelectElement>) => {
  //     additionalFunction(selectedOption);
  //     onChange(selectedOption)
  //   };
  // };

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        shipping: '',
        discount: '',
        taxes: '',
        createDate: new Date(),
        status: 'draft',
        items: invoiceItems,
      });
    }, 600);
  };

  const newItems = record?.items
    ? record.items.map((item) => ({
      ...item,
    }))
    : invoiceItems;

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          invoiceNumber: 'INV-0071',
          createDate: new Date(),
          // status: 'draft',
          items: newItems,
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title={'Voucher details:'}
              // description={'From he who sending this invoice'}
              >
                <Input
                  label="Vch no"
                  placeholder="Enter your Vch No."
                  {...register('fromVchno')}
                  error={errors.fromVchno?.message}
                />
                <Controller
                  name="vchDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: 'Vch Date',
                        error: errors?.vchDate?.message,
                      }}
                      placeholderText="Select Date"
                      selected={value}
                      onChange={onChange}
                    />
                  )}
                />
                {/* <Textarea
                  label="Address"
                  placeholder="Enter your address"
                  {...register('fromAddress')}
                  error={errors.fromAddress?.message}
                  textareaClassName="h-20"
                  className="col-span-2"
                /> */}
              </FormBlockWrapper>

              <FormBlockWrapper
                title={'Driver details:'}
                // description={'To he who will receive this invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Controller
                  name="driverName"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      options={driverOptions}
                      value={value}
                      onChange={onChange}
                      name={name}
                      label="Driver Name"
                      error={errors?.driverName?.message}
                      getOptionValue={(option) => option.value}
                    />
                  )}
                />
                <Controller
                  name="vehicleNo"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      options={driverOptions}
                      value={value}
                      onChange={onChange}
                      name={name}
                      label="Vehicle No"
                      error={errors?.vehicleNo?.message}
                      getOptionValue={(option) => option.value}
                    />
                  )}
                />
                <Input
                  label="PayTerm"
                  placeholder="Enter your payterm"
                  {...register('payTerm')}
                  error={errors.payTerm?.message}
                />
                <Controller
                  name="firm"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      options={firmOptions}
                      value={value}
                      onChange={onChange}
                      name={name}
                      label="Firm"
                      error={errors?.firm?.message}
                      getOptionValue={(option) => option.value}
                    />
                  )}
                />
              </FormBlockWrapper>

              <FormBlockWrapper
                title={'Customer details:'}
                description={'To he who will receive this invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-4">
                  <div className='flex flex-col'>
                    <Controller
                      name="customerName"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <Select
                          options={customerOptions}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            onChange(e)
                            handleItemChange(value)
                          }}
                          value={value}
                          name={name}
                          label="Customer Name"
                          error={errors?.customerName?.message}
                          getOptionValue={(option) => option.value}
                        />
                      )}
                    />
                    {balance && <div>Balance: {balance}</div>}
                  </div>
                  <div className="[&>.react-datepicker-wrapper]:w-full">
                    <Controller
                      name="createDate"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          inputProps={{ label: 'Date Create' }}
                          placeholderText="Select Date"
                          selected={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="[&>.react-datepicker-wrapper]:w-full">
                    {/* <Controller
                      name="dueDate"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          inputProps={{
                            label: 'Due Date',
                            error: errors?.dueDate?.message,
                          }}
                          placeholderText="Select Date"
                          selected={value}
                          onChange={onChange}
                        />
                      )}
                    /> */}
                  </div>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        options={statusOptions}
                        value={value}
                        onChange={onChange}
                        name={name}
                        label="Status"
                        error={errors?.status?.message}
                        getOptionValue={(option) => option.value}
                        getOptionDisplayValue={(option) =>
                          renderOptionDisplayValue(option.value as string)
                        }
                        displayValue={(selected: string) =>
                          renderOptionDisplayValue(selected)
                        }
                      />
                    )}
                  />
                </div>
              </FormBlockWrapper>

              <AddInvoiceItems
                watch={watch}
                control={control}
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
          />
        </>
      )}
    </Form>
  );
}
