import { RefObject } from 'react';

export default function TextInput({
  elementRef,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  elementRef: RefObject<HTMLInputElement>;
}) {
  return (
    <input
      type={'text'}
      className={
        'rounded-md border-0 border-b-2 border-primary-700 bg-primary-600 text-4xl text-white placeholder:text-primary-200 focus:border-primary-300 focus:outline-0'
      }
      ref={elementRef}
      {...props}
    />
  );
}
