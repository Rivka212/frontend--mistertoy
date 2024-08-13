import { green } from "@mui/material/colors"
import { useState } from "react";
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoad() {
        setImgLoading(false)
    }

    return (
        <article>
            <h1>{toy.name}</h1>
            {isImgLoading && <div className="skeleton-loader"></div>}
            <div className="img-container">
                <img src={`../../../../images/${toy.name}.jpg`}
                    alt={toy.name}
                    onLoad={handleImageLoad}
                    style={{ display: isImgLoading ? 'none' : 'block' }}
                />
            </div>
            <h4>Price: <span>${toy.price}</span></h4>
            {toy.inStock === true ? <h4 style={{ color: 'blue' }}>In Stock</h4> :
                <h4 style={{ color: 'red' }}> Out of stock</h4>}
            <section className="btn-action-group">
                
                <button> <Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                <button> <Link to={`/toy/${toy._id}`}>Details</Link></button>
            </section>
        </article>
    )
}
