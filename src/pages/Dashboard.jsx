import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const toyLabels = toyService.getToyLabels()
    let toysInStock = toys.filter(toy => toy.inStock === true)

    // useEffect(() => {
    //     loadToysChart()
    // }, [toys])

    // function loadToysChart() {

    let labelCounts = []
    let counts = {}

    toysInStock.forEach(toy => {
        toy.labels.forEach(label => {
            if (counts[label]) {
                counts[label]++
            } else {
                counts[label] = 1
            }
        })
    })

    Object.keys(counts).forEach(label => {
        labelCounts.push({ label: label, count: counts[label] })
    })

    const pieData = {
        labels: labelCounts.map(labelCount => labelCount.label),
        datasets: [
            {
                label: '# of Votes',
                data: labelCounts.map(labelCount => labelCount.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(150, 109, 30, 0.2)',
                    'rgba(255, 209, 164, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 109, 94, 1)',
                    'rgba(255, 259, 74, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }
    const barData = {
        labels: toyLabels,

        datasets: [
            {
                label: 'Toys Labels',
                data: toys.map(toy => toy.price),
                backgroundColor:'rgba(54, 162, 235, 0.5)',
            },
         
        ],

    }
    return (<>
        <h1>MISTER TOY DASHBOARD</h1>
        <h3>Inventory by label:</h3>
        <Pie data={pieData} />
        <h3>Prices per label:</h3>
        <Bar data={barData} />
    </>)
}


