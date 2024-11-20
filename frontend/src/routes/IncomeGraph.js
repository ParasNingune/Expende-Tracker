import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function IncomeGraph({ transactions }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Set custom height for the canvas
        chartRef.current.height = 250;  // Set the height of the canvas directly

        // Filter income transactions
        const incomeTransactions = transactions.filter(
            (t) => t.transaction_type === 'Income'
        );

        // Sum up the amounts per category
        const categoryTotals = incomeTransactions.reduce((acc, t) => {
            // Remove the "$" symbol and convert the amount to a number
            const amount = parseFloat(t.amount.replace('$', ''));
            acc[t.category_name] = (acc[t.category_name] || 0) + amount;
            return acc;
        }, {});

        const categories = Object.keys(categoryTotals);
        const totals = Object.values(categoryTotals);

        const data = {
            labels: categories,
            datasets: [
                {
                    label: 'Total Income Amount',
                    data: totals,
                    backgroundColor: 'rgba(0, 255, 204, 0.8)', // Color for bars
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,  // Make chart responsive
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Categories',
                        color: 'rgba(255, 255, 255, 0.9)',
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Amount ($)',
                        color: 'rgba(255, 255, 255, 0.9)',
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                },
            },
        };

        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data,
            options,
        });

        return () => {
            chartInstance.destroy();
        };
    }, [transactions]);

    return (
        <div
            style={{
                backgroundColor: '#1e1e1e', // Black background
                padding: '20px',
                borderRadius: '10px',
                width: '100%', // Ensure it takes full width
            }}
        >
            {/* Canvas with dynamic height applied */}
            <canvas ref={chartRef} width="100%" />
        </div>
    );
}
