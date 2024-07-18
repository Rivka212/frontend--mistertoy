import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


import { AppHeader } from './cmps/AppHeader.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'


import './assets/style/main.css'


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
                        </Routes>
                        <UserMsg />
                    </main>
                </section>
            </Router>
        </Provider>
    )
}


