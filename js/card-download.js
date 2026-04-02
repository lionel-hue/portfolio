/**
 * card-download.js
 * Handles the Contact Card modal open/close and PNG download.
 */

(function () {
  var qrGenerated = false;

  function openModal() {
    var modal = document.getElementById("contact-card-modal");
    if (!modal) return;
    // Remove any inline display:none and force flex
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    // Generate QR once, after modal is visible
    if (!qrGenerated) {
      generateQR();
      qrGenerated = true;
    }
  }

  function closeModal() {
    var modal = document.getElementById("contact-card-modal");
    if (modal) modal.style.display = "none";
  }

  function generateQR() {
    var container = document.getElementById("qrcode");
    if (!container) return;
    // Clear any previous content
    container.innerHTML = "";
    try {
      if (typeof QRCode !== "undefined") {
        new QRCode(container, {
          text: "https://lionel-hue.github.io/portfolio/",
          width: 80,
          height: 80,
          colorDark: "#0d1117",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      } else {
        // Fallback: use a public QR code API image
        var img = document.createElement("img");
        img.src =
          "https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Flionel-hue.github.io%2Fportfolio%2F&size=80x80&bgcolor=ffffff&color=0d1117";
        img.alt = "QR Code";
        img.width = 80;
        img.height = 80;
        container.appendChild(img);
      }
    } catch (e) {
      console.warn("QR generation failed:", e);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var openBtn = document.getElementById("open-card-btn");
    var closeBtn = document.getElementById("close-card-btn");
    var downloadBtn = document.getElementById("download-card-btn");
    var modal = document.getElementById("contact-card-modal");

    if (openBtn) {
      openBtn.addEventListener("click", openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Close on backdrop click
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Escape key closes modal
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        var card = document.getElementById("capture-card");
        if (!card) return;

        if (typeof html2canvas === "undefined") {
          alert("Download library not loaded. Please check your internet connection and try again.");
          return;
        }

        downloadBtn.textContent = "Generating…";
        downloadBtn.disabled = true;

        html2canvas(card, {
          scale: 2,
          backgroundColor: "#161b22",
          useCORS: true,
          allowTaint: true,
          logging: false,
        })
          .then(function (canvas) {
            var link = document.createElement("a");
            link.download = "Lionel_Sisso_Card.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          })
          .catch(function (err) {
            console.error("Card download failed:", err);
            alert("Could not generate card image. Try again.");
          })
          .finally(function () {
            downloadBtn.textContent = "Download PNG ↓";
            downloadBtn.disabled = false;
          });
      });
    }
  });
})();
