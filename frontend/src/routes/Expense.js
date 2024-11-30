import { Box, Heading, Text, Table, Tbody, Tr, Td, HStack, VStack, Image } from '@chakra-ui/react';
import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import app from '../fireBaseConfig';

export default function Expense() {
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const db = getDatabase(app);
        const expenseRef = ref(db, 'transactions');

        get(expenseRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const transactions = Object.values(data);
                    const filteredExpenseTransactions = transactions.filter(transaction => transaction.transactionType === 'expense');
                    setExpenseTransactions(filteredExpenseTransactions);

                    // Calculate total expense
                    const totalExpense = filteredExpenseTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
                    setTotalExpense(totalExpense);
                } else {
                    console.log("No Data Available");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
            <Box p={4} bg="gray.200" textAlign="center" mb={4} background='red.200'>
                <Heading size="md">Total Expense</Heading>
                <Text fontSize="2xl" fontWeight="bold" mt={2}>₹{totalExpense.toFixed(2)}</Text>
            </Box>

            <Heading size="md" mb={4} fontWeight='bold' fontSize='20'>All Expenses</Heading>
            
            {/* Scrollable Table */}
            <Box bg="white" p={4} boxShadow="md" borderRadius="md" maxHeight="500px" overflowY="auto">
                <Table variant="simple">
                    <Tbody>
                        {expenseTransactions.map((transaction, index) => (
                            <Tr key={index} borderBottom="1px solid" borderColor="gray.200" _last={{ border: 0 }}>
                                <Td>
                                    <HStack spacing={4} width="100%">
                                        {/* Category Image */}
                                        {transaction.category_image && (
                                            <Image boxSize="50px" src={transaction.category_image} alt={transaction.category} />
                                        )}

                                        {/* Centered transaction name and category */}
                                        <VStack align="center" justifyContent="center" flex="1" textAlign="center">
                                            <Text fontWeight="bold" fontSize="18">{transaction.title}</Text>
                                            <Text fontSize='14'>{transaction.category}</Text>
                                        </VStack>

                                        {/* Amount and date at the end */}
                                        <VStack align="end">
                                            <Text fontWeight="bold" color="green.500" fontSize="18">{transaction.amount}</Text>
                                            <Text fontSize='14'>{transaction.date}</Text>
                                        </VStack>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}
