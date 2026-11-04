/* ==========================================================================
   HARSHAL M. SONAR - INTERACTIVE BUSINESS & PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".custom-navbar");
    const navbarCollapse = document.getElementById("navbarNav");
    const navClickables = document.querySelectorAll(".nav-link, .nav-btn-hire");
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formStatusAlert");
    const backToTopBtn = document.getElementById("backToTop");
    const scrollProgressBar = document.getElementById("scrollProgressBar");

    // 1. Dynamic Navbar & Back-to-Top Styler on Scroll
    function handleScrollState() {
        const scrollY = window.scrollY || window.pageYOffset;

        // Reading progress indicator
        if (scrollProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgressBar.style.width = Math.min(scrollPercent, 100) + "%";
        }

        // Navbar background toggle
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    }

    window.addEventListener("scroll", handleScrollState, { passive: true });
    handleScrollState(); // Initial check on load

    // 2. Smooth Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 3. Auto-close Mobile Hamburger Nav on Link Click
    if (navbarCollapse) {
        navClickables.forEach(function (link) {
            link.addEventListener("click", function () {
                if (navbarCollapse.classList.contains("show")) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // 4. Smooth Direct Navigation to Contact Section with Perfect Offset
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                e.preventDefault();

                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                // Scroll right to the contact header / form with comfortable breathing room below fixed navbar
                const sectionHeader = contactSection.querySelector(".section-header") || contactSection;
                const navHeight = navbar ? navbar.offsetHeight : 75;
                const targetY = sectionHeader.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;

                window.scrollTo({
                    top: targetY,
                    behavior: "smooth"
                });

                // Gentle focus on client inquiry name field
                setTimeout(function () {
                    const clientNameInput = document.getElementById("clientName");
                    if (clientNameInput) {
                        clientNameInput.focus({ preventScroll: true });
                    }
                }, 500);
            }
        });
    });

    // 5. Interactive Project Category Filter
    const filterButtons = document.querySelectorAll(".project-filter-btn");
    const projectItems = document.querySelectorAll(".project-item");
    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                filterButtons.forEach(b => b.classList.remove("active"));
                this.classList.add("active");

                const filterVal = this.getAttribute("data-filter");
                projectItems.forEach(function (item) {
                    const category = item.getAttribute("data-category") || "";
                    if (filterVal === "all" || category.includes(filterVal)) {
                        item.style.display = "block";
                        setTimeout(function () {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 30);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.96)";
                        setTimeout(function () {
                            item.style.display = "none";
                        }, 250);
                    }
                });
            });
        });
    }

    // 6. One-Click Copy Email to Clipboard with Floating Toast
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const copyBtnText = document.getElementById("copyBtnText");
    const globalToast = document.getElementById("globalToast");

    function displayToast(msg) {
        if (!globalToast) return;
        globalToast.textContent = msg;
        globalToast.classList.add("show");
        setTimeout(function () {
            globalToast.classList.remove("show");
        }, 3200);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", function () {
            const emailAddress = "sonarharshal0609@gmail.com";
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailAddress).then(function () {
                    if (copyBtnText) copyBtnText.textContent = "Copied!";
                    copyEmailBtn.classList.add("copied");
                    displayToast("✓ Copied " + emailAddress + " to clipboard!");

                    setTimeout(function () {
                        if (copyBtnText) copyBtnText.textContent = "Copy";
                        copyEmailBtn.classList.remove("copied");
                    }, 2500);
                }).catch(function () {
                    displayToast("Email: " + emailAddress);
                });
            } else {
                displayToast("Email: " + emailAddress);
            }
        });
    }

    // 7. Client Project Inquiry & Lead Form Handler
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const clientName = document.getElementById("clientName").value.trim();
            const clientEmail = document.getElementById("clientEmail").value.trim();
            const clientPhone = document.getElementById("clientPhone").value.trim();
            const projectService = document.getElementById("projectService").value;
            const projectMessage = document.getElementById("projectMessage").value.trim();

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!clientName || !clientEmail || !projectMessage) {
                alert("Please fill in your name, email, and project message.");
                return;
            }

            if (!emailRegex.test(clientEmail)) {
                alert("Please enter a valid email address (e.g., name@domain.com).");
                return;
            }

            // Build encoded mailto URL
            const emailSubject = encodeURIComponent(`Project Inquiry: ${projectService} from ${clientName}`);
            const rawBody = `Hello Harshal,\n\n` +
                `I would like to discuss a project with you.\n\n` +
                `• Name: ${clientName}\n` +
                `• Email: ${clientEmail}\n` +
                `• Phone/WhatsApp: ${clientPhone || 'Not provided'}\n` +
                `• Service Requested: ${projectService}\n\n` +
                `Project Details:\n${projectMessage}\n\n` +
                `Looking forward to connecting!`;

            const emailBody = encodeURIComponent(rawBody);
            const mailtoUrl = `mailto:sonarharshal0609@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            // Build WhatsApp fallback URL
            const whatsappText = encodeURIComponent(
                `*New Project Inquiry*\n` +
                `*Name:* ${clientName}\n` +
                `*Email:* ${clientEmail}\n` +
                `*Service:* ${projectService}\n\n` +
                `*Message:* ${projectMessage}`
            );
            const whatsappUrl = `https://wa.me/918263989274?text=${whatsappText}`;

            // Show confirmation banner with dual quick options
            if (formAlert) {
                formAlert.innerHTML = `
                    <div class="d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-success fs-5"></i>
                            <div>
                                <strong>Thank you, ${clientName}!</strong> Your inquiry for <em>${projectService}</em> is prepared.
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-2 flex-wrap">
                            <a href="${mailtoUrl}" class="btn btn-sm btn-primary">
                                <i class="bi bi-envelope-fill me-1"></i> Open in Email Client
                            </a>
                            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success">
                                <i class="bi bi-whatsapp me-1"></i> Send via WhatsApp
                            </a>
                        </div>
                    </div>
                `;
                formAlert.className = "form-status-alert success";
                formAlert.style.display = "block";
            }

            // Launch email client
            setTimeout(function () {
                window.location.href = mailtoUrl;
            }, 600);
        });
    }

    console.log("Harshal Sonar - Professional .NET Solutions Portfolio Engine Active.");
});
