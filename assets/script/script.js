document.addEventListener("DOMContentLoaded", function() {
    const steps = Array.from(document.querySelectorAll(".form-step"));
    const progress = document.getElementById("progress");
    const stepCircles = Array.from(document.querySelectorAll(".step"));
    let currentStep = 0;

        // Add an event listener to the "Back" buttons
document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => {
      // Define the previous step logic here
      const currentStep = steps.indexOf(document.querySelector('.form-step.active'));
      showStep(currentStep - 1);
    });
  });
    function updateProgress() {
        const stepPercentage = (currentStep / (steps.length - 1)) * 100;
        progress.style.width = stepPercentage + "%";
        stepCircles.forEach((circle, index) => {
            circle.classList.toggle("active", index <= currentStep);
        });
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => step.classList.toggle("active", index === stepIndex));
        currentStep = stepIndex;
        updateProgress();
    }

    window.validateStep1 = function() {
        const email = document.getElementById("email").value;
        if (!email || !validateEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }
        showStep(1);
    };

    window.validateStep2 = function() {
        const quantity = document.getElementById("quantity").value;
        if (!quantity || quantity < 1 || quantity > 1000) {
            alert("Please enter a valid quantity (1-1000).");
            return;
        }
        calculatePrice(quantity);
        showStep(2);
    };

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function calculatePrice(quantity) {
        let price;
        if (quantity >= 1 && quantity <= 10) price = 10;
        else if (quantity >= 11 && quantity <= 100) price = 100;
        else if (quantity >= 101 && quantity <= 1000) price = 1000;
        document.getElementById("priceDisplay").innerText = `$${price}`;
    }

 

    window.sendEmail = async function() {
        try {
          const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            quantity: document.getElementById("quantity").value
          };
      
          const response = await fetch("./assets/php/send_email.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
          
          const result = await response.text();
          document.getElementById("resultMessage").innerText = result === "success" 
            ? "Done " 
            : "Done ";
          showStep(3);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };
});
function resetForm() {
  
  // Hide all steps except the first one
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((step, index) => {
    if (index > 0) {
      step.classList.remove("active");
    }
  });
  steps[0].classList.add("active");

  // Update the progress bar
  updateProgress();
}