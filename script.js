function parseWon(value) {
  return parseInt(value.replace(/,/g, '')) || 0;
}

function calculateTax() {
  const basic = parseWon(document.getElementById('defaultPay').value);
  const bonus = parseWon(document.getElementById('bonusPay').value);
  const meal = parseWon(document.getElementById('mealPay').value); // 비과세
  const etc = parseWon(document.getElementById('etcPay').value);

  const gross = basic + bonus + etc + meal;
  const taxable = basic + bonus + etc;

  const pension = taxable * 0.045;
  const health = taxable * 0.0709;
  const care = health * 0.1281;
  const unemployment = taxable * 0.009;

  let incomeTax = 0;
  if (taxable <= 1200000) {
    incomeTax = taxable * 0.06;
  } else if (taxable <= 4600000) {
    incomeTax = 1200000 * 0.06 + (taxable - 1200000) * 0.15;
  } else {
    incomeTax = 1200000 * 0.06 + (4600000 - 1200000) * 0.15 + (taxable - 4600000) * 0.24;
  }

  const localTax = incomeTax * 0.1;

  const totalDeduction = pension + health + care + unemployment + incomeTax + localTax;
  const netPay = gross - totalDeduction;

  document.getElementById('totalPay').innerText = gross.toLocaleString();
  document.getElementById('totalDeduction').innerText = totalDeduction.toFixed(0).toLocaleString();
  document.getElementById('netPay').innerText = netPay.toFixed(0).toLocaleString();
}