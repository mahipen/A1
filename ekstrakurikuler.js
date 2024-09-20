document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const activityName = urlParams.get('nama');

    if (!activityName) {
        document.getElementById('ekstrakurikulerList').innerHTML = 'Nama ekstrakurikuler tidak ditemukan.';
        return;
    }

    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const studentsInActivity = data.filter(student =>
                student.aktivitas_ekstrakurikuler.some(activity => activity.nama === activityName)
            );

            const ekstrakurikulerListDiv = document.getElementById('ekstrakurikulerList');
            if (studentsInActivity.length === 0) {
                ekstrakurikulerListDiv.innerHTML = `Tidak ada siswa yang terdaftar dalam ekstrakurikuler "${activityName}".`;
                return;
            }

            ekstrakurikulerListDiv.innerHTML = `
                <h2>Siswa yang Terlibat dalam ${activityName}</h2>
                <ul>
                    ${studentsInActivity.map(student => `
                        <li>
                            <a href="siswa.html?id=${student.id_siswa}">
                                <img src="${student.foto_profil}" alt="${student.nama_panggilan}" class="profile-pic">
                                ${student.nama_lengkap}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => {
            document.getElementById('ekstrakurikulerList').innerHTML = 'Terjadi kesalahan saat memuat data.';
            console.error('Error:', error);
        });
});
