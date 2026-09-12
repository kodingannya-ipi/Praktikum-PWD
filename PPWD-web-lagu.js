document.addEventListener("DOMContentLoaded", function () {
    const Animasi = document.querySelectorAll(
        ".judul-bagian, .teks-rapi, blockquote, .card-item, .song-card"
    );

    Animasi.forEach(function (elemen) {
        elemen.style.opacity = "0";
        elemen.style.transform = "translateY(40px)";
        elemen.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    function CekElemen(elemen) {
        const posisi = elemen.getBoundingClientRect();
        const tinggiLayar = window.innerHeight;
        return posisi.top < tinggiLayar * 0.85;
    }

    function MunculkanElemen() {
        Animasi.forEach(function (elemen) {
            if (CekElemen(elemen) && elemen.style.opacity !== "1") {
                elemen.style.opacity = "1";
                elemen.style.transform = "translateY(0)";
            }
        });
    }

    MunculkanElemen();
    window.addEventListener("scroll", MunculkanElemen);

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); 
            const idTujuan = link.getAttribute("href"); 
            const ElemenTujuan = document.querySelector(idTujuan);

            if (ElemenTujuan) {
                ElemenTujuan.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});