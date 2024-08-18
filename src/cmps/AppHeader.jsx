
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { logout } from '../store/actions/user.actions'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>MISTER TOY</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/review" >Reviews</NavLink>

                    {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

                    {!user && <NavLink to="login" className="login-link">Login</NavLink>}

                    {user && (
                        <div className="user-info">
                            <Link to={`user/${user._id}`}>
                                {user.fullname}
                            </Link>
                            <button onClick={onLogout}>logout</button>
                        </div>
                    )}
                </nav>
            </section>
        </header>
    )
}