import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export function AboutUs() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 10
    const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

    function onHandeleclick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    function getToStore(txt) {
        if (txt === 'jerusalem') setCoords({ lat: 31.7683, lng:35.2137 })
        if (txt === 'haifa') setCoords({ lat: 32.794, lng: 34.9896 })
        if (txt === 'eilat') setCoords({ lat: 29.5581, lng: 34.9482 })
    }


    return (<section>
        <h2>About Us</h2>
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero Alias unde hic quisquam doloremque.</h5>
        <h3>We on map: 🧸</h3>
        <div>
            <button onClick={() => getToStore('jerusalem')}>Jerusalem</button>
            <button onClick={() => getToStore('haifa')}>Haifa</button>
            <button onClick={() => getToStore('eilat')}>Eilat</button>
        </div>

        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBjh82VGt-elSGxBu-oIAsjJh51eqyz4r0" }}
                center={coords}
                defaultZoom={zoom}
                onClick={onHandeleclick}
            >
                <AnyReactComponent
                    {...coords}
                    text="🧸"
                />
            </GoogleMapReact>
        </div>

    </section>
    )
}
