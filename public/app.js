const form = document.getElementById("vin-form");
const vinInput = document.getElementById("vin");
const resultSection = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const vin = vinInput.value.trim().toUpperCase();

  if (vin.length !== 17) {
    showError("VIN must be 17 characters");
    return;
  }

  resultSection.innerHTML = "Loading...";
  resultSection.classList.remove("hidden");

  try {
    const res = await fetch(`/api/decode/${vin}`);
    const json = await res.json();

    if (json.error) {
      showError(json.error);
      return;
    }

    renderResult(json.data);
  } catch {
    showError("Request failed");
  }
});

function renderResult(data) {
  resultSection.innerHTML = `
    <div class="card">
      <h2>${data.year} ${data.make} ${data.model}</h2>
      <p><strong>Trim:</strong> ${data.trim}</p>
      <p><strong>Body:</strong> ${data.body}</p>
      <p><strong>Engine:</strong> ${data.engine.cylinders} cyl, ${data.engine.displacementL}L (${data.engine.fuelType})</p>
      <p><strong>Transmission:</strong> ${data.transmission}</p>
      <p><strong>Drivetrain:</strong> ${data.drivetrain}</p>
      <p><strong>Plant:</strong> ${data.plant.city}, ${data.plant.country}</p>
    </div>
  `;
}

function showError(message) {
  resultSection.innerHTML = `<p class="error">${message}</p>`;
}
