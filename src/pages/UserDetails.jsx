
    import { useEffect, useState } from "react"
    import { userService } from "../services/user.service.js"
    import { Link, useParams, useNavigate } from "react-router-dom"
    import { useSelector } from "react-redux"
    
    
    export function UserDetails() {
    
        // const [user, setuser] = useState(null)
        // const { userId } = useParams()
        const user = useSelector(storeState => storeState.userModule.user)
    console.log('user id', user.id);
    
        const navigate = useNavigate()
    
        useEffect(() => {
            if (user.id) loadUser()
        }, [user.id])
    
       async function loadUser() {
            try {
                const user = await userService.getById(userId)
                console.log(user);
                // return setuser(user)
            } catch (err) {
                console.log('Had issues in user details', err)
                // navigate('/user')
            }
        }
    
    
    
    // console.log(user.msgs,'user.msgs');
    
    if (!user) return <div>Loading...</div>
    return (
        <section className="user-details">
            <h2>User Details </h2>
            <h2>{user.fullname}</h2>
            {/* <h3>Reviews : {user.reviews.join(', ')}</h3> */}
          
            {user?.msgs && user.msgs !== null && user.msgs.length > 0 ? (
                <section>
                    <h3>user Mssages:</h3>
                    <ul className="user-msgs">
                        {user.msgs.map((msg, index) =>
                            <li key={index}>
                                <h4>{msg.txt}</h4>
                            </li>)}
                    </ul></section>) : (
                <h4>No reviews available.</h4>
            )}
            {/* {user && user.reviews !== null(
                <section>
                    <h3>User Reviews:</h3>
                    <ul className="user-reviews">
                        {user.reviews.map((review, index) =>
                            <li key={index}>
                                <h4>{review.txt}</h4>
                            </li>)}
                    </ul></section>)(
            )}
       */}
        </section>
    )
    }
    


    