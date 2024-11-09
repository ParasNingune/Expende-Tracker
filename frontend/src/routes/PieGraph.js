import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function IncomeExpensePieChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const incomeData = [6000, 1500, 3000, 2000, 2500, 3200, 3100, 2900, 3400];
        const expenseData = [500, 700, 800, 1200, 1000, 1100, 1300, 1250, 1400];

        const totalIncome = incomeData.reduce((sum, value) => sum + value, 0);
        const totalExpense = expenseData.reduce((sum, value) => sum + value, 0);

        const data = {
            labels: ['Income', 'Expense'],
            datasets: [
                {
                    data: [totalIncome, totalExpense],
                    backgroundColor: ['rgba(0, 255, 204, 0.7)', 'rgba(255, 204, 0, 0.7)'],
                    hoverBackgroundColor: ['rgba(0, 255, 204, 1)', 'rgba(255, 204, 0, 1)'],
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 2,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        };

        const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', width: '300px', height: '300px', margin: 'auto' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
}
