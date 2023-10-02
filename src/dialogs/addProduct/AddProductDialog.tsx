import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ValidationSchema } from './validationSchema/ValidationSchema';
import './AddProductDialog.css';
import { State } from '../../models/State';
import { Category } from '../../models/Category';
import { fetchCategories } from '../../api/categoriesApi';
import { fetchStates } from '../../api/statesApi';
import { simulateAddProduct } from '../../api/addProductApi';
import { Product } from '../../models/Product';

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updateProducts: (newProduct: Product) => void;
  lastProductId: number;
}

const initialValues = {
  stateId: "",
  categoryId: "",
  title: "",
  price: "",
  picture: "",
  description: ""
};

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onClose, updateProducts, lastProductId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const newProduct = await simulateAddProduct(values, lastProductId);

      updateProducts(newProduct);

      onClose();
      resetForm();
    } catch (error) {

      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const getStates = async () => {
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    getCategories();
    getStates();
  }, []);


  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Product</h2>
          <button className="buttonClose" onClick={() => onClose()}><i className='fa fa-times'></i></button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema(categories, states)}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="categoryId">Category:</label>
                  <Field
                    as="select"
                    id="categoryId"
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                  >
                    <option value="" disabled className='default-option'>Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="categoryId" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="stateId">State:</label>
                  <Field
                    as="select"
                    id="stateId"
                    name="stateId"
                    value={values.stateId}
                    onChange={handleChange}
                  >
                    <option value="" disabled className='default-option'>Select a state...</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="stateId" component="div" className="error-message" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Product title:</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                  />
                  <ErrorMessage name="title" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Product price:</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                  />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="picture">Picture URL:</label>
                <Field
                  type="text"
                  id="picture"
                  name="picture"
                />
                <ErrorMessage name="picture" component="div" className="error-message" />
              </div>
              <div className="form-group textarea-group">
                <label htmlFor="description">Description:</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>
              <div className='buttons-group'>
                <button type="submit">Add</button>
                <button type="button" onClick={() => onClose()}>Close</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductDialog;