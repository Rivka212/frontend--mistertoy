import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="btn-action-group">
                        <button className="btn-action" onClick={() => onRemoveToy(toy._id)}>X</button>
                    </div>
                </li>)}
        </ul>
    )
}   