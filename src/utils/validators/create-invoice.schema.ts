import { z } from 'zod';
import { messages } from '@/config/messages';

export const invoiceFormSchema = z.object({
  fromVchno: z.string().min(1, { message: messages.vchIsRequired }),
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
  invoiceNumber: z.string({
    required_error: 'This field is required',
  }),
  createDate: z.date({
    required_error: messages.createDateIsRequired,
  }),
  status: z.string({
    required_error: messages.statusIsRequired,
  }),
  shipping: z.coerce
    .number()
    .min(1, { message: messages.shippingPriceIsRequired }),
  discount: z.coerce.number().min(1, { message: messages.discountIsRequired }),
  taxes: z.coerce.number().min(1, { message: messages.taxIsRequired }),
  items: z.array(
    z.object({
      item: z.string().min(1, { message: messages.itemNameIsRequired }),
      description: z.string().min(1, { message: messages.itemDescIsRequired }),
      quantity: z.coerce
        .number()
        .min(1, { message: messages.itemQtyIsRequired }),
      price: z.coerce
        .number()
        .min(1, { message: messages.itemPriceIsRequired }),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
