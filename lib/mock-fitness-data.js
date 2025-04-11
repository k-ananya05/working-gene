// This file provides mock fitness data for demonstration purposes
// In a real application, this would come from a fitness tracker API

export function mockFitnessData() {
  // Generate random but realistic fitness data

  // Heart rate between 60-110 bpm
  const heartRate = Math.floor(Math.random() * 50) + 60

  // Blood pressure
  const systolic = Math.floor(Math.random() * 40) + 110
  const diastolic = Math.floor(Math.random() * 20) + 70

  // Blood glucose between 80-160 mg/dL
  const bloodGlucose = Math.floor(Math.random() * 80) + 80

  // Steps between 2000-12000
  const steps = Math.floor(Math.random() * 10000) + 2000

  // Calories burned between 500-2500
  const calories = Math.floor(Math.random() * 2000) + 500

  // Distance in km (1-10)
  const distance = (Math.random() * 9 + 1).toFixed(1)

  // Active minutes (10-120)
  const activeMinutes = Math.floor(Math.random() * 110) + 10

  return {
    heartRate,
    bloodPressure: {
      systolic,
      diastolic,
    },
    bloodGlucose,
    steps,
    calories,
    distance,
    activeMinutes,
    timestamp: new Date().toISOString(),
  }
}
