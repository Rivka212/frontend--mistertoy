import { userService } from '../services/user.service.js'
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {

    function shouldShowActionBtns(toy) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return toy.owner?._id === user._id
    }

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    {shouldShowActionBtns(car) &&
                        <div className="actions">
                            <div className="btn-action-group">
                                {/* <button onClick={() => onUpdateCar(car)}>Edit</button> */}
                                <button className="btn-action" onClick={() => onRemoveToy(toy._id)}>X</button>
                            </div>
                        </div>
                    }
                </li>)}
        </ul>
    )
}   