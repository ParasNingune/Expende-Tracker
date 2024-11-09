import React from 'react';
import { Box, Heading, HStack } from '@chakra-ui/react';
import IncomeExpenseGraph from './IncomeExpenseGraph';
import PieGraph from './PieGraph';

export default function Analysis() {
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
            <Box display="grid" height='80%' gridTemplateColumns="1fr 2fr" gap="2">
                {/* Left Section - Categories */}
                <Box bg="gray.300" borderRadius="md" p="4">
                    <Heading size="md" textAlign="center" mb="14">Pie Chart</Heading>
                    <PieGraph />
                </Box>

                {/* Right Section - Income vs Expense */}
                <Box bg="gray.300" borderRadius="md" p="4">
                    <Heading size="md" textAlign="center" mb="8">Income vs Expense</Heading>
                    <IncomeExpenseGraph />
                </Box>
            </Box>
        </Box>
    </Box>
  );
}
