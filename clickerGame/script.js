let points = 0;
  let cps = 0;
  let cpc = 1;
  let pointsDisplay = document.getElementById("pointsDisplay");
  let cpsDisplay = document.getElementById("cpsDisplay");
  let cpcDisplay = document.getElementById("cpcDisplay");
  let cpsCost = 10;
  let cpcCost = 5;
  let cpsCostDisplay = document.getElementById("cpsCostDisplay");
  let cpcCostDisplay = document.getElementById("cpcCostDisplay");
  const cpsButton = document.getElementById("cpsButton");
  const clickButton = document.getElementById("clickButton");
  const cpcButton = document.getElementById("cpcButton");

  cpsButton.addEventListener('click', () => {
  if (points >= cpsCost) {
    cps++;
    points = points - cpsCost;
    cpsCost = cpsCost + 10;
    cpsDisplay.innerHTML = "Points per second: " + cps;
    cpsCostDisplay.innerHTML = "Buying more PPS will cost " + cpsCost + " points.";
  } else {
    console.log("Not enough points. CPS maintained.")
  }
});

cpcButton.addEventListener('click', () => {
  if (points >= cpcCost) {
    cpc++;
    points = points - cpcCost;
    cpcCost = cpcCost + 5;
    cpcDisplay.innerHTML = "Points per click: " + cpc;
    cpcCostDisplay.innerHTML = "Buying more PPC will cost " + cpcCost + " points.";
  } else {
    console.log("Not enough points. CPC maintained.")
  }
})

clickButton.addEventListener('click', () => {
  points = points + cpc;
  pointsDisplay.innerHTML = "Points: " + points;
});

document.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    points = points + cpc;
    pointsDisplay.innerHTML = "Points: " + points;
  }
});

setInterval(() => {
  points += cps;
  pointsDisplay.innerHTML = "Points: " + points;
}, 1000);