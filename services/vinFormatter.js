function find(results, key) {
  const item = results.find(r => r.Variable === key);
  return item && item.Value ? item.Value : "N/A";
}

export function formatVINData(results) {
  return {
    vin: find(results, "VIN"),
    year: find(results, "Model Year"),
    make: find(results, "Make"),
    model: find(results, "Model"),
    trim: find(results, "Trim"),
    body: find(results, "Body Class"),
    engine: {
      cylinders: find(results, "Engine Number of Cylinders"),
      displacementL: find(results, "Displacement (L)"),
      fuelType: find(results, "Fuel Type - Primary")
    },
    transmission: find(results, "Transmission Style"),
    drivetrain: find(results, "Drive Type"),
    plant: {
      city: find(results, "Plant City"),
      country: find(results, "Plant Country")
    }
  };
}
