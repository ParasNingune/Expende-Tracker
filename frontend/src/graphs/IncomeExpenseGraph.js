import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function IncomeExpenseGraph({ transactions }) {
    const chartRef = useRef(null);
    console.log(transactions.transactionType);
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Filter and process the transaction data
        const dates = transactions.map((t) => t.date);
        const uniqueDates = [...new Set(dates)];
        const incomeSum = uniqueDates.map((date) =>
            transactions
                .filter((t) => t.date === date && t.transactionType === 'income')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0)
        );
        console.log(transactions);
        const expenseSum = uniqueDates.map((date) =>
            transactions
                .filter((t) => t.date === date && t.transactionType === 'expense')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0)
        );

        const data = {
            labels: uniqueDates, // Unique dates as labels
            datasets: [
                {
                    label: 'Income',
                    data: incomeSum,
                    borderColor: 'rgba(0, 255, 204, 1)',
                    backgroundColor: 'rgba(0, 255, 204, 0.2)',
                    tension: 0.3,
                },
                {
                    label: 'Expense',
                    data: expenseSum,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
                    title: {
                        display: true,
                        text: 'Dates',
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        autoSkip: true,
                        maxRotation: 0,
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount ($)',
                        color: 'rgba(255, 255, 255, 0.7)',
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
            type: 'line',
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
            }}
        >
            <canvas ref={chartRef} />
        </div>
    );
}
