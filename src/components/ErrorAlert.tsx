
function ErrorAlert({ text }: { text: string }) {
  return (
    <div className='rounded-lg border-2 border-red-500 bg-red-200  p-2 text-center font-semibold text-red-500'>
      {text}
    </div>
  );
}

export default ErrorAlert;
