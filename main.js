// main.js
import { traceZone, traceHeatIcon } from "./traceUtils.js";
import { renderProfile } from "./renderUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded — main.js active");

  const results = document.getElementById("results");
  const select = document.getElementById("toolSelect");

  const zoneClass = {
    "Transparent Use": "zone-green",
    "Consent Optional": "zone-yellow",
    "Active Surveillance": "zone-orange",
    "Opaque Trace": "zone-red",
  };

  const clearResults = () => {
    results.className = "hidden";
    results.innerHTML = "";
  };

  const fetchExtensionData = async () => {
    try {
      const response = await fetch("./api/extensions.json");
      return await response.json();
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      return null;
    }
  };

  select.addEventListener("change", async () => {
    const name = select.value.trim();
    if (!name) return clearResults();

    const data = await fetchExtensionData();

    if (data && data[name]) {
      renderProfile(name, data[name], results);
    } else {
      console.warn("⚠️ Extension not found in JSON:", name);
      clearResults();
    }
  });
});
