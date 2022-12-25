import { motion } from 'framer-motion';
import { Puff } from 'react-loader-spinner';

function FormSubmitButton({
  loading,
  isValid,
  buttonText,
}: {
  buttonText: string;
  loading?: boolean;
  isValid?: boolean;
}) {
  return (
    <motion.button
      style={{ borderRadius: loading ? '100px' : '12px' }}
      layout
      className={`${loading && 'w-auto'} submit-button`}
      disabled={(!isValid && isValid !== undefined) || loading}
    >
      {loading ? (
        <motion.div layout={'size'} className='flex max-w-[20px] self-center'>
          <Puff width={'20'} height={'20'} wrapperClass={''} color={'white'} />
        </motion.div>
      ) : (
        buttonText
      )}
    </motion.button>
  );
}

export default FormSubmitButton;
