import { useState } from 'react';

type FormTypes = {
  onHandleCreateTodo: (data: string) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export const TodoForm = ({
  onHandleCreateTodo,
  onCancel,
  isLoading,
}: FormTypes) => {
  const [inputText, setInputText] = useState('');
  const isDisabled = isLoading || inputText.length === 0;

  return (
    <div className="w-full h-[70vh] flex items-center justify-center inset-full">
      <form
        onSubmit={() => onHandleCreateTodo(inputText)}
        className="flex flex-col gap-5 border border-teal-500 p-4 rounded w-[500px]"
      >
        <h1 className="text-3xl underline self-center">Create Todo</h1>
        <input
          type="text"
          name="title"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="p-2 border border-teal-500 rounded"
          placeholder="Type todo..."
        />
        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            onClick={onCancel}
            className="p-2 border border-teal-500 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            className="p-2 border border-teal-500 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
