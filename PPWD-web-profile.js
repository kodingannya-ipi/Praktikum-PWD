function initDarkMode() {
    const tombolTema = document.getElementById("dark-mode-toggle");

    tombolTema.addEventListener("click", function () {
        const modeGelapAktif =
            document.body.classList.toggle("mode-gelap");

        tombolTema.textContent =
            modeGelapAktif ? "🌙" : "☀️";
    });
}

function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const semuaTautanNav =
        document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("hamburger-aktif");
        navMenu.classList.toggle("menu-terbuka");
    });
    
    semuaTautanNav.forEach(function (tautan) {
        tautan.addEventListener("click", function () {
            navMenu.classList.remove("menu-terbuka");
            hamburger.classList.remove("hamburger-aktif");
        });
    });
}

function initNavbarScrollEffects() {
    const navbar = document.getElementById("navbar");

    const semuaSection =
        document.querySelectorAll(".section, .hero");

    const semuaTautanNav =
        document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 40) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        let idSectionAktif = "";

        semuaSection.forEach(function (section) {
            const posisi =
                section.getBoundingClientRect();

            if (
                posisi.top <= 120 &&
                posisi.bottom > 120
            ) {
                idSectionAktif =
                    section.getAttribute("id");
            }
        });

        semuaTautanNav.forEach(function (tautan) {

            tautan.classList.remove("link-aktif");

            if (
                tautan.getAttribute("href") ===
                "#" + idSectionAktif
            ) {
                tautan.classList.add("link-aktif");
            }
        });
    });
}

function jalankanAnimasiCounter() {

    const semuaCounter =
        document.querySelectorAll(".counter");

    semuaCounter.forEach(function (counter) {

        const nilaiTarget =
            parseInt(counter.dataset.target, 10);

        let nilaiSaatIni = 0;


        const kenaikanPerLangkah =
            Math.ceil(nilaiTarget / 50);

        const interval = setInterval(function () {

            nilaiSaatIni += kenaikanPerLangkah;

            if (nilaiSaatIni >= nilaiTarget) {

                nilaiSaatIni = nilaiTarget;

                clearInterval(interval);
            }

            counter.textContent = nilaiSaatIni;

        }, 30);
    });
}


function initCounterAnimation() {

    const sectionTentang =
        document.getElementById("tentang");

    let animasiSudahDijalankan = false;

    window.addEventListener("scroll", function () {

        if (animasiSudahDijalankan) {
            return;
        }

        const posisi =
            sectionTentang.getBoundingClientRect();

        if (
            posisi.top <
            window.innerHeight - 100
        ) {

            jalankanAnimasiCounter();

            animasiSudahDijalankan = true;
        }
    });
}

function initPortfolioFilter() {

    const semuaTombolFilter =
        document.querySelectorAll(".filter-btn");

    const semuaItemPortofolio =
        document.querySelectorAll(".portfolio-item");

    semuaTombolFilter.forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            const kategoriDipilih =
                tombol.dataset.kategori;

            semuaItemPortofolio.forEach(function (item) {

                const cocok =
                    kategoriDipilih === "semua" ||
                    item.dataset.kategori ===
                    kategoriDipilih;

                item.classList.toggle(
                    "tersembunyi",
                    !cocok
                );
            });

            semuaTombolFilter.forEach(function (t) {
                t.classList.remove("aktif");
            });

            tombol.classList.add("aktif");
        });
    });
}

