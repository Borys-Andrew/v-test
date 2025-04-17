import { cn } from '../../../libs';
import { PerPageSelector } from './perPageSelector';

type TodoActionPanelProps = {
  perPage: number;
  className?: string;
  onSetSelectedPages: (data: number) => void;
  toggleModal: () => void;
};

export const TodoActionPanel = ({
  perPage,
  className,
  onSetSelectedPages,
  toggleModal,
}: TodoActionPanelProps) => {
  return (
    <div className={cn('flex justify-between items-center w-full', className)}>
      <button
        onClick={toggleModal}
        className="p-3 border border-teal-500 rounded-2xl cursor-pointer max-w-fit"
      >
        Create Todo
      </button>
      <PerPageSelector
        perPage={perPage}
        onSetSelectedPages={onSetSelectedPages}
      />
    </div>
  );
};
