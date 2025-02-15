import React, { useRef } from 'react';
import { TextareaAutosize } from '@mui/material';
import { Spinner } from '../components/Spinner';
import { SendIcon } from '../components/icons/SendIcon';

const ChatInput: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setIsLoading(true);
    // Handle form submission
    setIsLoading(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <TextareaAutosize
          ref={textareaRef}
          className="w-full resize-none rounded-lg border border-gray-200 p-3 pr-12 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={5}
        />
        <button
          className="absolute bottom-2 right-2 rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="h-5 w-5" />
          ) : (
            <SendIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput; 