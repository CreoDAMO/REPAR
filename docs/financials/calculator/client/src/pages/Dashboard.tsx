import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FinancialModelChart from "@/components/FinancialModelChart";
import ReturnProjectionsChart from "@/components/ReturnProjectionsChart";
import RevenueStreamsChart from "@/components/RevenueStreamsChart";
import ValuationBreakdownChart from "@/components/ValuationBreakdownChart";

interface FinancialInputs {
  developmentCost: number;
  prelaunchValuation: number;
  blockchainInfrastructureValue: number;
  aiProtocolValue: number;
  nativeCoinEconomicsValue: number;
  networkEffectsValue: number;
  afterLaunchValuation: number;
  operationalWarChest: number;
  totalAddressableMarket: number;
  seedRaise: number;
  preMoneyValuation: number;
  legalEnforcement: number;
  securityOperations: number;
  eliteCoreTeam: number;
  aiInfrastructure: number;
  contingencyReserve: number;
  transactionFeesYear1: number;
  transactionFeesYear3: number;
  validatorEconomicsYear1: number;
  validatorEconomicsYear3: number;
  crossChainBridgesYear1: number;
  crossChainBridgesYear3: number;
  justiceEnforcementYear1: number;
  justiceEnforcementYear3: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [inputs, setInputs] = useState<FinancialInputs | null>(null);
  const [outputs, setOutputs] = useState<any>(null);

  // Fetch default financial model
  const defaultModel = trpc.financialModel.getDefault.useQuery();

  // Analyze calculation
  // const analyzeQuery = trpc.calculation.analyze.useQuery(inputs || {}, {
  //   enabled: !!inputs,
  // });

  useEffect(() => {
    if (defaultModel.data) {
      setInputs(defaultModel.data.inputs);
      setOutputs(defaultModel.data.outputs);
    }
  }, [defaultModel.data]);

  // useEffect(() => {
  //   if (analyzeQuery.data) {
  //     setOutputs(analyzeQuery.data);
  //   }
  // }, [analyzeQuery.data]);

  const handleInputChange = (key: keyof FinancialInputs, value: number) => {
    setInputs((prev) => prev ? { ...prev, [key]: value } : null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  if (!inputs || !outputs) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Aequitas Protocol Advanced Calculator
          </h1>
          <p className="text-slate-400">
            Interactive financial modeling and analysis for the REPAR native coin ecosystem
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="model" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="model" className="text-slate-300 data-[state=active]:text-white">
              Financial Model
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="text-slate-300 data-[state=active]:text-white">
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="sensitivity" className="text-slate-300 data-[state=active]:text-white">
              Sensitivity
            </TabsTrigger>
            <TabsTrigger value="cerberus" className="text-slate-300 data-[state=active]:text-white">
              Cerberus Engine
            </TabsTrigger>
          </TabsList>

          {/* Financial Model Tab */}
          <TabsContent value="model" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <Card className="lg:col-span-3 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Equity Percentage</p>
                      <p className="text-white text-2xl font-bold">
                        {formatPercent(outputs.equityPercentage)}
                      </p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Implied Value Per $1</p>
                      <p className="text-white text-2xl font-bold">
                        {formatCurrency(outputs.impliedValuePerDollar)}
                      </p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Total Use of Funds</p>
                      <p className="text-white text-2xl font-bold">
                        {formatCurrency(outputs.totalUseOfFunds)}
                      </p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">TAM Utilization</p>
                      <p className="text-white text-2xl font-bold">
                        {formatPercent(outputs.tamUtilization)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input Controls */}
              <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Adjust Parameters</CardTitle>
                  <CardDescription className="text-slate-400">
                    Modify key financial inputs to see real-time impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-slate-300">Seed Raise: {formatCurrency(inputs.seedRaise)}</Label>
                    <Slider
                      value={[inputs.seedRaise]}
                      onValueChange={(value) => handleInputChange("seedRaise", value[0])}
                      min={1000000}
                      max={100000000}
                      step={1000000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">
                      Pre-Money Valuation: {formatCurrency(inputs.preMoneyValuation)}
                    </Label>
                    <Slider
                      value={[inputs.preMoneyValuation]}
                      onValueChange={(value) => handleInputChange("preMoneyValuation", value[0])}
                      min={1000000000}
                      max={50000000000}
                      step={100000000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">
                      Transaction Fees Year 1: {formatCurrency(inputs.transactionFeesYear1)}
                    </Label>
                    <Slider
                      value={[inputs.transactionFeesYear1]}
                      onValueChange={(value) => handleInputChange("transactionFeesYear1", value[0])}
                      min={100000000}
                      max={2000000000}
                      step={50000000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">
                      Justice Enforcement Year 1: {formatCurrency(inputs.justiceEnforcementYear1)}
                    </Label>
                    <Slider
                      value={[inputs.justiceEnforcementYear1]}
                      onValueChange={(value) => handleInputChange("justiceEnforcementYear1", value[0])}
                      min={1000000000}
                      max={50000000000}
                      step={500000000}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Return Projections */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Return Scenarios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs">Conservative</p>
                    <p className="text-green-400 font-bold">{outputs.conservative.returnMultiple}x</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs">Expected</p>
                    <p className="text-blue-400 font-bold">{outputs.expected.returnMultiple}x</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs">Aggressive</p>
                    <p className="text-orange-400 font-bold">{outputs.aggressive.returnMultiple}x</p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs">Paradigm Shift</p>
                    <p className="text-purple-400 font-bold">{outputs.paradigmShift.returnMultiple}x</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Return Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReturnProjectionsChart data={outputs} />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueStreamsChart data={outputs} />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Valuation Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ValuationBreakdownChart data={outputs} />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Use of Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinancialModelChart data={outputs} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scenarios Tab */}
          <TabsContent value="scenarios">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Scenario Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Create and compare multiple financial scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Scenario management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sensitivity Tab */}
          <TabsContent value="sensitivity">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Sensitivity Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Analyze how changes in key variables impact outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Sensitivity analysis coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cerberus Tab */}
          <TabsContent value="cerberus">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cerberus Engine Simulation</CardTitle>
                <CardDescription className="text-slate-400">
                  Simulate AI auditor impact on asset recovery and ecosystem valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Cerberus Engine simulation coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

