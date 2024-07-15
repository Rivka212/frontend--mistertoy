import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <article>
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price}</span></p>
            <hr />
            <button> <Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button> <Link to={`/toy/${toy._id}`}>Details</Link></button>
        </article>
    )
}
