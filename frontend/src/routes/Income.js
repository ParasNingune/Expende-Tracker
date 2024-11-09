import { Box, Heading, Text, Table, Tbody, Tr, Td, HStack, VStack, Image } from '@chakra-ui/react';

export default function Income() {
    const incomeTransactions = [
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Salary',
            category_name: 'Income',
            amount: '$3000.00',
            date: '2024-11-01',
            transaction_type: 'Income',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Freelance Project',
            category_name: 'Income',
            amount: '$500.00',
            date: '2024-11-05',
            transaction_type: 'Income',
        },
        {
            category_image: 'https://via.placeholder.com/50',
            transaction_name: 'Dividend',
            category_name: 'Investment',
            amount: '$200.00',
            date: '2024-11-10',
            transaction_type: 'Income',
        },
        {
          category_image: 'https://via.placeholder.com/50',
          transaction_name: 'Salary',
          category_name: 'Income',
          amount: '$3000.00',
          date: '2024-11-01',
          transaction_type: 'Income',
      },
      {
          category_image: 'https://via.placeholder.com/50',
          transaction_name: 'Freelance Project',
          category_name: 'Income',
          amount: '$500.00',
          date: '2024-11-05',
          transaction_type: 'Income',
      },
      {
          category_image: 'https://via.placeholder.com/50',
          transaction_name: 'Dividend',
          category_name: 'Investment',
          amount: '$200.00',
          date: '2024-11-10',
          transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Salary',
        category_name: 'Income',
        amount: '$3000.00',
        date: '2024-11-01',
        transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Freelance Project',
        category_name: 'Income',
        amount: '$500.00',
        date: '2024-11-05',
        transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Dividend',
        category_name: 'Investment',
        amount: '$200.00',
        date: '2024-11-10',
        transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Salary',
        category_name: 'Income',
        amount: '$3000.00',
        date: '2024-11-01',
        transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Freelance Project',
        category_name: 'Income',
        amount: '$500.00',
        date: '2024-11-05',
        transaction_type: 'Income',
      },
      {
        category_image: 'https://via.placeholder.com/50',
        transaction_name: 'Dividend',
        category_name: 'Investment',
        amount: '$200.00',
        date: '2024-11-10',
        transaction_type: 'Income',
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
            <Box p={4} bg="gray.200" textAlign="center" mb={4}>
                <Heading size="md">Total Income</Heading>
                <Text fontSize="4xl" fontWeight="bold" mt={2}>$xxxx</Text>
            </Box>

            <Heading size="md" mb={2}>All Income</Heading>
            
            {/* Scrollable Table */}
            <Box bg="white" p={4} boxShadow="md" borderRadius="md" maxHeight="490px" overflowY="auto">
                <Table variant="simple">
                    <Tbody>
                        {incomeTransactions.map((transaction, index) => (
                            <Tr key={index} borderBottom="1px solid" borderColor="gray.200" _last={{ border: 0 }}>
                                <Td>
                                    <HStack spacing={4} width="100%">
                                        {/* Category Image */}
                                        <Image boxSize="50px" src={transaction.category_image} alt={transaction.category_name} />

                                        {/* Centered transaction name and category */}
                                        <VStack align="center" justifyContent="center" flex="1" textAlign="center">
                                            <Text fontWeight="bold" fontSize="20">{transaction.transaction_name}</Text>
                                            <Text>{transaction.category_name}</Text>
                                        </VStack>

                                        {/* Amount and date at the end */}
                                        <VStack align="end">
                                            <Text fontWeight="bold" color="green.500" fontSize="18">{transaction.amount}</Text>
                                            <Text>{transaction.date}</Text>
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
