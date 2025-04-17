import { cn } from '../../../libs';

type TodoPaginationProps = {
  currentPage: number;
  lastPage?: number;
  className?: string;
  onHandleChangePage: (value: string) => void;
};

export const TodoPagination = ({
  currentPage,
  //   lastPage,
  className,
  onHandleChangePage,
}: TodoPaginationProps) => {
  return (
    <div className={cn('flex gap-5 justify-center items-center', className)}>
      <button
        disabled={currentPage <= 1}
        onClick={() => onHandleChangePage('-')}
        className="p-3 border border-teal-500 rounded-2xl cursor-pointer disabled:opacity-50"
      >
        Prev
      </button>
      <span>{currentPage}</span>
      <button
        // disabled={currentPage >= lastPage}
        onClick={() => onHandleChangePage('+')}
        className="p-3 border border-teal-500 rounded-2xl cursor-pointer disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
