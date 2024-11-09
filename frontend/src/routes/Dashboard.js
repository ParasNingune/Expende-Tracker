import { Box, Heading, Text, Table, Tbody, Tr, Td, Stack, Image, HStack, VStack } from '@chakra-ui/react';

export default function Dashboard() {
    const recent_transactions = [
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Grocery Shopping',
            category_name: 'Groceries',
            transaction_type: 'Expense',  // Added transaction type
            amount: '$45.20',
            date: '2024-11-01',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Electricity Bill',
            category_name: 'Utilities',
            transaction_type: 'Expense',  // Added transaction type
            amount: '$120.75',
            date: '2024-11-05',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Friend',
            category_name: 'Repayed',
            transaction_type: 'Income',  // Added transaction type
            amount: '$15.50',
            date: '2024-11-06',
        },
    ];

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
            <Box p={4} bg="gray.200" textAlign="center" mb={8}>
                <Heading size="md">Total Balance</Heading>
                <Text fontSize="4xl" fontWeight="bold" mt={2}>$xxx</Text>
            </Box>

            <Stack direction="row" spacing={6} mb={8}>
                <Box p={4} bg="gray.200" flex="1" textAlign="center">
                    <Heading size="md">Total Income</Heading>
                    <Text fontSize="2xl">+xxxxx</Text>
                </Box>
                <Box p={4} bg="gray.200" flex="1" textAlign="center">
                    <Heading size="md">Total Expense</Heading>
                    <Text fontSize="2xl">-xxxxx</Text>
                </Box>
            </Stack>

            <Heading size="md" mb={2}>Recent Transactions</Heading>
            <Box mt='5' bg="white" p={4} boxShadow="md" borderRadius="md">
                <Table variant="simple">
                    <Tbody>
                        {recent_transactions.map((transaction, index) => (
                            <Tr key={index}>
                                <Td p={0}>
                                    <Box  p='4' mb='5' bg="gray.50" borderRadius="md" boxShadow="sm">
                                        <HStack spacing={4} width="100%">
                                            {/* Image at the start */}
                                            <Image boxSize="50px" src={transaction.category_image} alt={transaction.category_name} />

                                            {/* Centered name and category */}
                                            <VStack align="center" justifyContent="center" flex="1" textAlign="center">
                                                <Text fontWeight="bold" fontSize='20'>{transaction.transaction_name}</Text>
                                                <Text>{transaction.category_name}</Text>
                                            </VStack>

                                            {/* Amount and date at the end */}
                                            <VStack align="end">
                                                <Text 
                                                    fontWeight="bold" 
                                                    isNumeric 
                                                    color={transaction.transaction_type === 'Expense' ? 'red.500' : 'green.500'}
                                                    fontSize='20'
                                                >
                                                    {transaction.transaction_type === 'Expense' ? `${transaction.amount}` : transaction.amount}
                                                </Text>
                                                <Text>{transaction.date}</Text>
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
