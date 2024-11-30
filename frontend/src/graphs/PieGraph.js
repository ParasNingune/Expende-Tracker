import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieGraph({ transactions }) {
    // Process the data to get the total amount for each transaction type
    const transactionTotals = transactions.reduce((acc, transaction) => {
        const amount = parseFloat(transaction.amount); // Convert amount to a number
        acc[transaction.transactionType] = (acc[transaction.transactionType] || 0) + amount;
        return acc;
    }, {});

    // Prepare data for the Pie Chart
    const data = {
        labels: ['Income', 'Expense'], // Labels for the chart
        datasets: [
            {
                label: 'Transactions',
                data: [transactionTotals['income'] || 0, transactionTotals['expense'] || 0], // Data values
                backgroundColor: ['rgba(0, 255, 204, 0.8)', 'rgba(255, 102, 102, 0.8)'], // Colors for the slices
                borderColor: 'rgba(255, 255, 255, 1)', // White border for slices
                borderWidth: 1,
            },
        ],
    };

    // Configure chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.7)', // White labels
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const amount = tooltipItem.raw.toLocaleString('en-US', { 
                            style: 'currency', 
                            currency: 'USD' 
                        }); // Format amount as currency
                        return `${tooltipItem.label}: ${amount}`;
                    },
                },
            },
        },
    };
    return (
        <div
            style={{
                backgroundColor: '#1e1e1e', // Black background
                padding: '20px',
                borderRadius: '10px',
                width: '100%', // Full width
                maxWidth: '400px', // Maximum width for the pie chart
                margin: '0 auto', // Center the chart
            }}
        >
            <Pie data={data} options={options} />
        </div>
        
    );
}
