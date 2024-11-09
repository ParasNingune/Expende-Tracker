import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

export default function IncomeExpenseChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Updated data with specific dates and values
        const data = {
            labels: [
                '2024-07-01', '2024-07-16', '2024-07-31', 
                '2024-08-15', '2024-08-30', '2024-09-14', 
                '2024-09-29', '2024-10-14', '2024-10-29'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [6000, 1500, 3000, 2000, 2500, 3200, 3100, 2900, 3400],
                    borderColor: 'rgba(0, 255, 204, 1)',
                    backgroundColor: 'rgba(0, 255, 204, 0.2)',
                    tension: 0.3,
                },
                {
                    label: 'Expense',
                    data: [500, 700, 800, 1200, 1000, 1100, 1300, 1250, 1400],
                    borderColor: 'rgba(255, 204, 0, 1)',
                    backgroundColor: 'rgba(255, 204, 0, 0.2)',
                    tension: 0.3,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        stepSize: 15, // Show every 15th day on the x-axis
                        tooltipFormat: 'MMM dd',
                        displayFormats: {
                            day: 'MMM dd', // Format for dates on the x-axis
                        },
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        autoSkip: true, // Skip labels automatically to fit
                        maxRotation: 0, // Avoid label rotation for better readability
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                },
                y: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                },
            },
        };

        const myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
        });

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
            <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
    );
}
