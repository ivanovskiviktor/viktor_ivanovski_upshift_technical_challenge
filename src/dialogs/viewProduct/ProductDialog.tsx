import React from 'react';
import { Product } from '../../models/Product';
import './ProductDialog.css';

interface ProductDialogProps {
    product: Product | null;
    onClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ product, onClose }) => {
    return (
        <div className={`modal ${product ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Product details</h2>
                    <button className="buttonClose" onClick={() => onClose()}><i className='fa fa-times'></i></button>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <span className='product'><i>Title:</i> <b>{product?.title}</b></span>
                    </div>
                    <div className="form-group">
                        <span className='product'><i>Price:</i> <b>{product?.price}$</b></span>
                    </div>
                    <div className="form-group">
                        <img src={product?.picture} alt="" />
                    </div>
                    <div className="form-group">
                        <span className='product'><i>Description:</i> <b>{product?.description}</b></span>
                    </div>
                    <div className="form-group">
                        <span className='product'><i>Available:</i> <b>{product?.stock ? "THE PRODUCT IS IN STOCK" : "THE PRODUCT IS OUT OF STOCK"}</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDialog;