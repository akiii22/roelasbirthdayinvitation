
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* ========================================
   SUPABASE CONFIGURATION
======================================== */

const SUPABASE_URL = "https://vtlstsvywvebpetnesaw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_P9yG71s4B069yM0f7znTGw_Ela7iEvO";

/* Replace with the admin's User UID from Authentication > Users. */
const ADMIN_USER_UID = "888ca505-c48c-46d5-82ad-47c047e1a3f2";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function showStatus(element, message, type = "info") {
  if (!element) return;
  element.textContent = message;
  element.dataset.status = type;
}

/* ========================================
   ENVELOPE / INVITATION
======================================== */

const cover = $("#envelope-screen");
const openButton = $("#open-invitation");
const site = $("#site-shell");
const backButton = $("#back-to-cover");

document.body.classList.add("cover-active");

function openInvitation() {
  if (!cover || !site) return;

  cover.classList.add("is-opening");

  window.setTimeout(() => {
    cover.classList.add("is-hidden");
    site.classList.add("is-open");
    site.setAttribute("aria-hidden", "false");
    document.body.classList.remove("cover-active");

    $("#home")?.scrollIntoView({ behavior: "smooth" });
  }, 850);
}

openButton?.addEventListener("click", openInvitation);

backButton?.addEventListener("click", () => {
  if (!cover || !site) return;

  cover.classList.remove("is-hidden", "is-opening");
  site.classList.remove("is-open");
  site.setAttribute("aria-hidden", "true");
  document.body.classList.add("cover-active");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = $("#menu-toggle");
const navLinks = $("#nav-links");

menuToggle?.addEventListener("click", () => {
  if (!navLinks) return;

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

/* ========================================
   SCROLL REVEAL ANIMATIONS
======================================== */

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) =>
    element.classList.add("is-visible")
  );
}

/* ========================================
   18TH TRADITION WINDOWS
======================================== */

const traditionData = {
  lilies: {
    title: "18th Lilies",
    kicker: "A glow of love",
    names: [
      "Kiel", "Angelo", "Ivan", "John Lorenz", "Allen",
      "Richson", "John Christopher", "Kuya Kenneth", "Kuya Jerome",
      "Kuya Mark", "Ichiro", "Bryan", "Saimon", "Jeiro",
      "Kuya Mike", "Kuya Jhonuel", "Prince", "Papa"
    ]
  },

  wishes: {
    title: "18th Wishes",
    kicker: "Words from the heart",
    names: [
      "Ashia", "Cherrylyn", "Sofia", "Ketsana", "Daneah",
      "Gwen", "Kyla", "Zoe", "Rhianna", "Jenelle", "Ma’am Yakit",
      "Nhisreen", "Joyjoy", "Kuya Em", "Ate Jeramine",
      "Mama", "Papa", "Lola"
    ]
  },

  gifts: {
    title: "18th Gifts",
    kicker: "Thoughtful tokens",
    names: [
      "Ciara", "Stephanie", "Elijah", "May", "Jasmine", "Hafi",
      "Maecey", "Ate Jenny", "Ate Katrina", "Ayesha", "Joanna",
      "Khate Ann", "Zeah", "Allen Joy", "Rhian", "Ate Ashley",
      "Laila", "Ate Zsaniah"
    ]
  },

  treasure: {
    title: "18th Treasure",
    kicker: "Treasured memories",
    names: [
      "Mommy Joy", "Ate Bea", "Tita Jorie", "Ninang Rose",
      "Ninang Michelle", "Ninang Grace", "Tita Mabel",
      "Tita Glenda", "Ate Yana", "Tita Janet", "Tito Johnrey",
      "Kuya Alvin", "Ate Roxanne", "Ate Cha", "Tito Ryan",
      "Tita Lerma", "Ninong Nelson", "Ninang Dianne"
    ]
  },

  shots: {
    title: "18th Shots",
    kicker: "A celebratory toast",
    names: [
      "Ashia", "Allen Joy", "Conner", "Cherry", "Rhianna",
      "Gwen", "Zoe", "Ate Jas", "Ate Jenelle", "Kuya Jhonuel",
      "Ate Jenny", "Ate Arianne", "Ate Vhia", "Kuya Lenard",
      "Kuya Kenneth", "Kuya Mike", "Kuya Mark", "Kuya Jerome"
    ]
  }
};

const traditionDialog = $("#tradition-dialog");

$$("[data-window]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = traditionData[button.dataset.window];

    if (!data || !traditionDialog) return;

    $("#dialog-title").textContent = data.title;
    $("#dialog-kicker").textContent = data.kicker;
    $("#dialog-number").textContent = String(data.names.length);

    const list = $("#dialog-names");

    if (list) {
      list.replaceChildren(
        ...data.names.map((name) => {
          const item = document.createElement("li");
          item.textContent = name;
          return item;
        })
      );
    }

    if (typeof traditionDialog.showModal === "function") {
      traditionDialog.showModal();
    } else {
      window.alert(`${data.title}\n\n${data.names.join("\n")}`);
    }
  });
});

