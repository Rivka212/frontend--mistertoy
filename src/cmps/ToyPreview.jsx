import { green } from "@mui/material/colors"
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <article>
            <h1>{toy.name}</h1>
            <h4>Price: <span>${toy.price}</span></h4>
            {toy.inStock === true ? <h4 style={{ color: 'blue' }}>In Stock</h4> :
                <h4 style={{ color: 'red' }}> Out of stock</h4>}
            <hr />
            <button> <Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button> <Link to={`/toy/${toy._id}`}>Details</Link></button>
        </article>
    )
}
