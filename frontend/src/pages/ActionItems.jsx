
import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Wallet, Database, FileText, Globe } from 'lucide-react';

const ActionItems = () => {
  const [filter, setFilter] = useState('all');

  const actionItems = [
    {
      id: 1,
      category: 'Immediate Priority',
      title: 'Implement Wallet Integration',
      description: 'Make the "Connect Wallet" button functional using Coinbase, MetaMask, and Keplr SDKs',
      status: 'in-progress',
      priority: 'high',
      icon: Wallet
    },
    {
      id: 2,
      category: 'Immediate Priority',
      title: 'Dynamicize Defendant Database',
      description: 'Migrate defendants.js data into PostgreSQL with Express.js API layer',
      status: 'completed',
      priority: 'high',
      icon: Database
    },
    {
      id: 3,
      category: 'Immediate Priority',
      title: 'Build Interactive Evidence Explorer',
      description: 'Enhance Defendants page with Chain of Guilt visualizer and compound interest calculator',
      status: 'pending',
      priority: 'high',
      icon: FileText
    },
    {
      id: 4,
      category: 'Medium-Term',
      title: 'Integrate Cosmos SDK Blockchain',
      description: 'Connect React frontend to Aequitas Zone testnet for live on-chain data',
      status: 'pending',
      priority: 'medium',
      icon: Globe
    },
    {
      id: 5,
      category: 'Medium-Term',
      title: 'Implement Claim Filing System',
      description: 'Build secure portal for verified descendants to file arbitration demands',
      status: 'pending',
      priority: 'medium',
      icon: FileText
    },
    {
      id: 6,
      category: 'Medium-Term',
      title: 'Integrate IPFS for Evidence Storage',
      description: 'Store source documents on IPFS with immutable hash references',
      status: 'pending',
      priority: 'medium',
      icon: Database
    },
    {
      id: 7,
      category: 'Long-Term',
      title: 'Build DAO Governance UI',
      description: 'Create voting interface for $REPAR holders on governance proposals',
      status: 'pending',
      priority: 'low',
      icon: Wallet
    },
    {
      id: 8,
      category: 'Long-Term',
      title: 'Mobile Responsive Optimization',
      description: 'Ensure full functionality on mobile devices for global accessibility',
      status: 'pending',
      priority: 'low',
      icon: Globe
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredItems = filter === 'all' 
    ? actionItems 
    : actionItems.filter(item => item.category === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Development Roadmap</h1>
        <p className="text-gray-600">Track implementation progress of the Aequitas Protocol enhancement plan</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        {['all', 'Immediate Priority', 'Medium-Term', 'Long-Term'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === tab
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'all' ? 'All Items' : tab}
          </button>
        ))}
      </div>

      {/* Action Items Grid */}
      <div className="grid gap-4">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  <span className={`text-sm font-semibold ${getPriorityColor(item.priority)}`}>
                    {item.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {actionItems.filter(i => i.status === 'completed').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {actionItems.filter(i => i.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-1">
            <AlertCircle className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">
            {actionItems.filter(i => i.status === 'pending').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActionItems;
