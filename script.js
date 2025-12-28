"use strict";

const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");

const startInput = document.getElementById("startValue");
const endInput = document.getElementById("endValue");
const fizzInput = document.getElementById("fizzValue");
const buzzInput = document.getElementById("buzzValue");

const tileSize = document.getElementById("tileSize");

const defaultBtn = document.getElementById("defaultBtn");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");

const sTotal = document.getElementById("sTotal");
const sFizz = document.getElementById("sFizz");
const sBuzz = document.getElementById("sBuzz");
const sBoth = document.getElementById("sBoth");
const sNone = document.getElementById("sNone");

function toInt(v) {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : NaN;
}

function setStats(total, fizz, buzz, both, none) {
  sTotal.textContent = String(total);
  sFizz.textContent = String(fizz);
  sBuzz.textContent = String(buzz);
  sBoth.textContent = String(both);
  sNone.textContent = String(none);
}

function setTileSize() {
  document.documentElement.style.setProperty("--tile", `${toInt(tileSize.value)}px`);
}

function clearGrid() {
  grid.innerHTML = "";
  statusEl.textContent = "Cleared.";
  setStats(0, 0, 0, 0, 0);
}

function classify(n, fizz, buzz) {
  const fizzHit = (n % fizz === 0);
  const buzzHit = (n % buzz === 0);

  if (fizzHit && buzzHit) return { cls: "is-both", text: "FizzBuzz", key: "both" };
  if (fizzHit) return { cls: "is-fizz", text: "Fizz", key: "fizz" };
  if (buzzHit) return { cls: "is-buzz", text: "Buzz", key: "buzz" };
  return { cls: "is-none", text: String(n), key: "none" };
}

function generate() {
  const start = toInt(startInput.value);
  const end = toInt(endInput.value);
  const fizz = toInt(fizzInput.value);
  const buzz = toInt(buzzInput.value);

  if (![start, end, fizz, buzz].every(Number.isFinite)) {
    statusEl.textContent = "Please enter valid numbers.";
    return;
  }
  if (fizz < 1 || buzz < 1) {
    statusEl.textContent = "Fizz and Buzz must be >= 1.";
    return;
  }
  if (end < start) {
    statusEl.textContent = "End must be >= Start.";
    return;
  }

  setTileSize();
  grid.innerHTML = "";

  let count = 0;
  let cF = 0, cB = 0, cBo = 0, cN = 0;

  for (let n = start; n <= end; n++) {
    count++;

    const d = document.createElement("div");
    d.classList.add("tile");
    d.id = `myid${count}`;

    const res = classify(n, fizz, buzz);
    d.classList.add(res.cls);
    d.innerText = res.text;

    d.title = `Value: ${n}`;

    if (res.key === "both") cBo++;
    else if (res.key === "fizz") cF++;
    else if (res.key === "buzz") cB++;
    else cN++;

    grid.appendChild(d);
  }

  setStats(count, cF, cB, cBo, cN);
  statusEl.textContent = `Generated ${count} divs.`;
}

generateBtn.addEventListener("click", generate);
clearBtn.addEventListener("click", clearGrid);

defaultBtn.addEventListener("click", () => {
  startInput.value = 1;
  endInput.value = 100;
  fizzInput.value = 3;
  buzzInput.value = 5;
  tileSize.value = 96;
  setTileSize();
  generate();
});

tileSize.addEventListener("input", setTileSize);

setTileSize();
generate();
