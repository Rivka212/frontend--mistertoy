import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { PieChart } from '../cmps/PieChart.jsx'
import { BarChart } from '../cmps/BarChart.jsx'
import { LineChart } from '../cmps/LineChart.jsx'


export function Dashboard() {
    // const toys = useSelector(storeState => storeState.toyModule.toys)
    // const toyLabels = toyService.getToyLabels()
    // console.log(toyLabels);
    // let toysInStock = toys.filter(toy => toy.inStock === true)
    // const [labelCounts, setLabelCounts] = useState(null)

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
        <h1>MISTER TOY DASHBOARD</h1>
        <h3>Inventory by label:</h3>
        <PieChart labelCounts={labelCounts} />
        <h3>Prices per label:</h3>
        <BarChart labelCounts={labelCounts}/>
        <LineChart />
    </>)
}


