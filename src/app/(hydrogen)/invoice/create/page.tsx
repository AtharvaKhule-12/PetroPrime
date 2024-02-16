'use client'
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
// import { metaObject } from '@/config/site.config';
import { useState } from 'react';
import ShowButton from '@/app/shared/show-table';
import ExampleWithProviders from '@/app/shared/invoice/show-table';

// export const metadata = {
//   ...metaObject('Create Invoice'),
// };

const pageHeader = {
  title: 'Create Invoice',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Create',
    },
  ],
};

export default function InvoiceCreatePage() {

  const [tableview, setTableview] = useState<boolean>(true);
  const tableHandler = () => {
    setTableview(!tableview)
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ShowButton func={tableHandler} title="Upload File" className="mt-4 @lg:mt-0" />
      </PageHeader>

      {tableview == false ? (
        <CreateInvoice />
      ) : (
        <div className='flex flex-col items-center justify-start w-full mt-8'>
          <ExampleWithProviders/>
        </div>
      )}
    </>
  );
}
