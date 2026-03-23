document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  initTooltips();
  initDropdowns();
  initFilterToggles();
  initQuantitySelectors();
  initWishlistButtons();
  initFilterChips();
  initProductViewToggle();
  initSearchFunctionality();
  initCouponApply();
  initCheckoutButton();
  initMobileMenu();
  initSmoothScroll();
  initCountdownTimer();
  initFormValidation();
  initImageGallery();
  initTabPersistence();
  initBackToTop();
  initDynamicBreadcrumbs();
  initSidebarToggle();
  initProductClick();
  initProductDetail();
  initCartAdd();
  initCartRender();

  function initTooltips() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  function initDropdowns() {
    const langDropdown = document.querySelector(".settings-nav .dropdown-menu");
    if (langDropdown) {
      langDropdown.addEventListener("click", function (e) {
        const item = e.target.closest(".dropdown-item");
        if (item && item.querySelector("img")) {
          e.preventDefault();
          const dropdownToggle = document.querySelector(
            ".settings-nav .dropdown-toggle",
          );
          if (dropdownToggle) {
            const imgSrc = item.querySelector("img").src;
            const imgAlt = item.querySelector("img").alt;
            const countryName = item.textContent.trim();

            dropdownToggle.innerHTML = `Ship to <img src="${imgSrc}" alt="${imgAlt}" class="ms-2" style="width:22px; height:15px; object-fit: cover;">`;
          }
        }
      });
    }

    const footerLangDropdown = document.querySelector("footer .dropdown-menu");
    if (footerLangDropdown) {
      footerLangDropdown.addEventListener("click", function (e) {
        const item = e.target.closest(".dropdown-item");
        if (item && item.querySelector("img")) {
          e.preventDefault();
          const dropdownToggle = document.querySelector(
            "footer .dropdown-toggle",
          );
          if (dropdownToggle) {
            const imgSrc = item.querySelector("img").src;
            const countryName = item.textContent.trim();

            dropdownToggle.innerHTML = `<img src="${imgSrc}" alt="" class="me-2 selected-img" style="width:20px; height:15px; object-fit: cover;"> <span>${countryName}</span>`;
          }
        }
      });
    }

    const helpSelect = document.querySelector(".main-nav select");
    if (helpSelect) {
      helpSelect.addEventListener("change", function (e) {
        const value = e.target.value;
        if (value === "contact") {
          window.location.href = "#contact";
        } else if (value === "shipping") {
          window.location.href = "#shipping";
        }
      });
    }
  }

  function initFilterToggles() {
    const filterHeaders = document.querySelectorAll(".filter-group h6");

    filterHeaders.forEach((header) => {
      const targetId = header.getAttribute("data-bs-target");
      if (!targetId) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      target.addEventListener("show.bs.collapse", function () {
        const icon = header.querySelector("i");
        if (icon) {
          icon.classList.remove("bi-chevron-down");
          icon.classList.add("bi-chevron-up");
        }
      });

      target.addEventListener("hide.bs.collapse", function () {
        const icon = header.querySelector("i");
        if (icon) {
          icon.classList.remove("bi-chevron-up");
          icon.classList.add("bi-chevron-down");
        }
      });
    });
  }

  function initQuantitySelectors() {
    const quantitySelects = document.querySelectorAll(
      ".cart-page select, .card select",
    );

    quantitySelects.forEach((select) => {
      select.addEventListener("change", function (e) {
        const newQty = e.target.value.replace("Qty: ", "");
        const productItem = e.target.closest(".d-flex.align-items-start");

        if (productItem) {
          const priceElement = productItem.querySelector(".fw-bold");
          if (priceElement && priceElement.textContent.includes("$")) {
            console.log(`Quantity updated to ${newQty}`);

            showNotification("Quantity updated", "success");
          }
        }
      });
    });
  }

  function initWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(
      ".btn-outline-primary .bi-heart, .btn-outline-primary .bi-heart-fill",
    );

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const btn = this.closest("button");
        if (!btn) return;

        if (this.classList.contains("bi-heart")) {
          this.classList.remove("bi-heart");
          this.classList.add("bi-heart-fill");
          this.style.color = "#dc3545";
          btn.classList.add("active");
          showNotification("Added to wishlist", "success");
        } else {
          this.classList.remove("bi-heart-fill");
          this.classList.add("bi-heart");
          this.style.color = "";
          btn.classList.remove("active");
          showNotification("Removed from wishlist", "info");
        }
      });
    });

    const productHeartIcons = document.querySelectorAll(
      ".product-card .bi-heart, .recommended-card .bi-heart",
    );
    productHeartIcons.forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.classList.contains("bi-heart")) {
          this.classList.remove("bi-heart");
          this.classList.add("bi-heart-fill");
          this.style.color = "#dc3545";
          showNotification("Added to wishlist", "success");
        } else {
          this.classList.remove("bi-heart-fill");
          this.classList.add("bi-heart");
          this.style.color = "";
          showNotification("Removed from wishlist", "info");
        }
      });
    });
  }

  function initFilterChips() {
    const filterChips = document.querySelectorAll(".badge i.bi-x");

    filterChips.forEach((closeIcon) => {
      closeIcon.addEventListener("click", function (e) {
        e.preventDefault();
        const chip = this.closest(".badge");
        if (chip) {
          chip.remove();

          const filterText = chip.textContent.trim().replace("×", "").trim();
          const checkboxes = document.querySelectorAll(".form-check-label");

          checkboxes.forEach((label) => {
            if (label.textContent.trim() === filterText) {
              const checkbox = label
                .closest(".form-check")
                ?.querySelector(".form-check-input");
              if (checkbox) checkbox.checked = false;
            }
          });

          showNotification("Filter removed", "info");

          if (document.querySelectorAll(".badge").length === 0) {
            const clearAllLink = document.querySelector(
              'a[href="#"].text-primary',
            );
            if (clearAllLink) {
            }
          }
        }
      });
    });

    const clearAllLink = document.querySelector('a[href="#"].text-primary');
    if (clearAllLink && clearAllLink.textContent.includes("Clear all filter")) {
      clearAllLink.addEventListener("click", function (e) {
        e.preventDefault();
        const chips = document.querySelectorAll(".badge");
        chips.forEach((chip) => chip.remove());

        const checkboxes = document.querySelectorAll(".form-check-input");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));

        showNotification("All filters cleared", "info");
      });
    }
  }

  function initProductViewToggle() {
    const gridBtn = document
      .querySelector(".btn-group .bi-grid-fill")
      ?.closest("button");
    const listBtn = document
      .querySelector(".btn-group .bi-list")
      ?.closest("button");

    if (!gridBtn || !listBtn) return;

    gridBtn.addEventListener("click", function (e) {
      e.preventDefault();
      gridBtn.classList.add("active-view");
      listBtn.classList.remove("active-view");
      listBtn.classList.add("bg-secondary-subtle");

      if (!window.location.pathname.includes("grid.html")) {
        window.location.href = "grid.html";
      } else {
        showNotification("Grid view activated", "success");
      }
    });

    listBtn.addEventListener("click", function (e) {
      e.preventDefault();
      listBtn.classList.add("active-view");
      gridBtn.classList.remove("active-view");
      gridBtn.classList.add("bg-secondary-subtle");

      if (!window.location.pathname.includes("list.html")) {
        window.location.href = "list.html";
      } else {
        showNotification("List view activated", "success");
      }
    });
  }

  function initSearchFunctionality() {
    const searchForms = document.querySelectorAll(".search-group");

    searchForms.forEach((form) => {
      const searchBtn = form.querySelector(".btn-primary");
      const searchInput = form.querySelector("input");
      const categorySelect = form.querySelector("select");

      if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", function (e) {
          e.preventDefault();
          performSearch(searchInput.value, categorySelect?.value);
        });

        searchInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            performSearch(searchInput.value, categorySelect?.value);
          }
        });
      }
    });
  }

  function performSearch(query, category) {
    if (!query || query.trim() === "") {
      showNotification("Please enter a search term", "warning");
      return;
    }

    console.log(`Searching for: ${query} in category: ${category || "All"}`);
    showNotification(`Searching for "${query}"...`, "info");
  }

  function initCouponApply() {
    const couponInput = document.querySelector(
      '.card .input-group input[placeholder="Add coupon"]',
    );
    const applyBtn = document.querySelector(
      ".card .input-group .btn-outline-primary",
    );

    if (couponInput && applyBtn) {
      applyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const couponCode = couponInput.value.trim();

        if (couponCode === "") {
          showNotification("Please enter a coupon code", "warning");
          return;
        }

        if (
          couponCode.toUpperCase() === "SAVE10" ||
          couponCode.toUpperCase() === "DISCOUNT20"
        ) {
          showNotification(
            `Coupon "${couponCode}" applied successfully!`,
            "success",
          );

          const totalElement = document.querySelector(
            ".fw-bold.fs-5:last-child",
          );
          if (totalElement && totalElement.textContent.includes("$")) {
            const currentTotal = parseFloat(
              totalElement.textContent.replace("$", ""),
            );
            const discount = couponCode.toUpperCase() === "SAVE10" ? 10 : 20;
            const newTotal = currentTotal - discount;
            totalElement.textContent = `$${newTotal.toFixed(2)}`;
          }

          couponInput.value = "";
        } else {
          showNotification("Invalid coupon code", "error");
        }
      });
    }
  }

  function initCheckoutButton() {
    const checkoutBtns = [];
    document.querySelectorAll("button").forEach((btn) => {
      if (btn.textContent.includes("Checkout")) checkoutBtns.push(btn);
    });

    checkoutBtns.forEach((checkoutBtn) => {
      checkoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        let cart = [];
        try {
          cart = JSON.parse(localStorage.getItem("cart") || "[]");
        } catch (e) { }

        if (cart.length === 0) {
          showNotification("Your cart is empty", "warning");
          return;
        }

        showNotification("Processing your order...", "info");

        setTimeout(() => {
          localStorage.removeItem("cart");
          localStorage.setItem("checkoutSuccess", "true");
          window.location.reload();
        }, 1000);
      });
    });

    if (localStorage.getItem("checkoutSuccess") === "true") {
      localStorage.removeItem("checkoutSuccess");
      setTimeout(() => {
        showNotification(
          "Order placed successfully! Thank you for your purchase.",
          "success",
        );
      }, 500);
    }
  }

  function initMobileMenu() {
    if (window.innerWidth < 992) {
      const header = document.querySelector("header .container-fluid");
      const mainNav = document.querySelector(".main-nav");

      if (header && mainNav) {
        if (!document.querySelector(".mobile-menu-btn")) {
          const menuBtn = document.createElement("button");
          menuBtn.className =
            "btn btn-outline-secondary d-lg-none ms-2 mobile-menu-btn";
          menuBtn.innerHTML = '<i class="bi bi-list fs-4"></i>';
          menuBtn.setAttribute("type", "button");

          const brandLogo = header.querySelector(".col-auto");
          if (brandLogo) {
            brandLogo.after(menuBtn);
          }

          menuBtn.addEventListener("click", function () {
            const navContainer = document.querySelector(".border-top.py-2");
            if (navContainer) {
              navContainer.classList.toggle("d-none");
              navContainer.classList.toggle("d-block");

              if (navContainer.classList.contains("d-block")) {
                menuBtn.innerHTML = '<i class="bi bi-x fs-4"></i>';
              } else {
                menuBtn.innerHTML = '<i class="bi bi-list fs-4"></i>';
              }
            }
          });
        }
      }
    }
  }

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])',
    );

    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  function initCountdownTimer() {
    const timeBlocks = document.querySelectorAll(
      ".countdown-group .time-block",
    );

    if (timeBlocks.length >= 4) {
      let days = parseInt(timeBlocks[0].childNodes[0].textContent) || 4;
      let hours = parseInt(timeBlocks[1].childNodes[0].textContent) || 13;
      let minutes = parseInt(timeBlocks[2].childNodes[0].textContent) || 34;
      let seconds = parseInt(timeBlocks[3].childNodes[0].textContent) || 56;

      const timerInterval = setInterval(() => {
        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;

          if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours < 0) {
              hours = 23;
              days--;

              if (days < 0) {
                clearInterval(timerInterval);
                return;
              }
            }
          }
        }

        if (timeBlocks[0])
          timeBlocks[0].childNodes[0].textContent = days
            .toString()
            .padStart(2, "0");
        if (timeBlocks[1])
          timeBlocks[1].childNodes[0].textContent = hours
            .toString()
            .padStart(2, "0");
        if (timeBlocks[2])
          timeBlocks[2].childNodes[0].textContent = minutes
            .toString()
            .padStart(2, "0");
        if (timeBlocks[3])
          timeBlocks[3].childNodes[0].textContent = seconds
            .toString()
            .padStart(2, "0");
      }, 1000);
    }
  }

  function initFormValidation() {
    const quoteForm = document.querySelector(".quote-banner form");

    if (quoteForm) {
      quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const itemInput = this.querySelector(
          'input[placeholder="What item you need?"]',
        );
        const detailsTextarea = this.querySelector("textarea");
        const quantityInput = this.querySelector('input[type="number"]');
        const unitSelect = this.querySelector("select");

        let isValid = true;

        if (itemInput && itemInput.value.trim() === "") {
          showNotification("Please enter the item you need", "warning");
          isValid = false;
        } else if (detailsTextarea && detailsTextarea.value.trim() === "") {
          showNotification("Please provide more details", "warning");
          isValid = false;
        } else if (quantityInput && quantityInput.value.trim() === "") {
          showNotification("Please enter quantity", "warning");
          isValid = false;
        }

        if (isValid) {
          showNotification("Quote request sent successfully!", "success");
          this.reset();
        }
      });
    }

    const newsletterForm = document.querySelector(
      ".newsletter-section .input-group",
    );

    if (newsletterForm) {
      const subscribeBtn = newsletterForm.querySelector(".btn-primary");
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener("click", function (e) {
          e.preventDefault();

          const email = emailInput.value.trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (email === "") {
            showNotification("Please enter your email address", "warning");
          } else if (!emailRegex.test(email)) {
            showNotification("Please enter a valid email address", "warning");
          } else {
            showNotification(
              "Subscribed successfully! Check your email for confirmation.",
              "success",
            );
            emailInput.value = "";
          }
        });
      }
    }
  }

  function initImageGallery() {
    const thumbnails = document.querySelectorAll(
      ".d-flex.gap-2 .border.rounded",
    );
    const mainImage = document.querySelector(
      ".border.rounded-3.p-3.text-center img",
    );

    if (thumbnails.length > 0 && mainImage) {
      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", function () {
          thumbnails.forEach((t) => t.classList.remove("border-primary"));

          this.classList.add("border-primary");

          const thumbImg = this.querySelector("img");
          if (thumbImg) {
            console.log(`Switched to image ${index + 1}`);

            mainImage.style.transform = "scale(0.95)";
            setTimeout(() => {
              mainImage.style.transform = "scale(1)";
            }, 200);
          }
        });
      });
    }
  }

  function initTabPersistence() {
    const productTabs = document.getElementById("productTabs");

    if (productTabs) {
      const tabs = productTabs.querySelectorAll(".nav-link");

      tabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
          const tabId = this.textContent.trim();
          localStorage.setItem("activeProductTab", tabId);
        });
      });

      const savedTab = localStorage.getItem("activeProductTab");
      if (savedTab) {
        tabs.forEach((tab) => {
          if (tab.textContent.trim() === savedTab) {
            setTimeout(() => {
              tab.click();
            }, 100);
          }
        });
      }
    }
  }

  function initBackToTop() {
    if (!document.querySelector(".back-to-top")) {
      const backToTopBtn = document.createElement("button");
      backToTopBtn.className = "btn btn-primary back-to-top";
      backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
      backToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: none;
                z-index: 99;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                padding: 0;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            `;

      document.body.appendChild(backToTopBtn);

      backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    const backToTopBtn = document.querySelector(".back-to-top");

    if (backToTopBtn) {
      window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
          backToTopBtn.style.display = "block";
        } else {
          backToTopBtn.style.display = "none";
        }
      });
    }
  }

  function initDynamicBreadcrumbs() {
    const breadcrumb = document.querySelector(".breadcrumb");

    if (breadcrumb) {
      const path = window.location.pathname;
      const pageName = path.split("/").pop();

      const lastItem = breadcrumb.querySelector(".breadcrumb-item.active");

      if (lastItem) {
        switch (pageName) {
          case "list.html":
            lastItem.textContent = "Product List";
            break;
          case "grid.html":
            lastItem.textContent = "Product Grid";
            break;
          case "detail.html":
            lastItem.textContent = "Product Details";
            break;
          case "cart.html":
            lastItem.textContent = "Shopping Cart";
            break;
          case "home.html":
          case "":
            lastItem.textContent = "Home";
            break;
        }
      }
    }
  }

  function showNotification(message, type = "info") {
    const existingNotification = document.querySelector(".notification-toast");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = `notification-toast alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideDown 0.3s ease-out;
        `;

    notification.innerHTML = `
            <strong>${type === "success" ? "Success!" : type === "warning" ? "Warning!" : type === "error" ? "Error!" : "Info!"}</strong>
            <span class="d-block mt-1">${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.classList.remove("show");
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 3000);
  }

  function initSidebarToggle() {
    const allCategoryLinks = document.querySelectorAll(".main-nav .nav-link");
    let allCategoryBtns = [];

    allCategoryLinks.forEach((link) => {
      if (link.textContent.includes("All category")) {
        allCategoryBtns.push(link);
      }
    });

    allCategoryBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const productSidebar = document.querySelector("aside.col-lg-3");
        if (!productSidebar) return;

        e.preventDefault();

        let productMain = productSidebar.nextElementSibling;

        if (productMain && productSidebar.querySelector(".filter-group")) {
          const isVisible =
            window.getComputedStyle(productSidebar).display !== "none";

          if (isVisible) {
            productSidebar.style.setProperty("display", "none", "important");
            productMain.classList.remove("col-lg-9");
            productMain.classList.add("col-lg-12");
          } else {
            productSidebar.style.setProperty("display", "block", "important");
            productMain.classList.remove("col-lg-12");
            productMain.classList.add("col-lg-9");
          }
        }
      });
    });
  }

  function initProductClick() {
    document.addEventListener("click", function (e) {
      const cardClasses = [
        ".product-card",
        ".grid-card",
        ".grid-item",
        ".h-product-item",
        ".recommended-card",
        ".col-md-3.col-6.p-3",
        ".product-item",
      ];
      let card = null;
      for (const cls of cardClasses) {
        card = e.target.closest(cls);
        if (card) break;
      }

      if (
        card &&
        !e.target.closest(".bi-heart") &&
        !e.target.closest("button")
      ) {
        if (e.target.tagName === "A" || e.target.closest("a"))
          e.preventDefault();
        if (window.location.href.includes("cart.html")) return;

        const img = card.querySelector("img");

        let textElements = Array.from(card.querySelectorAll("*")).filter(
          (el) => el.children.length === 0 && el.textContent.includes("$"),
        );
        let priceText =
          textElements.length > 0
            ? textElements[0].textContent.trim()
            : "$50.00";

        let pElements = Array.from(
          card.querySelectorAll("p, h5, h6, span"),
        ).filter(
          (el) =>
            el.children.length === 0 &&
            !el.textContent.includes("$") &&
            !el.textContent.includes("%") &&
            el.textContent.trim().length > 3 &&
            !el.classList.contains("text-muted") &&
            !el.classList.contains("badge") &&
            !el.classList.contains("desc"),
        );
        let titleText =
          pElements.length > 0
            ? pElements[0].textContent.trim()
            : "Premium Product";

        const productData = {
          image: img ? img.src : "",
          title: titleText,
          price: priceText,
        };

        localStorage.setItem("selectedProduct", JSON.stringify(productData));
        window.location.href = "detail.html";
      }
    });
  }

  function initProductDetail() {
    if (!window.location.href.includes("detail.html")) return;
    const productDataStr = localStorage.getItem("selectedProduct");
    if (productDataStr) {
      try {
        const productData = JSON.parse(productDataStr);
        const desktopImg = document.getElementById("detail-img-desktop");
        const mobileImg = document.getElementById("detail-img-mobile");
        if (desktopImg && productData.image) desktopImg.src = productData.image;
        if (mobileImg && productData.image) mobileImg.src = productData.image;

        const thumbnails = document.querySelectorAll(".detail-thumb");
        thumbnails.forEach((thumb) => {
          if (productData.image) thumb.src = productData.image;
        });

        const desktopTitle = document.getElementById("detail-title-desktop");
        const mobileTitle = document.getElementById("detail-title-mobile");
        if (desktopTitle && productData.title)
          desktopTitle.textContent = productData.title;
        if (mobileTitle && productData.title)
          mobileTitle.textContent = productData.title;

        const desktopPrice = document.getElementById("detail-price-desktop");
        const mobilePrice = document.getElementById("detail-price-mobile");
        if (desktopPrice && productData.price)
          desktopPrice.textContent = productData.price;
        if (mobilePrice && productData.price)
          mobilePrice.textContent = productData.price;

        let basePrice = parseFloat(productData.price.replace(/[^0-9.]/g, ""));
        if (isNaN(basePrice)) basePrice = 50.0;

        const price2 = "$" + (basePrice * 0.9).toFixed(2);
        const price3 = "$" + (basePrice * 0.8).toFixed(2);

        const elPrice2 = document.getElementById("detail-price2-desktop");
        const elPrice3 = document.getElementById("detail-price3-desktop");
        if (elPrice2) elPrice2.textContent = price2;
        if (elPrice3) elPrice3.textContent = price3;

        const t = (productData.title || "").toLowerCase();
        let specType = "General";
        let specMaterial = "Mixed Materials";
        let specDesign = "Standard";
        let specWarranty = "1 year limited";
        let specCategory = "Misc";

        if (
          t.includes("shirt") ||
          t.includes("wear") ||
          t.includes("cloth") ||
          t.includes("short") ||
          t.includes("polo")
        ) {
          specType = "Apparel";
          specMaterial = "Cotton / Polyester";
          specDesign = "Casual Modern";
          specCategory = "Clothing";
        } else if (
          t.includes("bag") ||
          t.includes("backpack") ||
          t.includes("wallet")
        ) {
          specType = "Accessory";
          specMaterial = "Nylon / Leather / Canvas";
          specDesign = "Ergonomic";
          specCategory = "Bags & Luggage";
        } else if (
          t.includes("chair") ||
          t.includes("sofa") ||
          t.includes("table")
        ) {
          specType = "Furniture";
          specMaterial = "Wood / Fabric / Metal";
          specDesign = "Contemporary";
          specWarranty = "3 years full warranty";
          specCategory = "Home & Interior";
        } else if (
          t.includes("phone") ||
          t.includes("watch") ||
          t.includes("headphone") ||
          t.includes("camera")
        ) {
          specType = "Electronic Device";
          specMaterial = "Plastic / Aluminum / Glass";
          specDesign = "Sleek Tech";
          specWarranty = "2 years manufacturer";
          specCategory = "Electronics, gadgets";
        } else if (
          t.includes("kettle") ||
          t.includes("boiler") ||
          t.includes("kitchen") ||
          t.includes("lamp")
        ) {
          specType = "Appliance / Decor";
          specMaterial = "Stainless Steel / Plastic";
          specDesign = "Functional";
          specCategory = "Home & Kitchen";
        }

        const dtType = document.getElementById("spec-type-desktop");
        const dtMat = document.getElementById("spec-material-desktop");
        const dtDes = document.getElementById("spec-design-desktop");
        const dtWar = document.getElementById("spec-warranty-desktop");
        if (dtType) dtType.textContent = specType;
        if (dtMat) dtMat.textContent = specMaterial;
        if (dtDes) dtDes.textContent = specDesign;
        if (dtWar) dtWar.textContent = specWarranty;

        const mbMat = document.getElementById("spec-material-mobile");
        const mbCat = document.getElementById("spec-category-mobile");
        const mbItem = document.getElementById("spec-item-mobile");
        if (mbMat) mbMat.textContent = specMaterial;
        if (mbCat) mbCat.textContent = specCategory;
        if (mbItem)
          mbItem.textContent = Math.floor(
            Math.random() * 89999 + 10000,
          ).toString();
      } catch (e) {
        console.error(e);
      }
    } else {
      const mainContent = document.querySelector(
        ".card.border-0.shadow-sm.rounded-3.overflow-hidden",
      );
      if (mainContent) {
        mainContent.innerHTML =
          '<div class="p-5 text-center my-5"><i class="bi bi-box-seam text-muted mb-3" style="font-size:4rem;"></i><h4 class="text-dark">No product selected</h4><p class="text-secondary mb-4">Please select a product from the shop to view details.</p><a href="index.html" class="btn btn-primary px-4 py-2 border-0 shadow-sm" style="background-color: #0d6efd;">Return to Shop</a></div>';
      }

      const infoContainer = document.querySelector(".col-lg-9.mb-4");
      const relatedContainer = document.querySelector(
        ".container-fluid.px-xl-5.mt-4.desktop-only",
      );
      const tabContainer = document.getElementById("productTabs");

      if (infoContainer) infoContainer.style.display = "none";
      if (relatedContainer) relatedContainer.style.display = "none";
      if (tabContainer)
        tabContainer.closest(".container-fluid").style.display = "none";
    }
  }

  function initCartAdd() {
    const addBtns = document.querySelectorAll(".add-to-cart-btn");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const desktopImg = document.getElementById("detail-img-desktop");
        const desktopTitle = document.getElementById("detail-title-desktop");
        const desktopPrice = document.getElementById("detail-price-desktop");

        const cartItem = {
          id: Date.now(),
          image: desktopImg ? desktopImg.src : "",
          title: desktopTitle ? desktopTitle.textContent : "Product",
          price: desktopPrice ? desktopPrice.textContent : "$10.00",
          qty: 1,
        };

        let cart = [];
        try {
          const cartStr = localStorage.getItem("cart");
          if (cartStr) cart = JSON.parse(cartStr);
        } catch (e) { }

        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        showNotification("Product added to cart!", "success");
      });
    });
  }

  function initCartRender() {
    if (!window.location.href.includes("cart.html")) return;

    let cart = [];
    try {
      const cartStr = localStorage.getItem("cart");
      if (cartStr) cart = JSON.parse(cartStr);
    } catch (e) { }

    const desktopContainer = document.getElementById("desktop-cart-container");
    const mobileContainer = document.getElementById("mobile-cart-container");

    if (cart.length === 0) {
      const emptyHtml = `<div class="text-center p-5">
                <i class="bi bi-cart-x text-muted" style="font-size: 4rem;"></i>
                <h5 class="mt-3 text-dark">Your cart is empty</h5>
                <a href="index.html" class="btn btn-primary mt-3 border-0 shadow-sm" style="background-color: #0d6efd;">Continue Shopping</a>
            </div>`;

      if (desktopContainer) desktopContainer.innerHTML = emptyHtml;
      if (mobileContainer) mobileContainer.innerHTML = emptyHtml;

      document
        .querySelectorAll(".card:not(#desktop-cart-container):not(.pointer)")
        .forEach((el) => {
          if (el.textContent.includes("Subtotal")) el.style.display = "none";
        });
      document
        .querySelectorAll(".cart-summary-line")
        .forEach((el) => (el.parentElement.style.display = "none"));
      const h4Cart = document.querySelector("h4.desktop-only");
      if (h4Cart) h4Cart.textContent = "My cart (0)";
    } else {
      const h4Cart = document.querySelector("h4.desktop-only");
      if (h4Cart) h4Cart.textContent = "My cart (" + cart.length + ")";

      if (desktopContainer) {
        let html = "";
        cart.forEach((item, index) => {
          html += `
                    <div class="d-flex align-items-center border-bottom pb-3 mb-3 w-100">
                        <div class="border rounded-2 p-2 bg-white me-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; flex-shrink: 0;">
                            <img src="${item.image}" class="img-fluid" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                        </div>
                        <div class="flex-grow-1 pe-4">
                            <h6 class="fw-medium text-dark mb-1 d-block" style="font-size: 16px;">${item.title}</h6>
                            <div class="d-flex gap-2 mt-2">
                                <button class="btn btn-sm btn-outline-danger px-3 bg-white fw-medium remove-cart-item" data-id="${item.id}" style="font-size: 13px; color: #d9534f !important; border-color: #dee2e6;">Remove</button>
                            </div>
                        </div>
                        <div class="d-flex flex-column align-items-end justify-content-between ms-auto" style="height: 100px;">
                            <span class="fw-bold text-dark fs-5">${item.price}</span>
                            <span class="text-secondary small">Qty: ${item.qty}</span>
                        </div>
                    </div>`;
        });
        html += `
                    <div class="d-flex justify-content-between align-items-center mt-3 pt-2 w-100">
                        <a href="index.html" class="btn btn-primary px-4 fw-medium text-white d-flex align-items-center border-0 shadow-sm" style="background-color: #0d6efd;"><i class="bi bi-arrow-left me-2"></i>Back to shop</a>
                        <button class="btn btn-outline-primary px-4 fw-medium bg-white" id="clear-cart-btn" style="border-color: #dee2e6;">Remove all</button>
                    </div>`;
        desktopContainer.innerHTML = html;
      }

      if (mobileContainer) {
        let html = "";
        cart.forEach((item, index) => {
          html += `
                    <div class="card border-0 border-bottom rounded-0 p-3 mb-0 pointer">
                        <div class="d-flex w-100">
                            <div class="bg-white border rounded me-3 d-flex align-items-center justify-content-center p-1" style="width: 72px; height: 72px; flex-shrink: 0;">
                                <img src="${item.image}" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start mb-1">
                                    <h6 class="fw-normal text-dark mb-0 pe-2" style="font-size: 15px; line-height: 1.3;">${item.title}</h6>
                                </div>
                                <button class="btn btn-sm btn-outline-danger px-2 py-0 mt-2 bg-white fw-medium remove-cart-item" data-id="${item.id}" style="font-size: 12px; color: #d9534f !important; border-color: #dee2e6;">Remove</button>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="text-secondary small">Qty: ${item.qty}</span>
                            <div class="fw-bold fs-5 text-dark">${item.price}</div>
                        </div>
                    </div>`;
        });
        mobileContainer.innerHTML = html;
      }

      document.querySelectorAll(".remove-cart-item").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          let c = JSON.parse(localStorage.getItem("cart") || "[]");
          c = c.filter((item) => item.id !== id);
          localStorage.setItem("cart", JSON.stringify(c));
          window.location.reload();
        });
      });

      const clearBtn = document.getElementById("clear-cart-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          localStorage.removeItem("cart");
          window.location.reload();
        });
      }
    }
  }
});