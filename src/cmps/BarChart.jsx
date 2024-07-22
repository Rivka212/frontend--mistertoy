
import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export function BarChart({ labelCounts = {} }) {


    // toysInStock.forEach(toy => {
    //     toy.labels.forEach(label => {
    //         if (counts[label]) {
    //             counts[label]++
    //         } else {
    //             counts[label] = 1
    //         }
    //     })
    // })

    // Object.keys(counts).forEach(label => {
    //     labelCounts.push({ label: label, count: counts[label] })
    // })
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.formattedValue}%`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => `${value}%`,
                },
            },
        },
    }

    function getData(labelCounts) {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'In Stock',
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Total',
                    data: [],
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 0',
                },

            ],
        }

        console.log(labelCounts);
        const dataInStock = []
        const dataTotal = [] 
        const labels = Object.keys(labelCounts)

        labels.forEach(label => {
            const labelData = labelCounts[label]
            console.log(labelData);
            const labelInStockPercent = labelData.inStock / labelData.total * 100
            dataInStock.push(labelInStockPercent)
            dataTotal.push(100 - labelInStockPercent)
        })
        data.labels = labels
        data.datasets[0].data = dataInStock
        data.datasets[1].data = dataTotal
console.log(data);
        return data
    }
    const barData = getData(labelCounts)

    return (
        <Bar data={barData} options={options} />
    )
}