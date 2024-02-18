import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import { metaObject } from '@/config/site.config';
import ImportButton from '@/app/shared/import-button';

export const metadata = {
  ...metaObject('Create Invoice'),
};

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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Import File" className="mt-4 @lg:mt-0" />
      </PageHeader>

      <CreateInvoice />

    </>
  );
}
