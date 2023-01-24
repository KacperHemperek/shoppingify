import { CategoryType } from '../types/Category.interface';
import Category from './Category';
import { motion } from 'framer-motion';

function CategoriesList({ categories }: { categories?: CategoryType[] }) {
  if (!categories || !categories?.length) {
    return <div>Sorry no data was found</div>;
  }

  return (
    <motion.div
      layout={'size'}
      transition={{
        layout: {
          delay: 0.5,
        },
      }}
    >
      {categories.map((category) => (
        <Category key={category.name} {...category} />
      ))}
    </motion.div>
  );
}

export default CategoriesList;
