export type Invoice = {
  ch_no: number;
  bill_no: number;
  party: string;
  date: Date;
  amount: number;
  status: string;
};

export const invoiceData = [
  {
    ch_no: 62447,
    bill_no: 112,
    party: 'Francis',
    date: '2023-10-18T13:24:00.760Z',
    amount: '544.00',
    status: 'Paid',
  },
  {
    ch_no: 62448,
    bill_no: 115,
    party: 'Aryan',
    date: '2023-10-18T13:24:00.760Z',
    amount: '544.00',
    status: 'Pending',
  },
  {
    ch_no: 62456,
    bill_no: 115,
    party: 'Aryan',
    date: '2023-10-20T13:24:00.760Z',
    amount: '544.00',
    status: 'Pending',
  },
  {
    ch_no: 62238,
    bill_no: 115,
    party: 'Aryan',
    date: '2023-10-19T13:24:00.760Z',
    amount: '544.00',
    status: 'Pending',
  },
  {
    ch_no: 62449,
    bill_no: 117,
    party: 'Atharva',
    date: '2023-10-18T13:24:00.760Z',
    amount: '544.00',
    status: 'Paid',
  },
  
];
