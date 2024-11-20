import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpensePieChart = ({ transactions }) => {
    // Process the data to get the total amount for Income and Expense
    const transactionTotals = transactions.reduce((acc, transaction) => {
        const amount = parseFloat(transaction.amount.replace('$', '').replace(',', '')); // Remove dollar sign and commas

        if (transaction.transaction_type === 'Income') {
            acc.Income = (acc.Income || 0) + amount;
        } else if (transaction.transaction_type === 'Expense') {
            acc.Expense = (acc.Expense || 0) + amount;
        }

        return acc;
    }, {});

    // Prepare data for Pie chart
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Transaction Type',
                data: [transactionTotals.Income || 0, transactionTotals.Expense || 0],
                backgroundColor: ['#4caf50', '#f44336'], // Green for Income, Red for Expense
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 1,
            },
        ],
    };

    // Pie chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        // Format the amount with a dollar sign and comma for thousands
                        const amount = tooltipItem.raw.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        return `${tooltipItem.label}: ${amount}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default IncomeExpensePieChart;
