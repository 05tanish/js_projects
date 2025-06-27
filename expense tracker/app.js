const slidePanel = document.getElementById("slidePanel");
const closePanelBtn = document.getElementById("closePanel");
const openPanelBtn = document.getElementById("openPanelBtn");
const form = document.getElementById("expenseForm");

const imgInput = document.getElementById("img");
const imgPreview = document.getElementById("imgPreview");
const imgPreviewImg = imgPreview.querySelector("img");
const closeImgPreviewBtn = document.getElementById("closeImgPreview");
const expenseList = document.getElementById("expenseList");
const expenseChartCtx = document.getElementById("expenseChart").getContext("3d");

let expenseChart; // Chart.js instance
let expenseData = [];

// Open sliding panel
openPanelBtn.addEventListener("click", () => {
  slidePanel.classList.add("active");
  renderExpenses();
});

// Close sliding panel
closePanelBtn.addEventListener("click", () => {
  slidePanel.classList.remove("active");
});

// Show image preview when selecting file
imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    imgPreviewImg.src = url;
    imgPreview.style.display = "block";
  }
});

// Close image preview
closeImgPreviewBtn.addEventListener("click", () => {
  imgPreview.style.display = "none";
  imgInput.value = "";
});

// Form submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const field = document.getElementById("fieldinput").value.trim();
  const amount = parseFloat(document.getElementById("expense").value);
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const notes = document.getElementById("notes").value.trim();
  const status = document.getElementById("status").value;

  // Handle image: convert to Data URL for storage and preview in list
  if (imgInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (event) {
      addExpense(event.target.result);
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    addExpense(null);
  }

  function addExpense(imageDataUrl) {
    const newExpense = {
      field,
      amount,
      date,
      time,
      notes,
      status,
      image: imageDataUrl,
    };

    expenseData.push(newExpense);

    renderExpenses();
    form.reset();
    imgPreview.style.display = "none";
    slidePanel.classList.add("active");
  }
});

// Render expenses list and update chart
function renderExpenses() {
  expenseList.innerHTML = "";

  if (expenseData.length === 0) {
    expenseList.innerHTML = "<p>No expenses submitted yet.</p>";
    if (expenseChart) expenseChart.destroy();
    return;
  }

  expenseData.forEach((expense, index) => {
    const entry = document.createElement("div");
    entry.className = "expense-item";

    entry.innerHTML = `
      <h4>${index + 1}. ${expense.field} - ₹${expense.amount.toFixed(2)}</h4>
      <p><strong>Date:</strong> ${expense.date}, <strong>Time:</strong> ${expense.time}</p>
      <p><strong>Status:</strong> ${expense.status}</p>
      ${expense.notes ? `<p><strong>Notes:</strong> ${expense.notes}</p>` : ""}
      ${
        expense.image
          ? `<img src="${expense.image}" alt="Receipt Image" />`
          : ""
      }
      <button class="deleteBtn" data-index="${index}">🗑️ Delete</button>
    `;

    expenseList.appendChild(entry);
  });

  // Add delete button event listeners
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      expenseData.splice(index, 1);
      renderExpenses();
    });
  });

  updateChart();
}

// Update Chart.js bar chart
function updateChart() {
  const dataMap = {};
  expenseData.forEach((expense) => {
    if (dataMap[expense.field]) {
      dataMap[expense.field] += expense.amount;
    } else {
      dataMap[expense.field] = expense.amount;
    }
  });

  const labels = Object.keys(dataMap);
  const data = Object.values(dataMap);

  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(expenseChartCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expenses by Field (₹)",
          data: data,
          backgroundColor: "rgba(69, 160, 73, 0.7)",
          borderColor: "rgba(69, 160, 73, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
