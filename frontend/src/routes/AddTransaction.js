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
                title: 'Transaction added.',
                description: 'Your transaction has been successfully added.',
                status: 'success',
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
                title: 'Missing fields.',
                description: 'Please fill out all fields before adding the transaction.',
                status: 'error',
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
            <Box textAlign="center" mb={8}>
                <Heading size="lg" color="gray.700">Add New Transaction</Heading>
                <Text fontSize="sm" color="gray.500">Track your income and expenses efficiently</Text>
            </Box>

            <Stack spacing={6}>
                <Input 
                    placeholder="Title" 
                    variant="outline"
                    focusBorderColor="gray.400"
                    size="lg"
                    bg="white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                />

                <Button 
                    colorScheme="green" 
                    width="100%" 
                    size="lg"
                    onClick={handleAddTransaction}
                    bg="green.500"
                    color="white"
                    _hover={{ bg: "green.600" }}
                    _active={{ bg: "green.700" }}
                >
                    Add Transaction
                </Button>
            </Stack>
        </Box>
    );
}
