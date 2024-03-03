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
  frequencyOptions,
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
import AddInvoiceTable from './add-invoice-table';

const invoiceItems = [
  { item: '', qty: 1, rate: 0, disc: 0, GST: 0, },
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
  const customersData: Item[] = [
    { id: 1, label: 'Customer A', bal: 2.5 },
    { id: 2, label: 'Customer B', bal: 3.0 },
    { id: 3, label: 'Customer C', bal: 1.8 },
    { id: 4, label: 'Customer D', bal: 1000 },
    // Add more items as needed
  ];

  const [balance, setBalance] = useState<number | null>(null);

  const handleResetForm = () => {
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
  };

  const handleItemChange = (value: string) => {
    const selectedOption =
      customersData.find((item) => item.label === value) || null;
    setBalance(selectedOption ? selectedOption.bal : null);
  };

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        Vchno: '',
        vchDate: new Date(),
        driverName: '',
        vehicleNo: '',
        payTerm: '',
        firm: '',
        customerName: '',
        fromDate: new Date(),
        toDate: new Date(),
        frequency: '',
        // taxes: '',
        // createDate: new Date(),
        // status: 'draft',
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
          // invoiceNumber: 'INV-0071',
          // createDate: new Date(),
          items: newItems,
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 @2xl:gap-10 @3xl:gap-12">
              {/* <FormBlockWrapper title={'Voucher details:'}> */}
              <Input
                label="Vch no"
                placeholder="Enter your Vch No."
                {...register('Vchno')}
                error={errors.Vchno?.message}
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
              {/* </FormBlockWrapper> */}

              {/* <FormBlockWrapper
                title={'Driver details:'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              > */}
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
              {/* </FormBlockWrapper> */}

              {/* <FormBlockWrapper
                title={'Customer details:'}
                description={'To he who will receive this invoice'}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              > */}
              <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-4">
                <div className="flex flex-col">
                  <Controller
                    name="customerName"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        options={customerOptions}
                        onChange={(value: string) => {
                          onChange(value);
                          handleItemChange(value);
                        }}
                        value={value}
                        name={name}
                        label="Customer Name"
                        error={errors?.customerName?.message}
                        getOptionValue={(option) => option.value}
                      />
                    )}
                  />
                  {balance && (
                    <div className="balance animate-blink text-green-500">
                      Balance: {balance}
                    </div>
                  )}
                </div>
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="fromDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: 'Date From',
                          error: errors?.fromDate?.message,
                        }}
                        placeholderText="Select Date"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="[&>.react-datepicker-wrapper]:w-full">
                  <Controller
                    name="toDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: 'Date To',
                          error: errors?.toDate?.message,
                        }}
                        placeholderText="Select Date"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="frequency"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      options={frequencyOptions}
                      value={value}
                      onChange={onChange}
                      name={name}
                      label="Frequency"
                      error={errors?.frequency?.message}
                      getOptionValue={(option) => option.value}
                    />
                  )}
                />
              </div>
              {/* </FormBlockWrapper> */}

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
            handleAltBtn={handleResetForm}
          />
        </>
      )}
    </Form>
  );
}
