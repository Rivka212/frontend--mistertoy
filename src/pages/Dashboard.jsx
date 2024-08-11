import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { PieChart } from '../cmps/PieChart.jsx'
import { BarChart } from '../cmps/BarChart.jsx'
import { LineChart } from '../cmps/LineChart.jsx'
import { loadToys } from '../store/actions/toy.actions.js';


export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const labels = toyService.getToyLabels()
    const [labelCounts, setLabelCounts] = useState(null)

    console.log(toys);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadToys()
            } catch (error) {
                console.log(err)
                showErrorMsg('Couldn\'nt load toys')
            }
        }
        fetchData()
    }, [])



    // useEffect(() => {
    //     loadToysLabels()
    // }, [])

    // useEffect(() => {
    //     loadToys()
    //         .then(() => {
    //             if (toys) {
    //                 loadToysLabels(toys);
    //             }
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot load toys!');
    //         })
    // }, [toys]);


    function loadToysLabels(toys) {
        toyService.getToyLabelCounts(toys)
            .then(labelCounts => {
                console.log('labelCounts', labelCounts);
                setLabelCounts(labelCounts)
            })
    }

    // console.log(lable);s
    console.log('labelCounts', labelCounts);




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


