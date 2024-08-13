import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


import { AppHeader } from './cmps/AppHeader.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyMsgAdd } from './pages/ToyMsgAdd.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

// import { LoginSignup } from './pages/LoginSignup1.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
// import { Signup } from './pages/Signup.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import './assets/style/main.scss'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyMsgAdd />} path="/toy/:toyId/msg" />
                            <Route element={<ReviewExplore/>} path="/review" />
                            <Route element={<AdminIndex />} path="admin"  />
                            <Route element={<LoginSignup />} path="login" >
                                {/* <Route index element={<Login />} />
                                <Route element={<Signup />} path="signup" /> */}
                            </Route>
                        </Routes>
                        <UserMsg />
                    </main>
                </section>
            </Router>
        </Provider>
    )
}


