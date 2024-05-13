



import React from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceSlider = ({ price, setPrice, category, setCategory, rating, setRating }) => {


    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    return (
        <div className="col-6 col-md-3 mt-5 mb-5">
            <div className='px-3'>
                <Slider
                    range
                    marks={{ 1: '1 €', 1000: '1000 €' }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={value => `${value} €`}
                    tipProps={{ placement: 'top', visible: true }}
                    value={price}
                    onChange={price => setPrice(price)}
                />
            </div>
            <div className='mt-5'>
                <h4 className='categories'>
                    <b>Categories</b>
                </h4>
                <ul>
                    {categories.map(cat => (
                        <li style={{
                            cursor: 'pointer',
                            listStyleType: 'none'
                        }}
                            key={cat}
                            onClick={() => setCategory(cat)}>
                            {category === cat ? <b>{cat}</b> : cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mt-5'>
                <h4 className='categories'>
                    <b>Ratings</b>
                </h4>
                <ul>
                    {[5, 4, 3, 2, 1].map(star => (
                        <li style={{
                            cursor: 'pointer',
                            listStyleType: 'none'
                        }}
                            key={star}
                            onClick={() => setRating(star)}>
                            <div className="rating-outer">
                                <div className='rating-inner'
                                    style={{
                                        width: `${star * 20}%`
                                    }}>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div >
    );
};

export default PriceSlider;
