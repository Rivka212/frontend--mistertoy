
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    console.log(toy);

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
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button><Link to={`/toy`}>Back</Link></button>
            <p>
                {/* <Link to="/toy/nJ5L4">Next toy</Link> */}
            </p>
        </section>
    )
}
