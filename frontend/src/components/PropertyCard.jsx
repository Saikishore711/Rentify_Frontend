//components/ShowCourseComponent.js
import React from 'react';
import './Product.css'
function PropertyCard({ properties }) {
	return (
		<div className="product-list">
				{properties?.map((product) => (
					<div className="product" key={product._id}>
						{/* <img src={product.image} alt={product.name} /> */}
						<h2>{product.title}</h2>
						<p>Price: ₹{product.price}</p>
                        <h5>Description: {product.description}</h5>
						<button
							className="add-to-cart-button"
						>
							Add to Shopping Cart
						</button>
					</div>
				))}
		</div>
	);
}

export default PropertyCard;
