const increaseCount = () => {
  const $countEl = document.getElementById("count");
  let currentCount = parseInt($countEl.innerHTML);
  currentCount++;
  $countEl.innerHTML = currentCount;
};

// click event listeners
document.getElementById("button").addEventListener("click", increaseCount);
