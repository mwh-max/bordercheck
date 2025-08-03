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

  const traceZone = (score) => {
    if (score === 5) return "Transparent Use";
    if (score >= 3) return "Consent Optional";
    if (score >= 1) return "Active Surveillance";
    return "Opaque Trace";
  };

  const traceHeatIcon = (score) => {
    if (score === 5) return "🟢";
    if (score >= 3) return "🟡";
    if (score >= 1) return "🟠";
    return "🟥";
  };

  const clearResults = () => {
    results.className = "hidden";
    results.innerHTML = "";
  };

  const renderProfile = (name, profile) => {
    const scoreTotal = Object.values(profile.scores).reduce((a, b) => a + b, 0);
    const zone = traceZone(scoreTotal);
    const icon = traceHeatIcon(scoreTotal);
    const stylingClass = zoneClass[zone] || "";

    results.className = `profile-box ${stylingClass}`;
    results.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Trace Score:</strong> ${scoreTotal} / 5</p>
      <p><strong>Zone:</strong> ${zone}</p>
      <div class="trace-heat">${icon}</div>
    `;
  };

  select.addEventListener("change", async () => {
    const name = select.value.trim();
    if (!name) return clearResults();

    try {
      const response = await fetch("./api/extensions.json");
      const data = await response.json();

      console.log("📂 Fetched data:", data);
      console.log("🔍 Selected name:", name);
      console.log("📦 Matched profile:", data[name]);

      if (data[name]) {
        renderProfile(name, data[name]);
      } else {
        console.warn("⚠️ Extension not found in JSON:", name);
        clearResults();
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      clearResults();
    }
  });
});
