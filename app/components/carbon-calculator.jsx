"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Car, Zap, Utensils, Calculator, Lightbulb, TrendingDown } from "lucide-react"

export default function CarbonCalculator({ user }) {
  const [inputs, setInputs] = useState({
    vehicleDistance: "",
    fuelType: "petrol",
    publicTransport: "",
    flights: "",
    electricity: "",
    gas: "",
    houseSize: "medium",
    renewableEnergy: "",
    dietType: "average",
    localFood: "",
    wasteReduction: "medium",
    recycling: "",
  })

  const [results, setResults] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)

  const emissionFactors = {
    transport: {
      petrol: 2.31,
      diesel: 2.68,
      electric: 0.1,
      hybrid: 1.5,
      publicTransport: 0.5,
      flight: 255,
    },
    energy: {
      electricity: 0.5,
      gas: 2.0,
      houseSizeMultiplier: { small: 0.8, medium: 1.0, large: 1.3 },
    },
    diet: {
      "meat-heavy": 7.0,
      average: 5.5,
      "low-meat": 4.0,
      vegetarian: 3.0,
      vegan: 2.5,
    },
  }

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = async () => {
    setLoading(true)

    try {
      // Calculate locally first
      const transportEmissions = calculateTransportEmissions()
      const energyEmissions = calculateEnergyEmissions()
      const dietEmissions = calculateDietEmissions()
      const totalEmissions = transportEmissions + energyEmissions + dietEmissions

      const calculationResults = {
        total: totalEmissions,
        transport: transportEmissions,
        energy: energyEmissions,
        diet: dietEmissions,
        timestamp: new Date().toISOString(),
      }

      setResults(calculationResults)

      // Save to backend
      await saveCalculation(calculationResults)

      // Generate recommendations
      generateRecommendations(calculationResults)
    } catch (error) {
      console.error("Error calculating footprint:", error)
      // Still show results even if save fails
      generateRecommendations(results)
    } finally {
      setLoading(false)
    }
  }

  const calculateTransportEmissions = () => {
    let emissions = 0
    const vehicleDistance = Number.parseFloat(inputs.vehicleDistance) || 0
    const publicTransport = Number.parseFloat(inputs.publicTransport) || 0
    const flights = Number.parseFloat(inputs.flights) || 0

    if (vehicleDistance > 0) {
      const litersPerDay = vehicleDistance / 8
      emissions += litersPerDay * emissionFactors.transport[inputs.fuelType]
    }
    emissions += publicTransport * emissionFactors.transport.publicTransport
    emissions += (flights * emissionFactors.transport.flight) / 365

    return emissions
  }

  const calculateEnergyEmissions = () => {
    const electricity = Number.parseFloat(inputs.electricity) || 0
    const gas = Number.parseFloat(inputs.gas) || 0
    const renewableEnergy = Number.parseFloat(inputs.renewableEnergy) || 0

    const electricityFactor = emissionFactors.energy.electricity * (1 - renewableEnergy / 100)
    let emissions = (electricity / 30) * electricityFactor + (gas / 30) * emissionFactors.energy.gas
    emissions *= emissionFactors.energy.houseSizeMultiplier[inputs.houseSize]

    return emissions
  }

  const calculateDietEmissions = () => {
    const localFood = Number.parseFloat(inputs.localFood) || 0
    const wasteMultiplier = { low: 1.0, medium: 0.85, high: 0.7 }
    const localFoodReduction = (localFood / 100) * 0.2

    return emissionFactors.diet[inputs.dietType] * (1 - localFoodReduction) * wasteMultiplier[inputs.wasteReduction]
  }

  const generateRecommendations = (results) => {
    const recs = []

    if (results.transport > 5) {
      recs.push({
        id: 1,
        category: "Transportation",
        title: "Switch to Public Transport",
        description: "Using public transport 3 days a week could reduce your transport emissions by 40%",
        impact: "high",
        savings: "2-4 kg CO₂ per day",
        icon: "🚌",
        difficulty: "Easy",
      })
    }

    if (results.energy > 4) {
      recs.push({
        id: 2,
        category: "Energy",
        title: "Upgrade to LED Lighting",
        description: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs",
        impact: "medium",
        savings: "1-2 kg CO₂ per day",
        icon: "💡",
        difficulty: "Easy",
      })
    }

    if (results.diet > 5) {
      recs.push({
        id: 3,
        category: "Diet",
        title: "Try Meatless Mondays",
        description: "Reducing meat consumption one day per week can significantly lower your food carbon footprint",
        impact: "medium",
        savings: "1-3 kg CO₂ per day",
        icon: "🥗",
        difficulty: "Medium",
      })
    }

    // Always add a renewable energy recommendation
    recs.push({
      id: 4,
      category: "Energy",
      title: "Consider Solar Panels",
      description: "Solar panels can reduce your home energy emissions by up to 80%",
      impact: "high",
      savings: "3-6 kg CO₂ per day",
      icon: "☀️",
      difficulty: "Hard",
    })

    setRecommendations(recs)
  }

  const saveCalculation = async (results) => {
    try {
      const response = await fetch("/api/carbon/calculations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          inputs,
          results,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save calculation")
      }

      const savedCalculation = await response.json()
      console.log("Calculation saved:", savedCalculation)
      return savedCalculation
    } catch (error) {
      console.error("Error saving calculation:", error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-green-600" />
            <span>Carbon Footprint Calculator</span>
          </CardTitle>
          <CardDescription>Input your daily activities to calculate your carbon emissions</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Tabs defaultValue="transport" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transport" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Transport</span>
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Energy</span>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center space-x-2">
                <Utensils className="h-4 w-4" />
                <span>Diet</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transport" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🚗 Transportation</CardTitle>
                  <CardDescription>How do you get around?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleDistance"> Daily Vehicle Travel (km)</Label>
                      <Input
                        id="vehicleDistance"
                        type="number"
                        placeholder="e.g., 25"
                        value={inputs.vehicleDistance}
                        onChange={(e) => handleInputChange("vehicleDistance", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select value={inputs.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="publicTransport">Public Transport (hours/day)</Label>
                      <Input
                        id="publicTransport"
                        type="number"
                        placeholder="e.g., 2"
                        value={inputs.publicTransport}
                        onChange={(e) => handleInputChange("publicTransport", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flights">Flights per year</Label>
                      <Input
                        id="flights"
                        type="number"
                        placeholder="e.g., 4"
                        value={inputs.flights}
                        onChange={(e) => handleInputChange("flights", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="energy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚡ Home Energy</CardTitle>
                  <CardDescription>Your household energy consumption</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="electricity">Monthly Electricity (kWh)</Label>
                      <Input
                        id="electricity"
                        type="number"
                        placeholder="e.g., 300"
                        value={inputs.electricity}
                        onChange={(e) => handleInputChange("electricity", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gas">Monthly Gas (cubic meters)</Label>
                      <Input
                        id="gas"
                        type="number"
                        placeholder="e.g., 50"
                        value={inputs.gas}
                        onChange={(e) => handleInputChange("gas", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="houseSize">House Size</Label>
                      <Select value={inputs.houseSize} onValueChange={(value) => handleInputChange("houseSize", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (&lt; 100 sqm)</SelectItem>
                          <SelectItem value="medium">Medium (100-200 sqm)</SelectItem>
                          <SelectItem value="large">Large (&gt; 200 sqm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="renewableEnergy">Renewable Energy %</Label>
                      <Input
                        id="renewableEnergy"
                        type="number"
                        placeholder="e.g., 20"
                        min="0"
                        max="100"
                        value={inputs.renewableEnergy}
                        onChange={(e) => handleInputChange("renewableEnergy", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🍽️ Diet & Consumption</CardTitle>
                  <CardDescription>Your food and consumption habits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietType">What is your Diet Type?</Label>
                      <Select value={inputs.dietType} onValueChange={(value) => handleInputChange("dietType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meat-heavy">Meat Heavy</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="low-meat">Low Meat</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localFood">What % of your food is locally produced?</Label>
                      <Input
                        id="localFood"
                        type="number"
                        placeholder="e.g., 60"
                        min="0"
                        max="100"
                        value={inputs.localFood}
                        onChange={(e) => handleInputChange("localFood", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wasteReduction">How much effort do you make to reduce waste?</Label>
                      <Select
                        value={inputs.wasteReduction}
                        onValueChange={(value) => handleInputChange("wasteReduction", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recycling">What % of your waste do you recycle?</Label>
                      <Input
                        id="recycling"
                        type="number"
                        placeholder="e.g., 80"
                        min="0"
                        max="100"
                        value={inputs.recycling}
                        onChange={(e) => handleInputChange("recycling", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button
            onClick={calculateFootprint}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {loading ? "Calculating..." : "Calculate My Carbon Footprint 🌱"}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Carbon Footprint</CardTitle>
                  <CardDescription>Daily emissions breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">{results.total.toFixed(1)} kg CO₂</div>
                    <p className="text-gray-600">per day</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {((results.total * 365) / 1000).toFixed(1)} tonnes CO₂ per year
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Transportation</span>
                      </div>
                      <span className="font-bold text-red-600">{results.transport.toFixed(1)} kg</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Home Energy</span>
                      </div>
                      <span className="font-bold text-yellow-600">{results.energy.toFixed(1)} kg</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Diet & Food</span>
                      </div>
                      <span className="font-bold text-green-600">{results.diet.toFixed(1)} kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      <span>Personalized Recommendations</span>
                    </CardTitle>
                    <CardDescription>Actions to reduce your carbon footprint</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{rec.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    rec.impact === "high"
                                      ? "destructive"
                                      : rec.impact === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {rec.impact} impact
                                </Badge>
                                <Badge variant="outline">{rec.difficulty}</Badge>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                            <div className="flex items-center space-x-2">
                              <TrendingDown className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">Save: {rec.savings}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-16">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Ready to Calculate?</h3>
                <p className="text-gray-500">Fill in your daily activities to see your carbon footprint impact!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
