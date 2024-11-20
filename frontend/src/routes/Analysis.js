import React from 'react';
import { Box, Heading, HStack } from '@chakra-ui/react';
import IncomeExpenseGraph from './IncomeExpenseGraph';
import PieGraph from './PieGraph';
import IncomeGraph from './IncomeGraph';
import ExpenseGraph from './ExpenseGraph';

export default function Analysis() {

    const recent_transactions = [
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Grocery Shopping',
            category_name: 'Groceries',
            transaction_type: 'Expense',
            amount: '$45.20',
            date: '2024-11-01',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Electricity Bill',
            category_name: 'Utilities',
            transaction_type: 'Expense',
            amount: '$120.75',
            date: '2024-11-05',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Friend',
            category_name: 'Salary',
            transaction_type: 'Income',
            amount: '$15.50',
            date: '2024-11-06',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Grocery Shopping',
            category_name: 'Groceries',
            transaction_type: 'Expense',
            amount: '$45.20',
            date: '2024-11-01',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Friend',
            category_name: 'Repayed',
            transaction_type: 'Income',
            amount: '$15.50',
            date: '2024-11-06',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Grocery Shopping',
            category_name: 'Groceries',
            transaction_type: 'Expense',
            amount: '$45.20',
            date: '2024-11-01',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Friend',
            category_name: 'Repayed',
            transaction_type: 'Income',
            amount: '$30.50',
            date: '2024-11-08',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Friend',
            category_name: 'Salary',
            transaction_type: 'Income',
            amount: '$55.50',
            date: '2024-12-08',
        },
    ];

  return (
    <Box>
        {/* Main Content Area */}
        <Box
            p={6} 
            width="83%" 
            height="96%"
            bg="gray.100"
            left="16%"
            position="absolute"
            top="2%"
        >
            {/* Centered Header */}
            <Box display="flex" justifyContent="center" mb="4">
                <HStack spacing="4">
                    <Box bg="gray.200" p="4" borderRadius="md" width="300px" textAlign="center" height="100px">
                        <Heading size="lg">Total<br/>xxx</Heading>
                    </Box>
                    <Box bg="gray.200" p="4" borderRadius="md" width="300px" textAlign="center" height="100px">
                        <Heading size="lg">Income<br/>xxx</Heading>
                    </Box>
                    <Box bg="gray.200" p="4" borderRadius="md" width="300px" textAlign="center" height="100px">
                        <Heading size="lg">Expense<br/>xxx</Heading>
                    </Box>
                </HStack>
            </Box>

            {/* Content Grid */}
            <Box
                height="82%"
                overflowY="auto"
                bg="gray.300"
            >
                <Box
                    display="grid"
                    gridTemplateColumns="1fr 2fr"
                >
                    {/* Top Left - Pie Chart */}
                    <Box bg="gray.400" borderRadius="md" p="4" marginLeft={5} marginRight={3} marginTop={5}>
                        <Heading size="md" fontSize="24" textAlign="center" mb="4">
                        Pie Chart
                        </Heading>
                        {/* Include Pie Chart Component Here */}
                        <PieGraph transactions={recent_transactions} />
                    </Box>

                    {/* Top Right - Income vs Expense */}
                    <Box bg="gray.400" borderRadius="md" p="4" marginRight={5} marginTop={5} minW={600} maxWidth={900}>
                        <Heading size="md" fontSize="24" textAlign="center" mb="4">
                        Income vs Expense
                        </Heading>
                        {/* Include Income vs Expense Graph Component Here */}
                        <IncomeExpenseGraph transactions={recent_transactions} />
                    </Box>
                </Box>

                <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                >
                    {/* Bottom Left - Income Distribution */}
                    <Box bg="gray.400" borderRadius="md" p="4" marginLeft={5} marginRight={3} marginTop={5} marginBottom={5}>
                        <Heading size="md" fontSize="24" textAlign="center" mb="4">
                        Income Distribution
                        </Heading>
                        {/* Include Income Distribution Component Here */}
                        <IncomeGraph transactions={recent_transactions} />
                    </Box>

                    {/* Bottom Right - Expense Distribution */}
                    <Box bg="gray.400" borderRadius="md" p="4" marginRight={5} marginTop={5} marginBottom={5}>
                        <Heading size="md" fontSize="24" textAlign="center" mb="4">
                        Expense Distribution
                        </Heading>
                        {/* Include Expense Distribution Component Here */}
                        <ExpenseGraph transactions={recent_transactions} />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  );
}