$("#dialog-close")?.addEventListener("click", () => {
  traditionDialog?.close();
});

traditionDialog?.addEventListener("click", (event) => {
  if (event.target === traditionDialog) {
    traditionDialog.close();
  }
});

/* ========================================
   RSVP AND VENUE QR CODES
======================================== */

const venueMapUrl = "https://maps.app.goo.gl/F22uAYbJQLA9Fcje9";

function qrImage(destination) {
  return (
    "https://api.qrserver.com/v1/create-qr-code/" +
    `?size=240x240&margin=8&data=${encodeURIComponent(destination)}`
  );
}

const rsvpQr = $("#rsvp-qr");
const venueQr = $("#venue-qr");
const mapLink = $(".venue-map-button") || $("#map-link");

/*
 * On the deployed website this becomes the public URL.
 * Do not share QR codes generated while testing localhost.
 */
const publicPageUrl = "https://roelasbirthdayinvitation.vercel.app/";

if (rsvpQr) {
  rsvpQr.src = qrImage(`${publicPageUrl}#rsvp`);
  rsvpQr.alt = "Scan to open the invitation and RSVP";
}

if (venueQr) {
  venueQr.src = qrImage(venueMapUrl);
  venueQr.alt = "Scan to open the venue in Google Maps";
}

if (mapLink) {
  mapLink.href = venueMapUrl;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
}

/* ========================================
   PUBLIC RSVP FORM
======================================== */

const rsvpForm = $("#rsvp-form");
const formStatus = $("#form-status");

rsvpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!rsvpForm.reportValidity()) return;

  const submitButton = rsvpForm.querySelector('button[type="submit"]');
  const formData = new FormData(rsvpForm);

  const guestName = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const attendance = String(formData.get("attendance") || "");
  const message = String(formData.get("message") || "").trim();

  if (
    !guestName ||
    guestName.length > 120 ||
    !contact ||
    contact.length > 160 ||
    !["yes", "no"].includes(attendance) ||
    message.length > 1000
  ) {
    showStatus(formStatus, "Please check your details and try again.", "error");
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText =
      submitButton.textContent || "Send RSVP";
    submitButton.textContent = "Submitting...";
  }

  showStatus(formStatus, "Submitting your RSVP...");

  try {
    const { error } = await supabase.from("debut_rsvps").insert({
      guest_name: guestName,
      contact,
      attendance,
      message: message || null
    });

    if (error) throw error;

    showStatus(
      formStatus,
      attendance === "yes"
        ? `Thank you, ${guestName}! Your RSVP has been received.`
        : `Thank you, ${guestName}! Your response has been received.`,
      "success"
    );

    rsvpForm.reset();
  } catch (error) {
    console.error("Supabase RSVP error:", error);

    showStatus(
      formStatus,
      "We couldn't submit your RSVP. Please check your connection and try again.",
      "error"
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent =
        submitButton.dataset.originalText || "Send RSVP";
    }
  }
});

/* ========================================
   ADMIN LOGIN AND DASHBOARD
======================================== */

const adminDialog = $("#admin-dialog");
const adminLoginForm = $("#admin-login-form");
const adminStatus = $("#admin-login-status");
const adminDashboard = $("#admin-dashboard");
const adminGuestList = $("#admin-guest-list");
const adminSearch = $("#admin-search");

let adminRows = [];

function isAuthorizedAdmin(user) {
  return (
    ADMIN_USER_UID !== "REPLACE_WITH_ADMIN_USER_UID" &&
    user?.id === ADMIN_USER_UID
  );
}


