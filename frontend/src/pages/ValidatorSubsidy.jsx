import { useState, useEffect } from 'react';
import { Server, DollarSign, Shield, AlertCircle, TrendingUp, Clock, CheckCircle, Wallet } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function ValidatorSubsidy() {
  const [subsidyPool, setSubsidyPool] = useState(null);
  const [validators, setValidators] = useState([]);
  const [payments, setPayments] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(6456); // $6,456 USDC/month
  const [emergency, setEmergency] = useState(2152); // $2,152 emergency reserve
  const [infrastructure, setInfrastructure] = useState(4304); // $4,304 base infrastructure

  useEffect(() => {
    fetchSubsidyData();
  }, []);

  const fetchSubsidyData = async () => {
    try {
      // These would be real API calls to the blockchain in production
      // For now, using mock data
      setSubsidyPool({
        totalAllocated: '15000000',
        monthlyBudget: '1000000',
        emergencyReserve: '500000',
        lastDistribution: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
      });

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
        {
          id: 'payment-2',
          validatorAddress: 'aequitasvaloper1...',
          amount: '6456',
          timestamp: Date.now() - 45 * 24 * 60 * 60 * 1000,
          type: 'MONTHLY_SUBSIDY',
          notes: 'Monthly validator subsidy payment in USDC from DEX Treasury',
        },
        {
          id: 'payment-3',
          validatorAddress: 'aequitasvaloper1...',
          amount: '6456',
          timestamp: Date.now() - 75 * 24 * 60 * 60 * 1000,
          type: 'MONTHLY_SUBSIDY',
          notes: 'Monthly validator subsidy payment in USDC from DEX Treasury',
        },
      ]);

      setSchedule({
        distributionIntervalSeconds: 2592000, // 30 days
        nextDistribution: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
        autoDistribute: true,
        minValidatorUptimePercent: '95.0',
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch subsidy data:', error);
      setLoading(false);
    }
  };

  const formatUSDC = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysUntilNextPayment = () => {
    if (!schedule) return 0;
    const diff = schedule.nextDistribution - Date.now();
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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
            value={`${budget.toLocaleString()} USDC`}
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
                  Total: ${infrastructure.toLocaleString()}/month
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
                  Total: ${emergency.toLocaleString()}/month
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-purple-900">Total Allocation</h3>
                </div>
                <p className="text-sm text-purple-800">
                  ${budget.toLocaleString()} USDC per validator per month (from DEX Treasury)
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
                        {validator.validatorAddress.substring(0, 20)}...
                      </h3>
                      <p className="text-sm text-gray-500">
                        Operator: {validator.operatorAddress.substring(0, 20)}...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      validator.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      validator.status === 'INACTIVE' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {validator.status}
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
                      <span>Infrastructure: ${validator.infrastructureCostUsd}/mo</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Emergency Buffer: ${validator.emergencyBufferUsd}/mo</span>
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
                      {payment.validatorAddress.substring(0, 15)}...
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        payment.type === 'MONTHLY_SUBSIDY' ? 'bg-green-100 text-green-800' :
                        payment.type === 'EMERGENCY_EXPENSE' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {payment.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-indigo-600">
                      ${formatUSDC(payment.amount)} USDC
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{payment.notes}</td>
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
                  {schedule.distributionIntervalSeconds / 86400} days
                </p>
                <p className="text-sm text-indigo-200 mt-1">Automatic monthly payments</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-bold">Next Distribution</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {getDaysUntilNextPayment()} days
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
                  {schedule.minValidatorUptimePercent}%
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