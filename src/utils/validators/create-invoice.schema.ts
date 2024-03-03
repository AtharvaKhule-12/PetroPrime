import { z } from 'zod';
import { messages } from '@/config/messages';

export const invoiceFormSchema = z.object({
  Vchno: z.string().min(1, { message: messages.vchIsRequired }),
  vchDate: z.date({
    required_error: messages.vchDateIsRequired,
  }),
  // fromAddress: z.string().min(1, { message: messages.addressIsRequired }),
  // fromPhone: z.string().optional(),
  // toAddress: z.string().min(1, { message: messages.addressIsRequired }),
  driverName: z.string({
    required_error: messages.driverNameIsRequired,
  }),
  vehicleNo: z.string({
    required_error: messages.vehicleNoIsRequired,
  }),
  payTerm: z.string().min(1, { message: messages.payTermIsRequired }),
  firm: z.string({
    required_error: messages.firmIsRequired,
  }),
  customerName: z.string().min(1, { message: messages.customerNameIsRequired }),
  fromDate: z.date({
    required_error: messages.fromDateIsRequired,
  }),
  toDate: z.date({
    required_error: messages.toDateIsRequired,
  }),
  frequency: z.string({
    required_error: messages.frequencyIsRequired,
  }),
  // itemName: z.string().min(1, { message: messages.itemNameIsRequired }),
  // invoiceNumber: z.string({
  //   required_error: 'This field is required',
  // }),
  // createDate: z.date({
  //   required_error: messages.createDateIsRequired,
  // }),
  // shipping: z.coerce
  //   .number()
  //   .min(1, { message: messages.shippingPriceIsRequired }),
  // discount: z.coerce.number().min(1, { message: messages.discountIsRequired }),
  items: z.array(
    z.object({
      item: z.string().min(1, { message: messages.itemNameIsRequired }),
      // description: z.string().min(1, { message: messages.itemDescIsRequired }),
      qty: z.coerce
      .number()
      .min(1, { message: messages.itemQtyIsRequired }),
      rate: z.coerce
      .number()
      .min(1, { message: messages.itemRateIsRequired }),
      disc: z.coerce
      .number()
      .min(1, { message: messages.discountIsRequired }),
      GST: z.coerce
      .number()
      .min(1, { message: messages.taxIsRequired }),
      // amt: z.coerce
      //   .number()
      //   .min(1, { message: messages.itemAmtIsRequired }),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
