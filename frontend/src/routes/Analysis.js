import { React, useEffect, useState } from 'react';
import { Box, Heading, HStack } from '@chakra-ui/react';
import IncomeExpenseGraph from '../graphs/IncomeExpenseGraph';
import PieGraph from '../graphs/PieGraph';
import IncomeGraph from '../graphs/IncomeGraph';
import ExpenseGraph from '../graphs/ExpenseGraph';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../fireBaseConfig';

export default function Analysis() {
    const [transactions, setTransactions] = useState([]);
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
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
        <Box>
            <Box
                p={6}
                width="83%"
                height="96%"
                bg="gray.100"
                left="16%"
                position="absolute"
                top="2%"
            >
                <Box display="flex" justifyContent="center" mb="4">
                    <HStack spacing="4">
                        <Box bg="gray.200" p="4" width="300px" textAlign="center" backgroundColor="green.200">
                            <Heading size="md">Income<br />₹ {totalIncome.toFixed(2)}</Heading>
                        </Box>
                        <Box bg="gray.200" p="4" width="300px" textAlign="center" backgroundColor="blue.200">
                            <Heading size="md">Total<br />₹ {totalBalance.toFixed(2)}</Heading>
                        </Box>
                        <Box bg="gray.200" p="4" width="300px" textAlign="center" backgroundColor="red.200">
                            <Heading size="md">Expense<br />₹ {totalExpense.toFixed(2)}</Heading>
                        </Box>
                    </HStack>
                </Box>

                <Box height="82%" overflowY="auto" bg="gray.300">
                    <Box display="grid" gridTemplateColumns="1fr 2fr">
                        <Box bg="gray.400" borderRadius="md" p="4" marginLeft={5} marginRight={3} marginTop={5}>
                            <Heading size="md" fontSize="24" textAlign="center" mb="4">
                                Pie Chart
                            </Heading>
                            <PieGraph transactions={transactions} />
                        </Box>

                        <Box bg="gray.400" borderRadius="md" p="4" marginRight={5} marginTop={5} minW={600} maxWidth={900}>
                            <Heading size="md" fontSize="24" textAlign="center" mb="4">
                                Income vs Expense
                            </Heading>
                            <IncomeExpenseGraph transactions={transactions} />
                        </Box>
                    </Box>

                    <Box display="grid" gridTemplateColumns="1fr 1fr">
                        <Box bg="gray.400" borderRadius="md" p="4" marginLeft={5} marginRight={3} marginTop={5} minW={500} maxWidth={600} marginBottom={5}>
                            <Heading size="md" fontSize="24" textAlign="center" mb="4">
                                Income Distribution
                            </Heading>
                            <IncomeGraph transactions={incomeTransactions} />
                        </Box>

                        <Box bg="gray.400" borderRadius="md" p="4" marginRight={5} marginTop={5} minW={500} maxWidth={600} marginBottom={5}>
                            <Heading size="md" fontSize="24" textAlign="center" mb="4">
                                Expense Distribution
                            </Heading>
                            <ExpenseGraph transactions={expenseTransactions} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
