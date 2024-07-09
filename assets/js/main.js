document.addEventListener("DOMContentLoaded", () => {
  const languageLabel = document.getElementById("language-label");
  let currentLanguage = localStorage.getItem('language') || 'en';
  let translations = {};

  // Elements to translate (make sure IDs match your HTML)
  const elementsToTranslate = {
    time: document.getElementById("time"),
    landingPageTitle: document.getElementById("landing-page-title"),
    description: document.getElementById("description"),
    b2b: document.getElementById("b2b"),
    hotline: document.getElementById("hotline"),
    openInMap: document.getElementById("open-in-map"),
    chatInWechat: document.getElementById("chat-in-wechat"),
    meetOurLeadership: document.getElementById("meet-our-leadership"),
    oegAboutText: document.getElementById("oeg-about-text"),
    ceo: document.getElementById("ceo"),
    chairman: document.getElementById("chairman"),
    manager: document.getElementById("manager"),
    platform: document.getElementById("platform"),
    business: document.getElementById("business"),
    profile: document.getElementById("profile"),
    game: document.getElementById("game"),
    esports: document.getElementById("esports"),
    pdfEnglish: document.getElementsByClassName("pdf-english"),
    ecosystemTitle: document.getElementById("ecosystemTitle"),
    ecosystemImage: document.getElementById("ecosystemImage"),
    caseStudyTitle: document.getElementById("caseStudyTitle"),
    caseStudyText: document.getElementById("caseStudyText"),
    trustedPartnerTitle: document.getElementById("trustedPartnerTitle"),
    trustedOpenInMap: document.getElementById("trustedOpenInMap"),
    trustedCallUsInChina: document.getElementById("trustedCallUsInChina"),
    trustedChatInWechat: document.getElementById("trustedChatInWechat"),
    headOffice: document.getElementById("headOffice"),
    address: document.getElementById("address"),
  };

  // Function to fetch language.json
  function fetchLanguage() {
    fetch("language.json")
      .then((response) => response.json())
      .then((data) => {
        translations = data;
        applyLanguage(currentLanguage);
      })
      .catch((error) => {
        console.error("Error fetching language file:", error);
      });
  }

  // Apply language function
  function applyLanguage(language) {
    if (!translations[language]) {
      console.error("Translations not available for language:", language);
      return;
    }

    const translation = translations[language];
    for (const key in translation) {
      if (
        key === "header" ||
        key === "oegStart" ||
        key === "oegGrid" ||
        key === "oegEcosystem" ||
        key === "oegCaseStudy" ||
        key === "oegTrustedPartner" ||
        key === "footer"
      ) {
        for (const headerKey in translation[key]) {
          const element = elementsToTranslate[headerKey];
          if (element) {
            element.innerHTML = translation[key][headerKey];
          }
        }
      } else if (elementsToTranslate[key]) {
        if (key === "b2b" || key === "time" || key === "ecosystemImage") {
          elementsToTranslate[key].innerHTML = translation[key];
        } else {
          elementsToTranslate[key].textContent = translation[key];
        }
      }
    }

    // Apply translations to pdf-english elements
    document.querySelectorAll(".pdf-english").forEach((element) => {
      element.textContent = translation["oegGrid"].pdfEnglish;
    });

    document.querySelectorAll(".pdf-chinese").forEach((element) => {
      element.textContent = translation["oegGrid"].pdfChinese;
    });

    languageLabel.textContent = language === "en" ? "EN" : "CN";
  }

  // Fetch language.json and apply initial language
  fetchLanguage();

  document.querySelectorAll('.select-language li').forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      document.querySelectorAll('.select-language li').forEach(li => li.classList.remove('active'));

      // Add active class to the clicked item
      item.classList.add('active');

      // Change the language
      currentLanguage = item.getAttribute('data-lang');
      applyLanguage(currentLanguage);

      // Save the selected language to local storage
      localStorage.setItem('language', currentLanguage);
    });
  });

  // Set the default active language
  document.querySelector(`.select-language li[data-lang="${currentLanguage}"]`).classList.add('active');

  document.querySelector(".change-language").addEventListener("click", () => {
    document.querySelector(".select-language").classList.toggle("show");
  })


      // Select all buttons with the class 'openPdfButton'
      const buttons = document.querySelectorAll('.oeg-grid-item-content span');

      buttons.forEach(button => {
        button.addEventListener('click', function() {
          // Get the PDF URL from the data-pdf-url attribute
          const pdfUrl = this.getAttribute('data-pdf-url');
          // Open the PDF in a new window or tab
          window.open(pdfUrl, '_blank');
        });
      });
});