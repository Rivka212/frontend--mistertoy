// import { useState } from 'react'
// import { useNavigate } from 'react-router'

// import { signup } from '../store/actions/user.actions'

// import { userService } from '../services/user.service'

// export function Signup() {
//     const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
//     const navigate = useNavigate()

//     function clearState() {
//         setCredentials({ username: '', password: '', fullname: ''})
//     }

//     function handleChange(ev) {
//         console.log('ev.target.name', ev.target.name);
//         const field = ev.target.name
//         const value = ev.target.value
//         setCredentials(credentials => ({ ...credentials, [field]: value }))
//     }

//     async function onSignup(ev = null) {
//         if (ev) ev.preventDefault()

//         if (!credentials.username || !credentials.password || !credentials.fullname) return
//         await signup(credentials)
//         clearState()
//         navigate('/')
//     }

//     return (
//         <form className="signup-form" onSubmit={onSignup}>
//             <input
//                 type="text"
//                 name="fullname"
//                 value={credentials.fullname}
//                 placeholder="Fullname"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="username"
//                 value={credentials.username}
//                 placeholder="Username"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="password"
//                 name="password"
//                 value={credentials.password}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 required
//             />
//             <button>Signup</button>
//         </form>
//     )
// }