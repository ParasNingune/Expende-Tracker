import React, { useState } from 'react';
import { Box, Button, Heading, Input, Select, Stack, useToast, Text } from '@chakra-ui/react';
import { getDatabase, ref, push } from "firebase/database";
import app from "../fireBaseConfig";

export default function AddTransaction() {
    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const toast = useToast();

    // Define categories and corresponding images
    const categoryImages = {
        // Income categories
        salary: 'https://images.cnbctv18.com/wp-content/uploads/2020/04/salary-2-1019x573.jpg',
        returned: 'https://media.istockphoto.com/id/1185417262/photo/man-holds-gives-a-bag-of-money-in-hand-like-a-bonus-businessman-holding-bag-of-money-in-hand.jpg?s=612x612&w=0&k=20&c=_YEJdu7K6BCWMdKv9_NLJ0OgecIYmGiY7uijNrAQUgE=',
        business_income: 'https://www.taxscan.in/wp-content/uploads/2018/07/License-Agreement-Business-Income-Taxscan.jpg',
        investment_returns: 'https://admin.mysiponline.com/app/webroot/blog_uploadimages/1518763481cover(16feb)-min.webp',
        gift_received: 'https://www.icicibank.com/content/dam/icicibank/nri-guide-on-gifts.webp',
        other_income: 'https://media.licdn.com/dms/image/v2/D560BAQFBu3A6xKtlFA/company-logo_200_200/company-logo_200_200/0/1687288317122/other__logo?e=2147483647&v=beta&t=5BjRtIdfYi-MuZDbHmEXAMJJzp3OdLHu7OExHGShRmo',

        // Expense categories
        groceries: 'https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg?crop=0.563xw:1.00xh;0.216xw,0&resize=640:*',
        utilities: 'https://t4.ftcdn.net/jpg/04/98/67/31/360_F_498673144_WdXFtnwIz92ronlBSjL5HW2E4Ne2rAmU.jpg',
        entertainment: 'https://etimg.etb2bimg.com/photo/81478822.cms',
        housing: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdVo4NltH2r6GzMNAPR5VLUAlT_juGChilw&s',
        fitness: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqEyFHvuFMAc-knprFmaQcUBLgB4bTxJwL9Q&s',
        healthcare: 'https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg',
        transportation: 'https://e7.pngegg.com/pngimages/644/485/png-clipart-air-transportation-cargo-freight-transport-logistics-logistic-people-mode-of-transport.png',
        travel: 'https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg',
        other_expense: 'https://media.licdn.com/dms/image/v2/D560BAQFBu3A6xKtlFA/company-logo_200_200/company-logo_200_200/0/1687288317122/other__logo?e=2147483647&v=beta&t=5BjRtIdfYi-MuZDbHmEXAMJJzp3OdLHu7OExHGShRmo',
    };

    const incomeCategories = [
        { value: 'salary', label: 'Salary' },
        { value: 'investment_returns', label: 'Investment Returns' },
        { value: 'gift_received', label: 'Gift or Donation Received' },
        { value: 'other_income', label: 'Other Income' }
    ];

    const expenseCategories = [
        { value: 'groceries', label: 'Groceries' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'travel', label: 'Travel' },
        { value: 'other_expense', label: 'Other Expense' }
    ];

    const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

    const handleAddTransaction = () => {
        if (title && amount && transactionType && category && date) {
            // Get the image for the selected category
            const categoryImage = categoryImages[category];

            // Prepare the transaction object
            const transaction = {
                title,
                amount: parseFloat(amount),
                transactionType,
                category,
                category_image: categoryImage,  // Add the image URL here
                date,
            };

            const db = getDatabase(app);
            const transactionRef = ref(db, 'transactions');
            push(transactionRef, transaction)
                .then(() => {
                    toast({
                        render: () => (
                            <Box 
                                w="400px" 
                                p={6} 
                                bg="green.500" 
                                color="white" 
                                borderRadius="md"
                            >
                                <Text fontWeight="bold" fontSize="lg" mb={2}>
                                    Transaction added.
                                </Text>
                                <Text fontSize="sm">
                                    Your transaction has been successfully added.
                                </Text>
                            </Box>
                        ),
                        duration: 3000,
                        isClosable: true,
                    });

                    // Reset form fields
                    setTitle('');
                    setAmount('');
                    setTransactionType('');
                    setCategory('');
                    setDate('');
                })
                .catch((error) => {
                    console.error('Error adding transaction:', error);
                    toast({
                        title: 'Error',
                        description: 'Failed to add transaction. Please try again.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                });
        } else {
            toast({
                render: () => (
                    <Box 
                        w="400px" 
                        p={6} 
                        bg="red.500" 
                        color="white" 
                        borderRadius="md"
                        alignSelf={'center'}
                    >
                        <Text fontWeight="bold" fontSize="lg" mb={2}>
                            Missing fields.
                        </Text>
                        <Text fontSize="sm">
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
                <Heading size="lg" fontSize='xl' color="gray.700">Add New Transaction</Heading>
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
