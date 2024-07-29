import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { PieChart } from '../cmps/PieChart.jsx'
import { BarChart } from '../cmps/BarChart.jsx'
import { LineChart } from '../cmps/LineChart.jsx'


export function Dashboard() {
    const [labelCounts, setLabelCounts] = useState(null)


    useEffect(() => {
        loadToysLabels()
    }, [])


    function loadToysLabels() {
        toyService.getToyLabelCounts()
            .then(labelCounts => {
                console.log('labelCounts', labelCounts);
                setLabelCounts(labelCounts)
            })
    }

    if (!labelCounts) return 'Loading...'
    return (<>
        <h2>MISTER TOY DASHBOARD</h2>
        {/* <section className='toy-dashboard'> */}
            <div style={{ maxWidth: '500px', maxHeight: '500' }}>
                <h3>Inventory by label:</h3>
                <PieChart labelCounts={labelCounts} />
                <h3>Prices per label:</h3>
                <BarChart labelCounts={labelCounts} />
                <h3>Prices of Toys: </h3>
                <LineChart />
            </div>
        {/* </section> */}
        </>
    )
}


