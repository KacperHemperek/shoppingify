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
      layout
      className={'submit-button'}
      disabled={(!isValid && isValid !== undefined) || loading}
    >
      {loading ? (
        <motion.div layout={'position'} className='flex w-auto self-center'>
          <Puff width={'20'} height={'20'} wrapperClass={''} color={'white'} />
        </motion.div>
      ) : (
        buttonText
      )}
    </motion.button>
  );
}

export default FormSubmitButton;
