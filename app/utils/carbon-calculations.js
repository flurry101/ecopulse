export const EMISSION_FACTORS = {
  transport: {
    petrol: 2.31, // kg CO2 per liter
    diesel: 2.68,
    electric: 0.1,
    hybrid: 1.5,
    publicTransport: 0.5, // kg CO2 per hour
    flight: 255, // kg CO2 per flight (average domestic)
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh
    gas: 2.0, // kg CO2 per cubic meter
    houseSizeMultiplier: {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
    },
  },
  diet: {
    "meat-heavy": 7.0, // kg CO2 per day
    average: 5.5,
    "low-meat": 4.0,
    vegetarian: 3.0,
    vegan: 2.5,
  },
}

export function calculateCarbonFootprint(inputs) {
  const transportEmissions = calculateTransportEmissions(inputs)
  const energyEmissions = calculateEnergyEmissions(inputs)
  const dietEmissions = calculateDietEmissions(inputs)

  const breakdown = {
    car: calculateCarEmissions(inputs),
    publicTransport: calculatePublicTransportEmissions(inputs),
    flights: calculateFlightEmissions(inputs),
    electricity: calculateElectricityEmissions(inputs),
    gas: calculateGasEmissions(inputs),
    food: dietEmissions,
  }

  return {
    total: transportEmissions + energyEmissions + dietEmissions,
    transport: transportEmissions,
    energy: energyEmissions,
    diet: dietEmissions,
    breakdown,
  }
}

function calculateTransportEmissions(inputs) {
  const carEmissions = calculateCarEmissions(inputs)
  const publicTransportEmissions = calculatePublicTransportEmissions(inputs)
  const flightEmissions = calculateFlightEmissions(inputs)

  return carEmissions + publicTransportEmissions + flightEmissions
}

function calculateCarEmissions(inputs) {
  const carDistance = Number.parseFloat(inputs.carDistance) || 0
  if (carDistance <= 0) return 0

  const litersPerDay = carDistance / 8 // Assuming 8km per liter average
  return litersPerDay * EMISSION_FACTORS.transport[inputs.fuelType]
}

function calculatePublicTransportEmissions(inputs) {
  const publicTransport = Number.parseFloat(inputs.publicTransport) || 0
  return publicTransport * EMISSION_FACTORS.transport.publicTransport
}

function calculateFlightEmissions(inputs) {
  const flights = Number.parseFloat(inputs.flights) || 0
  return (flights * EMISSION_FACTORS.transport.flight) / 365 // Daily average
}

function calculateEnergyEmissions(inputs) {
  const electricityEmissions = calculateElectricityEmissions(inputs)
  const gasEmissions = calculateGasEmissions(inputs)

  const totalEmissions = electricityEmissions + gasEmissions
  const houseSizeMultiplier = EMISSION_FACTORS.energy.houseSizeMultiplier[inputs.houseSize]

  return totalEmissions * houseSizeMultiplier
}

function calculateElectricityEmissions(inputs) {
  const electricity = Number.parseFloat(inputs.electricity) || 0
  const renewableEnergy = Number.parseFloat(inputs.renewableEnergy) || 0

  const electricityFactor = EMISSION_FACTORS.energy.electricity * (1 - renewableEnergy / 100)
  return (electricity / 30) * electricityFactor // Daily average
}

function calculateGasEmissions(inputs) {
  const gas = Number.parseFloat(inputs.gas) || 0
  return (gas / 30) * EMISSION_FACTORS.energy.gas // Daily average
}

function calculateDietEmissions(inputs) {
  const localFood = Number.parseFloat(inputs.localFood) || 0
  const wasteMultiplier = { low: 1.0, medium: 0.85, high: 0.7 }
  const localFoodReduction = (localFood / 100) * 0.2

  return EMISSION_FACTORS.diet[inputs.dietType] * (1 - localFoodReduction) * wasteMultiplier[inputs.wasteReduction]
}

export function formatEmissions(emissions) {
  if (emissions < 0.1) {
    return "< 0.1"
  }
  return emissions.toFixed(1)
}

export function getEmissionCategory(emissions) {
  if (emissions < 5) return "low"
  if (emissions < 10) return "medium"
  return "high"
}

export function getEmissionColor(category) {
  switch (category) {
    case "low":
      return "text-green-600 bg-green-50"
    case "medium":
      return "text-yellow-600 bg-yellow-50"
    case "high":
      return "text-red-600 bg-red-50"
  }
}
