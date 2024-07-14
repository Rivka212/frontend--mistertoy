import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


import { AppHeader } from './cmps/AppHeader.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
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
                            <Route element={<ToyIndex />} path="/Toy" />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}


