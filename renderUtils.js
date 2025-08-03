// renderUtils.js
export const renderProfile = (name, profile, results) => {
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
