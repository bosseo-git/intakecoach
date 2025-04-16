import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Box, 
  Button, 
  Flex, 
  Text, 
  Heading, 
  Badge, 
  Divider, 
  useToast, 
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack
} from '@chakra-ui/react';

const SubscriptionManager = () => {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!session) return;

      try {
        setLoading(true);
        const response = await fetch('/api/get-subscription');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription data');
        }
        
        const data = await response.json();
        setSubscription(data.subscription);
        setCustomerId(data.customerId);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast({
          title: 'Error fetching subscription',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [session, toast]);

  const handleManageSubscription = async () => {
    if (!customerId) {
      toast({
        title: 'Cannot manage subscription',
        description: 'No customer ID found',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setPortalLoading(true);
      const response = await fetch('/api/create-customer-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="300px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (!subscription) {
    return (
      <Card variant="outline" mb={6}>
        <CardBody>
          <Stack spacing={4} align="center" textAlign="center">
            <Heading size="md">You don't have an active subscription</Heading>
            <Text>Upgrade your account to access premium features</Text>
            <Button 
              colorScheme="blue" 
              as="a" 
              href="/pricing"
            >
              View Plans
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'trialing': return 'purple';
      case 'past_due': return 'orange';
      case 'canceled': return 'red';
      case 'unpaid': return 'red';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase() || 'USD',
    }).format(amount);
  };

  return (
    <Card variant="outline" mb={6}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md">Your Subscription</Heading>
          <Badge colorScheme={getStatusColor(subscription.status)} fontSize="sm" px={2} py={1} borderRadius="md">
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </Badge>
        </Flex>
      </CardHeader>
      
      <Divider />
      
      <CardBody>
        <Stack spacing={4}>
          <Flex justify="space-between">
            <Text fontWeight="bold">Plan</Text>
            <Text>{subscription.planName}</Text>
          </Flex>
          
          <Flex justify="space-between">
            <Text fontWeight="bold">Price</Text>
            <Text>
              {formatCurrency(subscription.amount, subscription.currency)} / 
              {subscription.interval === 'month' ? 'month' : 'year'}
            </Text>
          </Flex>
          
          <Flex justify="space-between">
            <Text fontWeight="bold">Current Period Ends</Text>
            <Text>{formatDate(subscription.currentPeriodEnd)}</Text>
          </Flex>
          
          {subscription.cancelAtPeriodEnd && (
            <Flex justify="space-between">
              <Text fontWeight="bold">Status</Text>
              <Text color="red.500">Cancels at period end</Text>
            </Flex>
          )}
          
          {subscription.paymentMethod && (
            <Flex justify="space-between">
              <Text fontWeight="bold">Payment Method</Text>
              <Text>
                {subscription.paymentMethod.brand.charAt(0).toUpperCase() + subscription.paymentMethod.brand.slice(1)} ending in 
                {subscription.paymentMethod.last4} (expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear})
              </Text>
            </Flex>
          )}
        </Stack>
      </CardBody>
      
      <Divider />
      
      <CardFooter>
        <Button
          colorScheme="blue"
          onClick={handleManageSubscription}
          isLoading={portalLoading}
          width="full"
        >
          Manage Subscription
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionManager; 