function initTestimonialSlider() {

    const semuaSlide =
        document.querySelectorAll(".testimonial-slide");

    const kontainerTitik =
        document.getElementById("testi-dots");

    let indexAktif = 0;

    semuaSlide.forEach(function (_, index) {

        const titik =
            document.createElement("button");

        titik.classList.add("testi-dot");

        titik.setAttribute("type", "button");

        titik.setAttribute(
            "aria-label",
            "Tampilkan testimoni ke-" +
            (index + 1)
        );

        if (index === 0) {
            titik.classList.add("dot-aktif");
        }

        titik.addEventListener("click", function () {
            tampilkanSlide(index);
        });

        kontainerTitik.appendChild(titik);
    });

    const semuaTitik =
        kontainerTitik.querySelectorAll(".testi-dot");

    function tampilkanSlide(index) {

        semuaSlide.forEach(function (slide) {
            slide.classList.remove("slide-aktif");
        });

        semuaTitik.forEach(function (titik) {
            titik.classList.remove("dot-aktif");
        });

        semuaSlide[index].classList.add(
            "slide-aktif"
        );

        semuaTitik[index].classList.add(
            "dot-aktif"
        );

        indexAktif = index;
    }

    document
        .getElementById("testi-next")
        .addEventListener("click", function () {

            const selanjutnya =
                (indexAktif + 1) %
                semuaSlide.length;

            tampilkanSlide(selanjutnya);
        });

    document
        .getElementById("testi-prev")
        .addEventListener("click", function () {

            const sebelumnya =
                (indexAktif - 1 +
                semuaSlide.length) %
                semuaSlide.length;

            tampilkanSlide(sebelumnya);
        });

    setInterval(function () {

        const selanjutnya =
            (indexAktif + 1) %
            semuaSlide.length;

        tampilkanSlide(selanjutnya);

    }, 6000);

    tampilkanSlide(0);
}

function initAccordionFAQ() {

    const semuaItemFAQ =
        document.querySelectorAll(".accordion-item");

    semuaItemFAQ.forEach(function (item) {

        const tombolPertanyaan =
            item.querySelector(".accordion-question");

        const elemenJawaban =
            item.querySelector(".accordion-answer");

        tombolPertanyaan.addEventListener(
            "click",
            function () {

                const sedangTerbuka =
                    item.classList.contains(
                        "item-terbuka"
                    );

                semuaItemFAQ.forEach(function (itemLain) {

                    itemLain.classList.remove(
                        "item-terbuka"
                    );

                    itemLain
                        .querySelector(
                            ".accordion-answer"
                        )
                        .style.maxHeight = null;
                });

                if (!sedangTerbuka) {

                    item.classList.add(
                        "item-terbuka"
                    );

                    elemenJawaban.style.maxHeight =
                        elemenJawaban.scrollHeight +
                        "px";
                }
            }
        );
    });
}

function initContactForm() {

    const form =
        document.getElementById("contact-form");

    const elemenStatus =
        document.getElementById("form-status");


    function tampilkanStatus(pesan, jenis) {

        elemenStatus.textContent = pesan;

        elemenStatus.classList.remove(
            "sukses",
            "gagal"
        );

        elemenStatus.classList.add(
            "tampil",
            jenis
        );
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nilaiNama =
                document
                    .getElementById("cf-nama")
                    .value
                    .trim();

            const nilaiEmail =
                document
                    .getElementById("cf-email")
                    .value
                    .trim();

            const nilaiSubjek =
                document
                    .getElementById("cf-subjek")
                    .value
                    .trim();

            const nilaiPesan =
                document
                    .getElementById("cf-pesan")
                    .value
                    .trim();


            if (
                nilaiNama === "" ||
                nilaiEmail === "" ||
                nilaiSubjek === "" ||
                nilaiPesan === ""
            ) {

                tampilkanStatus(
                    "Seluruh kolom wajib diisi sebelum pesan dapat dikirim.",
                    "gagal"
                );

                return;
            }


            if (nilaiPesan.length < 10) {

                tampilkanStatus(
                    "Pesan terlalu singkat. Mohon jelaskan kebutuhan Anda lebih detail.",
                    "gagal"
                );

                return;
            }


            tampilkanStatus(
                `Terima kasih, ${nilaiNama}! Pesan Anda telah kami terima dan akan segera kami balas.`,
                "sukses"
            );

            form.reset();
        }
    );
}

function initBackToTopButton() {

    const tombolKeAtas =
        document.getElementById("back-to-top");


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                tombolKeAtas.classList.add(
                    "tombol-tampil"
                );

            } else {

                tombolKeAtas.classList.remove(
                    "tombol-tampil"
                );
            }
        }
    );


    tombolKeAtas.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}

initDarkMode();
initHamburgerMenu();
initNavbarScrollEffects();
initCounterAnimation();
initPortfolioFilter();
initTestimonialSlider();
initAccordionFAQ();
initContactForm();
initBackToTopButton();