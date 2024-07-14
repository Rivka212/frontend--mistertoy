
export function ToyPreview({ toy }) {

    return (
        <article>
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price}</span></p>

        </article>
    )
}
