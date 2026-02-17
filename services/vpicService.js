import { formatVINData } from "./vinFormatter.js";

export async function decodeVIN(vin) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("vPIC request failed");
  }

  const json = await response.json();
  return formatVINData(json.Results);
}
