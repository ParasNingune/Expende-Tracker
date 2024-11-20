import React, { useState } from 'react';
import { Box, Button, Heading, Input, Select, Stack, useToast, Text } from '@chakra-ui/react';

export default function AddTransaction() {
    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const toast = useToast();

    const incomeCategories = [
        { value: 'salary', label: 'Salary' },
        { value: 'returned', label: 'Repayed' },
        { value: 'business_income', label: 'Business Income' },
        { value: 'investment_returns', label: 'Investment Returns' },
        { value: 'gift_received', label: 'Gift or Donation Received' },
        { value: 'other_income', label: 'Other Income' }
    ];

    const expenseCategories = [
        { value: 'groceries', label: 'Groceries' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'housing', label: 'Housing' },
        { value: 'fitness', label: 'Fitness' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'transportation', label: 'Transportation' },
        { value: 'travel', label: 'Travel' },
        { value: 'other_expense', label: 'Other Expense' }
    ];

    const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

    const handleAddTransaction = () => {
        if (title && amount && transactionType && category && date) {
            toast({
                render: () => (
                    <Box 
                        w="300px" /* Increased width */
                        p={6} /* Increased padding */
                        bg="green.500" 
                        color="white" 
                        borderRadius="md"
                    >
                        <Text fontWeight="bold" fontSize="xl" mb={2}>
                            Transaction added.
                        </Text>
                        <Text fontSize="lg">
                            Your transaction has been successfully added.
                        </Text>
                    </Box>
                ),
                duration: 3000,
                isClosable: true,
            });
            setTitle('');
            setAmount('');
            setTransactionType('');
            setCategory('');
            setDate('');
        } else {
            toast({
                render: () => (
                    <Box 
                        w="300px" /* Increase width */
                        p={6} /* Increase padding */
                        bg="red.500" 
                        color="white" 
                        borderRadius="md"
                    >
                        <Text fontWeight="bold" fontSize="xl" mb={2}>
                            Missing fields.
                        </Text>
                        <Text fontSize="lg">
                            Please fill out all fields before adding the transaction.
                        </Text>
                    </Box>
                ),
                duration: 3000,
                isClosable: true,
            });
        }
    };
    

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
            <Box textAlign="center" mb={6} marginTop='2'>
                <Heading size="lg" fontSize='2xl' color="gray.700">Add New Transaction</Heading>
                <Text size='lg' fontSize='lg' color="gray.500">Track your income and expenses efficiently</Text>
            </Box>

            <Stack spacing={6} marginTop='10'>
                <Input 
                    placeholder="Title" 
                    variant="outline"
                    focusBorderColor="gray.400"
                    size="lg"
                    bg="white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                />

                <Input 
                    placeholder="Amount" 
                    type="number" 
                    variant="outline"
                    focusBorderColor="gray.400"
                    size="lg"
                    bg="white"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                />

                <Select
                    placeholder="Transaction Type"
                    variant="outline"
                    focusBorderColor="gray.400"
                    size="lg"
                    bg="white"
                    value={transactionType}
                    onChange={(e) => {
                        setTransactionType(e.target.value);
                        setCategory('');
                    }}
                    height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </Select>

                {transactionType && (
                    <Select
                        placeholder="Category"
                        variant="outline"
                        focusBorderColor="gray.400"
                        size="lg"
                        bg="white"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </Select>
                )}

                <Input 
                    placeholder="When" 
                    type="date" 
                    variant="outline"
                    focusBorderColor="gray.400"
                    size="lg"
                    bg="white"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                />

                <Button 
                    colorScheme="green" 
                    width="80%" 
                    size="lg"
                    onClick={handleAddTransaction}
                    bg="green.500"
                    color="white"
                    _hover={{ bg: "green.600" }}
                    _active={{ bg: "green.700" }}
                    height='3.5rem'
                    fontSize='2xl'
                    marginBottom={3}
                    marginTop='5'
                    alignSelf='center'
                >
                    Add Transaction
                </Button>
            </Stack>
        </Box>
    );
}
