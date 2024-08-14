
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadToy } from "../store/actions/toy.actions.js"


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()

    // useEffect(() => {
    //     loadToy(toyId)
    //   }, [toyId])

    useEffect(() => {
        if (toyId) onLoadToy()
    }, [toyId])

   async function onLoadToy() {
        try {
            const toy = await loadToy(toyId)
            return setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

// console.log(toy.msgs,'toy.msgs');

if (!toy) return <div>Loading...</div>
return (
    <section className="toy-details">
        <h1>Toy name : {toy.name}</h1>
        <h3>Labels : {toy.labels.join(', ')}</h3>
        <h4>Price: ${toy.price}</h4>
        {/* <h5>InStock : {toy.inStock}</h5> */}
        <h4 style={{ color: toy.inStock ? 'blue' : 'red' }}
        > {toy.inStock ? 'In stock' : 'Not in stock'}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        {toy?.msgs && toy.msgs !== null && toy.msgs.length > 0 ? (
            <section>
                <h3>Toy Mssages:</h3>
                <ul className="toy-msgs">
                    {toy.msgs.map((msg, index) =>
                        <li key={index}>
                            <h4>{msg.txt}</h4>
                        </li>)}
                </ul></section>) : (
            <p>No messages available.</p>
        )}
        {user && toy.reviews !== null(
            <section>
                <h3>Toy Reviews:</h3>
                <ul className="toy-reviews">
                    {toy.reviews.map((review, index) =>
                        <li key={index}>
                            <h4>{review.txt}</h4>
                        </li>)}
                </ul></section>)(
        )}
        <button><Link to={`/toy/${toy._id}/msg`}>Add Toy Msg</Link></button>
        <button><Link to={`/review`}>Add Toy Review</Link></button>
        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
        <button><Link to={`/toy`}>Back</Link></button>
        <p>
            {/* <Link to="/toy/nJ5L4">Next toy</Link> */}
        </p>
    </section>
)
}
