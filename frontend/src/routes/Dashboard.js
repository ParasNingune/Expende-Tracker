import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Table, Tbody, Tr, Td, Stack, Image, HStack, VStack } from '@chakra-ui/react';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../fireBaseConfig';

export default function Dashboard() {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const db = getDatabase(app);
        const refs = ref(db, 'transactions');

        get(refs)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const transactions = Object.values(data);
                    setTransactions(transactions);
                    const filteredIncomeTransactions = transactions.filter(
                        (transaction) => transaction.transactionType === 'income'
                    );
                    const filteredExpenseTransactions = transactions.filter(
                        (transaction) => transaction.transactionType === 'expense'
                    );

                    setIncomeTransactions(filteredIncomeTransactions);
                    setExpenseTransactions(filteredExpenseTransactions);

                    const totalIncome = filteredIncomeTransactions.reduce(
                        (sum, transaction) => sum + parseFloat(transaction.amount),
                        0
                    );
                    const totalExpense = filteredExpenseTransactions.reduce(
                        (sum, transaction) => sum + parseFloat(transaction.amount),
                        0
                    );

                    setTotalIncome(totalIncome);
                    setTotalExpense(totalExpense);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const totalBalance = totalIncome - totalExpense;

    return (
        <Box
            p={6}
            width="83%"
            height="96%"
            bg="gray.100"
            left="16%"
            position="absolute"
            top="2%"
        >
            <Box p={4} bg="gray.200" textAlign="center" mb={4} backgroundColor='blue.200'>
                <Heading size="md">Total Balance</Heading>
                <Text fontSize="2xl" fontWeight="bold" mt={2}>₹{totalBalance.toFixed(2)}</Text>
            </Box>

            <Stack direction="row" spacing={6} mb={8}>
                <Box
                    p={4}
                    bg="gray.200"
                    flex="1"
                    textAlign="center"
                    backgroundColor="green.200"
                >
                    <Heading size="md">Total Income</Heading>
                    <Text fontSize="xl">₹ {totalIncome.toFixed(2)}</Text>
                </Box>
                <Box
                    p={4}
                    bg="gray.200"
                    flex="1"
                    textAlign="center"
                    background="red.200"
                >
                    <Heading size="md">Total Expense</Heading>
                    <Text fontSize="xl">₹ {totalExpense.toFixed(2)}</Text>
                </Box>
            </Stack>

            <Heading size="md" mb={0} fontWeight="bold" fontSize="20">
                Recent Transactions
            </Heading>
            <Box
                mt="5"
                bg="white"
                p={4}
                boxShadow="md"
                borderRadius="md"
                overflowY="scroll"
                maxHeight="375px"
            >
                <Table variant="simple">
                    <Tbody>
                        {transactions.slice(-5).map((transaction, index) => (
                            <Tr key={index}>
                                <Td p={1}>
                                    <Box
                                        p="4"
                                        mb="5"
                                        bg="gray.50"
                                        borderRadius="md"
                                        boxShadow="sm"
                                    >
                                        <HStack spacing={4} width="100%">
                                            {/* Image at the start */}
                                            {transaction.category_image && (
                                                <Image
                                                    boxSize="50px"
                                                    src={transaction.category_image}
                                                    alt={transaction.category || 'Category'}
                                                />
                                            )}

                                            {/* Centered name and category */}
                                            <VStack
                                                align="center"
                                                justifyContent="center"
                                                flex="1"
                                                textAlign="center"
                                            >
                                                <Text
                                                    fontWeight="bold"
                                                    fontSize="18"
                                                >
                                                    {transaction.title}
                                                </Text>
                                                <Text fontSize="14">
                                                    {transaction.category || 'No Category'}
                                                </Text>
                                            </VStack>

                                            {/* Amount and date at the end */}
                                            <VStack align="end">
                                                <Text
                                                    fontWeight="bold"
                                                    isNumeric
                                                    color={
                                                        transaction.transactionType ===
                                                        'expense'
                                                            ? 'red.500'
                                                            : 'green.500'
                                                    }
                                                    fontSize="18"
                                                >
                                                    ₹{parseFloat(transaction.amount).toFixed(2)}
                                                </Text>
                                                <Text fontSize="14">
                                                    {transaction.date || 'No Date'}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}
