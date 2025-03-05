document.addEventListener("DOMContentLoaded", function() {
    // Function to Generate Unique Ticket ID
    function generateTicketID() {
        return "TS-" + Math.floor(100000 + Math.random() * 900000);
    }

    // Form Submission and Ticket Generation
    document.getElementById("ticketForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const ticketType = document.getElementById("ticketType").value;
        const date = document.getElementById("date").value;

        if (!name || !date) {
            alert("Please fill in all fields!");
            return;
        }

        const ticketID = generateTicketID();
        document.getElementById("ticketID").innerText = ticketID;
        document.getElementById("ticketName").innerText = name;
        document.getElementById("ticketTypeDisplay").innerText = ticketType;
        document.getElementById("ticketDate").innerText = new Date(date).toLocaleDateString();

        document.getElementById("ticket").classList.remove("hidden");

        // Generate QR Code
        const qrCodeContainer = document.getElementById("qrCodeContainer");
        qrCodeContainer.innerHTML = "";
        new QRCode(qrCodeContainer, {
            text: `https://yourwebsite.com/ticket?id=${ticketID}`,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Confetti Effect
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    });

    // Print Ticket
    document.getElementById("printTicket").addEventListener("click", function() {
        window.print();
    });

    // Download Ticket as PDF
    document.getElementById("downloadTicket").addEventListener("click", function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Tech Summit 2025 Ticket", 20, 20);
        doc.save("TechSummit_Ticket.pdf");
    });

    // Initialize Particles.js

particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 5, random: true },
        move: { enable: true, speed: 2, direction: "none" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

