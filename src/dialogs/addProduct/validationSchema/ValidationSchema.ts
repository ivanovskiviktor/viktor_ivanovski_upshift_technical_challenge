import * as Yup from 'yup';
import { Category } from '../../../models/Category';
import { State } from '../../../models/State';

type ValidationArgs = {
  stateId: number;
};

export const ValidationSchema = (categories: Category[], states: State[]) => {
  return Yup.object({
    title: Yup.string()
      .required('Product title is required')
      .min(4, 'Product title must be at least 4 characters'),
    stateId: Yup.number()
      .required('State is required')
      .oneOf(states.map((state) => state.id), 'Invalid State'),
    categoryId: Yup.number()
      .required('Category is required')
      .oneOf(categories.map((category) => category.id), 'Invalid Category'),
    price: Yup.number()
      .required('Product price is required')
      .test('tax',
        'Minimum price should be 7$',
        function (value, { parent }) {
          const { stateId } = parent as ValidationArgs;
          const selectedState = states.find((state) => state.id === stateId);
          const stateTaxThreshold = 0.25;

          if (selectedState && selectedState.tax > stateTaxThreshold) {
            return value >= 7;
          }

          return value >= 4 || this.createError({ message: 'Minimum price should be 4$' });
        }
      ),
    picture: Yup.string()
      .required('Picture URL is required')
      .matches(
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        'Invalid URL format. Please enter a valid URL.'
      ),
  });
};
