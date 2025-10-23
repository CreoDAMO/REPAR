import { useState, useEffect } from 'react';
import { Server, DollarSign, Shield, AlertCircle, TrendingUp, Clock, CheckCircle, Wallet } from 'lucide-react';
import StatCard from '../components/StatCard';

// Assume tmClient is available globally or imported from a context
// For demonstration purposes, we'll assume it's imported from a shared context or utility
// In a real application, this would be handled more robustly, e.g., via React Context
import { tmClient } from '../utils/tmClient'; // Placeholder for actual tmClient import

export default function ValidatorSubsidy() {
  // State variables for subsidy pool, validators, payments, and schedule
  const [subsidyPool, setSubsidyPool] = useState(null);
  const [validators, setValidators] = useState([]);
  const [payments, setPayments] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for initial display or fallback
  const [budget, setBudget] = useState(6456); // $6,456 USDC/month
  const [emergency, setEmergency] = useState(2152); // $2,152 emergency reserve
  const [infrastructure, setInfrastructure] = useState(4304); // $4,304 base infrastructure

  // Mock state for pool balance, operator expenses, etc. which will be replaced by live data
  const [poolBalance, setPoolBalance] = useState(45000000);
  const [operatorExpenses, setOperatorExpenses] = useState(12500000);
  const [lastDistribution, setLastDistribution] = useState(new Date(Date.now() - 86400000)); // 1 day ago
  const [nextDistribution, setNextDistribution] = useState(new Date(Date.now() + 86400000)); // 1 day from now
  const [totalDistributed, setTotalDistributed] = useState(128000000);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Attempt to get the Stargate client
        // Ensure tmClient is properly initialized and accessible
        if (tmClient) {
          // Query validator subsidy pool state
          try {
            const poolQuery = {
              path: "/aequitas.validatorsubsidy.v1.Query/Pool",
              data: new Uint8Array(),
              prove: false,
            };
            const poolResponse = await tmClient.abciQuery(poolQuery);

            if (poolResponse.code === 0 && poolResponse.value) {
              const poolData = JSON.parse(new TextDecoder().decode(poolResponse.value));
              setSubsidyPool({
                totalAllocated: poolData.totalAllocated,
                monthlyBudget: poolData.monthlyBudget,
                emergencyReserve: poolData.emergencyReserve,
                lastDistribution: new Date(poolData.lastDistribution),
                nextDistribution: new Date(poolData.nextDistribution),
              });

              setPoolBalance(parseInt(poolData.balance || '0'));
              setOperatorExpenses(parseInt(poolData.operatorExpenses || '0'));
              setTotalDistributed(parseInt(poolData.totalDistributed || '0'));
              setLastDistribution(new Date(poolData.lastDistribution || Date.now() - 86400000));
              setNextDistribution(new Date(poolData.nextDistribution || Date.now() + 86400000));

              // Fetch validators
              const validatorsQuery = {
                path: "/aequitas.validatorsubsidy.v1.Query/Validators",
                data: new Uint8Array(),
                prove: false,
              };
              const validatorsResponse = await tmClient.abciQuery(validatorsQuery);
              if (validatorsResponse.code === 0 && validatorsResponse.value) {
                const validatorsData = JSON.parse(new TextDecoder().decode(validatorsResponse.value));
                setValidators(validatorsData.validators || []);
              } else {
                console.warn('Validators query failed, using empty list.');
                setValidators([]);
              }

              // Fetch payments
              const paymentsQuery = {
                path: "/aequitas.validatorsubsidy.v1.Query/Payments",
                data: new Uint8Array(),
                prove: false,
              };
              const paymentsResponse = await tmClient.abciQuery(paymentsQuery);
              if (paymentsResponse.code === 0 && paymentsResponse.value) {
                const paymentsData = JSON.parse(new TextDecoder().decode(paymentsResponse.value));
                setPayments(paymentsData.payments || []);
              } else {
                console.warn('Payments query failed, using empty list.');
                setPayments([]);
              }

              // Fetch schedule
              const scheduleQuery = {
                path: "/aequitas.validatorsubsidy.v1.Query/Schedule",
                data: new Uint8Array(),
                prove: false,
              };
              const scheduleResponse = await tmClient.abciQuery(scheduleQuery);
              if (scheduleResponse.code === 0 && scheduleResponse.value) {
                const scheduleData = JSON.parse(new TextDecoder().decode(scheduleResponse.value));
                setSchedule({
                  distributionIntervalSeconds: parseInt(scheduleData.distributionIntervalSeconds || '2592000'),
                  nextDistribution: new Date(scheduleData.nextDistribution || Date.now() + 15 * 24 * 60 * 60 * 1000),
                  autoDistribute: scheduleData.autoDistribute,
                  minValidatorUptimePercent: scheduleData.minValidatorUptimePercent || '95.0',
                });
              } else {
                console.warn('Schedule query failed, using defaults.');
                setSchedule({
                  distributionIntervalSeconds: 2592000, // 30 days
                  nextDistribution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
                  autoDistribute: true,
                  minValidatorUptimePercent: '95.0',
                });
              }

            } else {
              console.warn('Pool query failed, using defaults');
              // Fallback to default values if query fails or returns no value
              setPoolBalance(45000000);
              setOperatorExpenses(12500000);
              setTotalDistributed(128000000);
              setLastDistribution(new Date(Date.now() - 86400000));
              setNextDistribution(new Date(Date.now() + 86400000));
              setValidators([]);
              setPayments([]);
              setSchedule({
                distributionIntervalSeconds: 2592000, // 30 days
                nextDistribution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
                autoDistribute: true,
                minValidatorUptimePercent: '95.0',
              });
            }
          } catch (queryError) {
            console.warn('Error querying blockchain data, using defaults:', queryError);
            // Fallback to default values on error
            setPoolBalance(45000000);
            setOperatorExpenses(12500000);
            setTotalDistributed(128000000);
            setLastDistribution(new Date(Date.now() - 86400000));
            setNextDistribution(new Date(Date.now() + 86400000));
            setValidators([]);
            setPayments([]);
            setSchedule({
              distributionIntervalSeconds: 2592000, // 30 days
              nextDistribution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
              autoDistribute: true,
              minValidatorUptimePercent: '95.0',
            });
          }
        } else {
          // Chain not available, use mock data
          console.warn('Tendermint client not available, using mock data.');
          setPoolBalance(45000000);
          setOperatorExpenses(12500000);
          setLastDistribution(new Date(Date.now() - 86400000));
          setNextDistribution(new Date(Date.now() + 86400000));
          setTotalDistributed(128000000);
          setValidators([
            {
              validatorAddress: 'aequitasvaloper1...',
              operatorAddress: 'aequitas1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun',
              monthlyAllocation: '6456',
              totalReceived: '19368',
              status: 'ACTIVE',
              infrastructureCostUsd: '4304.00',
              emergencyBufferUsd: '2152.00',
              lastPayment: Date.now() - 15 * 24 * 60 * 60 * 1000,
              registeredAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
            },
          ]);
          setPayments([
            {
              id: 'payment-1',
              validatorAddress: 'aequitasvaloper1...',
              amount: '6456',
              timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000,
              type: 'MONTHLY_SUBSIDY',
              notes: 'Monthly validator subsidy payment in USDC from DEX Treasury',
            },
          ]);
          setSchedule({
            distributionIntervalSeconds: 2592000, // 30 days
            nextDistribution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
            autoDistribute: true,
            minValidatorUptimePercent: '95.0',
          });
        }
      } catch (error) {
        console.error('Failed to fetch subsidy data:', error);
        // Use fallback data on error
        setPoolBalance(45000000);
        setOperatorExpenses(12500000);
        setTotalDistributed(128000000);
        setLastDistribution(new Date(Date.now() - 86400000));
        setNextDistribution(new Date(Date.now() + 86400000));
        setValidators([]);
        setPayments([]);
        setSchedule({
          distributionIntervalSeconds: 2592000, // 30 days
          nextDistribution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
          autoDistribute: true,
          minValidatorUptimePercent: '95.0',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh data every 30 seconds
    return () => clearInterval(interval);
  }, [tmClient]); // Depend on tmClient to refetch if it changes


  const formatUSDC = (amount) => {
    // Ensure amount is treated as a number, handle potential undefined/null
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return '0.00';
    }
    return numericAmount.toFixed(2);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date:", timestamp, e);
      return 'Invalid Date';
    }
  };

  const getDaysUntilNextPayment = () => {
    if (!schedule || !schedule.nextDistribution) return 'N/A';
    const diff = new Date(schedule.nextDistribution).getTime() - Date.now();
    if (diff < 0) return 'Due';
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading validator subsidy data...</p>
        </div>
      </div>
    );
  }

  // Extract data for display, providing fallbacks
  const currentPoolBalance = poolBalance || 0;
  const currentOperatorExpenses = operatorExpenses || 0;
  const currentTotalDistributed = totalDistributed || 0;
  const currentBudget = subsidyPool?.monthlyBudget ? parseInt(subsidyPool.monthlyBudget) : budget;
  const currentEmergency = subsidyPool?.emergencyReserve ? parseInt(subsidyPool.emergencyReserve) : emergency;
  const currentInfrastructure = infrastructure; // Keeping this as mock for now if not available from chain

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="h-12 w-12 text-cyan-400" />
            <h1 className="text-4xl font-bold">Validator Subsidy Protocol</h1>
          </div>
          <p className="text-xl text-indigo-200">
            Ensuring Network Sustainability from Day 1
          </p>
          <p className="text-sm text-cyan-300 mt-2">
            Automatic monthly subsidies + emergency reserve for validator operations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Budget"
            value={`${currentBudget.toLocaleString()} USDC`}
            subtitle="Allocated per month"
            icon={<DollarSign className="h-8 w-8 text-green-600" />}
            color="green"
          />
          <StatCard
            title="Payment Source"
            value="DEX Treasury"
            subtitle="Funded by trading fees (USDC)"
            icon={<Shield className="h-8 w-8 text-orange-600" />}
            color="orange"
          />
          <StatCard
            title="Active Validators"
            value={validators.filter(v => v.status === 'ACTIVE').length.toString()}
            subtitle="Receiving subsidies"
            icon={<Server className="h-8 w-8 text-purple-600" />}
            color="purple"
          />
          <StatCard
            title="Next Payment"
            value={`${getDaysUntilNextPayment()} days`}
            subtitle="Until next distribution"
            icon={<Clock className="h-8 w-8 text-orange-600" />}
            color="orange"
          />
        </div>

        {/* Purpose & Explanation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">Why Validator Subsidies?</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              The Validator Subsidy Protocol ensures the Aequitas Zone blockchain remains secure and operational
              from day one by automatically funding validator infrastructure costs. This creates a self-sustaining
              network that doesn't rely on external funding or validators operating at a loss.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-bold text-green-900">Monthly Infrastructure</h3>
                </div>
                <p className="text-sm text-green-800">
                  Multi-server architecture: Validator Core ($168), RPC Fleet ($74), AI Engine ($30), Secure API Gateway ($32)
                </p>
                <p className="text-sm text-green-800 mt-2">
                  Total: ${currentInfrastructure.toLocaleString()}/month
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-900">Emergency Buffer</h3>
                </div>
                <p className="text-sm text-blue-800">
                  Emergency reserve for scaling, GPU nodes, and unforeseen infrastructure needs
                </p>
                <p className="text-sm text-blue-800 mt-2">
                  Total: ${currentEmergency.toLocaleString()}/month
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-purple-900">Total Allocation</h3>
                </div>
                <p className="text-sm text-purple-800">
                  ${currentBudget.toLocaleString()} USDC per validator per month (from DEX Treasury)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Validators */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Registered Validators</h2>

          <div className="space-y-4">
            {validators.map((validator, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      validator.status === 'ACTIVE' ? 'bg-green-500' :
                      validator.status === 'INACTIVE' ? 'bg-gray-400' :
                      'bg-red-500'
                    }`}></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {validator.validatorAddress?.substring(0, 20) || 'N/A'}...
                      </h3>
                      <p className="text-sm text-gray-500">
                        Operator: {validator.operatorAddress?.substring(0, 20) || 'N/A'}...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      validator.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      validator.status === 'INACTIVE' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {validator.status || 'UNKNOWN'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Monthly Allocation</p>
                    <p className="font-semibold text-indigo-600">
                      ${formatUSDC(validator.monthlyAllocation)} USDC
                    </p>
                    <p className="text-xs text-gray-500">
                      (Infrastructure + Emergency Reserve)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Received</p>
                    <p className="font-semibold text-green-600">
                      ${formatUSDC(validator.totalReceived)} USDC
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Payment</p>
                    <p className="font-semibold">{formatDate(validator.lastPayment)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Registered</p>
                    <p className="font-semibold">{formatDate(validator.registeredAt)}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Wallet className="h-4 w-4" />
                      <span>Infrastructure: ${validator.infrastructureCostUsd || '0.00'}/mo</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Emergency Buffer: ${validator.emergencyBufferUsd || '0.00'}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Payment History</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Validator</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm">{formatDate(payment.timestamp)}</td>
                    <td className="px-4 py-4 text-sm font-mono">
                      {payment.validatorAddress?.substring(0, 15) || 'N/A'}...
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        payment.type === 'MONTHLY_SUBSIDY' ? 'bg-green-100 text-green-800' :
                        payment.type === 'EMERGENCY_EXPENSE' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {payment.type?.replace('_', ' ') || 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-indigo-600">
                      ${formatUSDC(payment.amount)} USDC
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{payment.notes || 'No notes'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribution Schedule */}
        {schedule && (
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-8 w-8 text-cyan-400" />
              <h2 className="text-3xl font-bold">Distribution Schedule</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold">Distribution Interval</h3>
                </div>
                <p className="text-2xl font-bold text-cyan-400">
                  {schedule.distributionIntervalSeconds ? (schedule.distributionIntervalSeconds / 86400).toFixed(0) : 'N/A'} days
                </p>
                <p className="text-sm text-indigo-200 mt-1">Automatic monthly payments</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-bold">Next Distribution</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {getDaysUntilNextPayment()}
                </p>
                <p className="text-sm text-indigo-200 mt-1">
                  {formatDate(schedule.nextDistribution)}
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-bold">Min Uptime Required</h3>
                </div>
                <p className="text-2xl font-bold text-purple-400">
                  {schedule.minValidatorUptimePercent || 'N/A'}%
                </p>
                <p className="text-sm text-indigo-200 mt-1">To qualify for payments</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}