function renderAdminRows(rows) {
  adminRows = rows;

  const attending = rows.filter(
    (row) => row.attendance === "yes"
  );

  const declined = rows.filter(
    (row) => row.attendance === "no"
  );

  const totalCount = document.querySelector("#admin-total-count");
  const attendingCount = document.querySelector("#admin-attending-count");
  const declinedCount = document.querySelector("#admin-declined-count");

  if (totalCount) totalCount.textContent = String(rows.length);
  if (attendingCount) attendingCount.textContent = String(attending.length);
  if (declinedCount) declinedCount.textContent = String(declined.length);

  const search = String(adminSearch?.value || "").trim().toLowerCase();

  const filtered = attending.filter((guest) =>
    String(guest.guest_name || "").toLowerCase().includes(search)
  );

  if (!adminGuestList) return;

  adminGuestList.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = search
      ? "No attending guests match your search."
      : "No confirmed attending guests yet.";

    adminGuestList.appendChild(empty);
    return;
  }

  filtered.forEach((guest, index) => {
    const row = document.createElement("article");
    row.className = "admin-guest-row";

    const number = document.createElement("span");
    number.className = "admin-guest-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const details = document.createElement("div");
    details.className = "admin-guest-details";

    const name = document.createElement("strong");
    name.textContent = guest.guest_name || "Unnamed guest";

    const contact = document.createElement("span");
    contact.textContent = guest.contact || "No contact provided";

    details.append(name, contact);

    if (guest.message) {
      const note = document.createElement("p");
      note.textContent = guest.message;
      details.appendChild(note);
    }

    row.append(number, details);
    adminGuestList.appendChild(row);
  });
}


async function loadAdminDashboard() {
  showStatus(adminStatus, "Loading RSVP responses...");

  try {
    const { data, error } = await supabase
      .from("debut_rsvps")
      .select("id, guest_name, contact, attendance, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin RSVP query failed:", error);
      showStatus(
        adminStatus,
        `Could not load responses: ${error.message}`,
        "error"
      );
      return;
    }

    console.log("RSVP rows received:", data);
    console.log("Total RSVP responses:", data.length);

    // Update all three counters and the guest list.
    renderAdminRows(data);

    if (adminDashboard) adminDashboard.hidden = false;
    if (adminLoginForm) adminLoginForm.hidden = true;

    showStatus(
      adminStatus,
      `Successfully loaded ${data.length} RSVP response(s).`,
      "success"
    );
  } catch (error) {
    console.error("Unexpected dashboard error:", error);

    showStatus(
      adminStatus,
      error instanceof Error ? error.message : String(error),
      "error"
    );
  }
}


async function openAdminDashboard() {
  if (!adminDialog) {
    window.alert("Add the admin HTML from the next section to index.html.");
    return;
  }

  if (typeof adminDialog.showModal === "function") {
    if (!adminDialog.open) adminDialog.showModal();
  } else {
    adminDialog.setAttribute("open", "");
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    showStatus(adminStatus, error.message, "error");
    return;
  }

  const user = data.session?.user;

  if (!user) {
    if (adminDashboard) adminDashboard.hidden = true;
    if (adminLoginForm) adminLoginForm.hidden = false;
    return;
  }

  if (!isAuthorizedAdmin(user)) {
    showStatus(adminStatus, "This account is not authorized for the admin dashboard.", "error");
    await supabase.auth.signOut();
    return;
  }

  await loadAdminDashboard();
}

$("#admin-login-button")?.addEventListener("click", openAdminDashboard);

$("#admin-close-button")?.addEventListener("click", () => {
  adminDialog?.close();
});

adminDialog?.addEventListener("click", (event) => {
  if (event.target === adminDialog) adminDialog.close();
});

adminLoginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = String($("#admin-email")?.value || "").trim();
  const password = String($("#admin-password")?.value || "");
  const button = adminLoginForm.querySelector('button[type="submit"]');

  if (!email || !password) {
    showStatus(adminStatus, "Enter your email and password.", "error");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Signing in...";
  }

  showStatus(adminStatus, "Signing in...");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (!isAuthorizedAdmin(data.user)) {
      await supabase.auth.signOut();
      throw new Error("This account is not the designated admin. Check ADMIN_USER_UID in script.js.");
    }

    await loadAdminDashboard();
  } catch (error) {
    console.error("Admin login error:", error);

    showStatus(
      adminStatus,
      error.message || "Login failed. Check your credentials.",
      "error"
    );
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Sign in";
    }
  }
});

$("#admin-logout-button")?.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    showStatus(adminStatus, error.message, "error");
    return;
  }

  adminRows = [];

  if (adminDashboard) adminDashboard.hidden = true;

  if (adminLoginForm) {
    adminLoginForm.hidden = false;
    adminLoginForm.reset();
  }

  showStatus(adminStatus, "You have signed out.");
});

adminSearch?.addEventListener("input", () => {
  renderAdminRows(adminRows);
});

$("#admin-print-button")?.addEventListener("click", () => {
  window.print();
});

console.info("Debut invitation script loaded.");
