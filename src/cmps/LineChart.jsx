import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function LineChart() {

    const options = {
        responsive: true,
        plugins: { legend: { position: 'top' } }
    }

    const labels = ['1995', '2000', '2005', '2010', '2015', '2020', '2025']

    const data = {
        labels,
        datasets: [
            {
                label: 'Prices',
                data: labels.map(() => Math.floor(Math.random() * 100) + 1),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return <Line options={options} data={data} />
}
