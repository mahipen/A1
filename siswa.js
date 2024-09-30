



document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (!studentId) {
        document.getElementById('profile').innerHTML = 'ID siswa tidak ditemukan.';
        return;
    }

    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const allStudents = data; // Store all students for reference
            const student = data.find(s => s.id_siswa === studentId);

            if (!student) {
                document.getElementById('profile').innerHTML = 'Siswa tidak ditemukan.';
                return;
            }

            // Fungsi untuk menghitung umur
            function calculateAge(birthDate) {
                const today = new Date();
                const birth = new Date(birthDate);
                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
                return age;
            }

            // Fungsi untuk menentukan zodiak
            function getZodiacSign(birthDate) {
                const date = new Date(birthDate);
                const day = date.getDate();
                const month = date.getMonth() + 1; // January is 0!

                if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
                if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
                if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
                if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
                if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
                if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
                if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
                if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
                if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
                if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
                if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
                if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
            }

            // Fungsi untuk menghitung sisa hari atau tahun sampai ulang tahun berikutnya
            function calculateDaysUntilBirthday(birthDate) {
                const today = new Date();
                const birthday = new Date(birthDate);
                birthday.setFullYear(today.getFullYear());

                if (today > birthday) {
                    birthday.setFullYear(today.getFullYear() + 1);
                }

                const timeDiff = birthday - today;
                const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return days;
            }

            // Format tanggal ulang tahun
            function formatDate(date) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString(undefined, options);
            }

            // Extract friend IDs
            const friendIds = student.teman_terdekat;
            const friends = allStudents.filter(s => friendIds.includes(s.id_siswa));

            const profileDiv = document.getElementById('profile');
            const birthDate = student.tanggal_lahir;
            const age = calculateAge(birthDate);
            const zodiacSign = getZodiacSign(birthDate);
            const daysUntilBirthday = calculateDaysUntilBirthday(birthDate);

            profileDiv.innerHTML = `
<div class="content">



    <div class="wallpaper">
          

        </div>   

    <div class="bio">
        <div class="pre-bio">
            <div class="pfp">
                <img src="${student.foto_profil}" alt="${student.nama_panggilan}">
            </div>
         
        </div>

        <div>
       
        </div>
    <div class="toppro">
<h2 >${student.nama_lengkap}</h2>
<div class="subtext">${student.kelas}, ${student.jabatan_di_kelas}</div>

<div class="friends-container">
 <div class="playlist">
        <a href="${student.playlist_musik}" target="_blank">Dengarkan Playlist</a>
    </div>
    <ul class="closest-friends-list">
        ${friends.slice(0, 3).map(friend => `
            <li class="friend-card">
                <a href="siswa.html?id=${friend.id_siswa}" class="friend-link">
                    <img src="${friend.foto_profil}" alt="${friend.nama_lengkap}" class="friend-image">
                </a>
            </li>
        `).join('')}
    </ul>
    
    ${friends.length > 3 ? `
        <div class="more-friends-container">
            <a href="teman.html?id=${student.id_siswa}" class="more-friends-link">
                +${friends.length - 3}
            </a>
        </div>
    ` : ''}
    
   
</div>

<div></div>

<div>🚀 ${student.quote_favorit}</div>

<div>
    <a href="https://linktr.ee/codegem">linktr.ee/codegem</a>
    <span class="secondary">
        <p>${age} tahun, ${zodiacSign}</p>
        <p>Ultah berikutnya: ${daysUntilBirthday} hari</p>
        ${daysUntilBirthday === 0 ? '<p>Selamat Ulang Tahun!</p>' : ''}
    </span>
</div>

<div class="hobi-container">
    <div class="hobi">
        <ul>
            ${student.hobi_dan_minat.map(hobi => `<li>${hobi}</li>`).join('')}
        </ul>
    </div>
</div>
</div>
    </div>

    <div class="tabs">
        <div class="selected" data-tab="tweets">Informasi</div>
        <div data-tab="media">Lainnya</div>
    </div>

    <div class="tab-content active" id="tweets">
<section class="container-section">
    <div class="sec-informasi">
        <h2>Informasi</h2>
        <p>Jurusan: ${student.jurusan}</p>
        <p>Tanggal Lahir: ${student.tanggal_lahir}</p>
        <p>Kelamin: ${student.kelamin}</p>
        <p>Biografi: ${student.biografi}</p>
        <p>Cita-cita: ${student.mimpi_dan_cita_cita}</p>
    </div>
</section>

<section class="container-section">
    <h2>Statistik Akademis</h2>
    <div class="container-bar">
        <div class="bar" data-value="${student.statistik_akademis.semester_1.rata_rata}">
            <span>Semester 1, ${student.statistik_akademis.semester_1.rata_rata}</span>
        </div>
        <div class="bar" data-value="${student.statistik_akademis.semester_2.rata_rata}">
            <span>Semester 2, ${student.statistik_akademis.semester_2.rata_rata}</span>
        </div>
        <div class="bar" data-value="75">
            <span>Semester 3</span>
        </div>
        <div class="bar" data-value="50">
            <span>Semester 4</span>
        </div>
    </div>
</section>

<section class="container-section">
    <div class="sec-prestasi">
        <h2>Prestasi</h2>
        <ul>
            ${student.prestasi.map(p => `<li>${p}</li>`).join('')}
        </ul>
    </div>
</section>

<section class="container-section">
    <div class="badge-container">
        <h2>Badge</h2>
        ${student.badge_penghargaan.map(badge => `
            <div class="tooltip-container">
                <img src="${badge.logo}" alt="${badge.nama}" class="badge-logo">
                <span class="tooltip">${badge.nama}</span>
            </div>
        `).join('')}
    </div>
</section>

<section class="container-section">
    <h2>Aktivitas Ekstrakurikuler</h2>
    <ul class="extracurricular-list">
        ${student.aktivitas_ekstrakurikuler.map(a => `
            <li class="extracurricular-item">
                <a href="ekstrakurikuler.html?nama=${encodeURIComponent(a.nama)}" class="extracurricular-link">
                    <img src="${a.logo}" alt="${a.nama}" class="activity-logo">
                    <span class="activity-name">${a.nama}</span>
                </a>
            </li>
        `).join('')}
    </ul>
</section>

<section class="container-section">
    <h2>Timeline Pendidikan</h2>
    <ul class="timeline-list">
        ${student.timeline_pendidikan.map(entry => `
            <li class="timeline-item">
                <div class="timeline-date">${entry.startYear} - ${entry.endYear}</div>
                <div class="timeline-content">
                    <h3>${entry.title}</h3>
                    <p>${entry.institution}</p>
                </div>
            </li>
        `).join('')}
    </ul>
</section>

    </div>





    
    <div class="tab-content" id="media">



    </div>
    <div class="tab-content" id="likes">
        Content for Likes
    </div>
    <div class="tab-content" id="replies">
        Content for Tweets & replies
    </div>

    







</div>

            `;


                               // JavaScript to handle bar widths
                               const bars = document.querySelectorAll('.bar');
                               bars.forEach(bar => {
                                   const value = parseInt(bar.getAttribute('data-value'));
                                   bar.style.width = `${value}%`;
                               });

            // Add event listeners for tab switching
            const tabs = document.querySelectorAll('.tabs div');
            const tabContents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('selected'));
                    tab.classList.add('selected');

                    const targetTab = tab.getAttribute('data-tab');
                    tabContents.forEach(content => {
                        if (content.id === targetTab) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        })
        .catch(error => {
            document.getElementById('profile').innerHTML = 'Terjadi kesalahan saat memuat data.';
            console.error('Error:', error);
        });
});

window.addEventListener("load", main);

function switchTheme() {
    document.body.classList.toggle('light-theme');
};

// Get the modal
var modal = document.getElementById('myModal');

// Get all images with class 'banner-image'
var imgs = document.querySelectorAll('.banner-image');

imgs.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = 'block';
        var modalImg = document.getElementById('img01');
        var captionText = document.getElementById('caption');
        modalImg.src = this.src;
        captionText.innerHTML = this.alt || ''; // Use alt text if available
    };
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

