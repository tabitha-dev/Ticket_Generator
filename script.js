document.addEventListener("DOMContentLoaded", function () {
    // Function to Generate Unique Ticket ID
    function generateTicketID() {
        return "TS-" + Math.floor(100000 + Math.random() * 900000);
    }

    // Form Submission and Ticket Generation
    document.getElementById("ticketForm").addEventListener("submit", function (event) {
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
            correctLevel: QRCode.CorrectLevel.H,
        });

        // Confetti Effect
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    });

    // Print Ticket
    document.getElementById("printTicket").addEventListener("click", function () {
        window.print();
    });

    // Download Ticket as PDF
    document.getElementById("downloadTicket").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Tech Summit 2025 Ticket", 20, 20);
        doc.save("TechSummit_Ticket.pdf");
    });

    // ✅ Initialize Particles.js after DOM is fully loaded
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100, // More particles for better effect
                density: { enable: true, value_area: 800 },
            },
            color: { value: "#ffffff" }, // White particles
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 6 },
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false },
            },
            size: {
                value: 4, // Medium-sized particles
                random: true,
                anim: { enable: true, speed: 3, size_min: 0.5, sync: false },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2, // Smoother movement
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" }, // Particles move away on hover
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 250, size: 8, duration: 2, opacity: 0.8, speed: 3 },
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
        },
        retina_detect: true,
    });
});
