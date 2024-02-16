'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';

type ImportButtonProps = {
  title?: string;
  func?: () => void;
  className?: string;
  buttonLabel?: string;
};

export default function ShowButton({
  title,
  func,
  className,
  buttonLabel = 'Show Table',
}: React.PropsWithChildren<ImportButtonProps>) {
  const { openModal } = useModal();

  return (
    <Button
      onClick={func}
      className={cn('w-full @lg:w-auto', className)}
    >
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      {buttonLabel}
    </Button>
  );
}
