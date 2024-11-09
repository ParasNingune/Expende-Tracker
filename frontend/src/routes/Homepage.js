import React from 'react';
import { Box, Tabs, TabList, Tab, Divider, TabPanels, TabPanel } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import Income from './Income'
import Expense from './Expense';
import AddTransaction from './AddTransaction';
import Analysis from './Analysis';

export default function Homepage() {
  return (
    <Box display="flex" height="100vh" width="100vw">
      {/* Sidebar */}
      <Box
        width="15%"
        bg="blue.600"
        boxShadow="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRight="2px solid"
        borderColor="blue.700"
      >
        <Tabs
          variant="unstyled"
          orientation="vertical"
          height="100%"
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <TabList height="100%" display="flex" flexDirection="column">
            {['Dashboard', 'All Income', 'All Expense', 'Add Transaction', 'Analysis'].map((label, index) => (
              <React.Fragment key={label}>
                <Tab
                  fontSize="lg"
                  fontWeight="bold"
                  flex="1"
                  paddingY={4}
                  m={2}
                  borderRadius="md"
                  color="whiteAlpha.800"
                  _hover={{ bg: "blue.700", color: "white" }}
                  _selected={{ bg: "blue.800", color: "white" }}
                  transition="background 0.3s"
                >
                  {label}
                </Tab>
                {index < 4 && <Divider borderColor="blue.700" />}
              </React.Fragment>
            ))}
          </TabList>
          <TabPanels>

            <TabPanel>
              <Dashboard />
            </TabPanel>

            <TabPanel>
              <Income />
            </TabPanel>

            <TabPanel>
              <Expense />
            </TabPanel>

            <TabPanel>
              <AddTransaction />
            </TabPanel>

            <TabPanel>
              <Analysis />
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box> 
    </Box>
  );
}
