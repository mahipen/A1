document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (!studentId) {
        document.getElementById('friend-list-container').innerHTML = 'ID siswa tidak ditemukan.';
        return;
    }

    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const student = data.find(s => s.id_siswa === studentId);

            if (!student) {
                document.getElementById('friend-list-container').innerHTML = 'Siswa tidak ditemukan.';
                return;
            }

            const friendIds = student.teman_terdekat;
            const friends = data.filter(s => friendIds.includes(s.id_siswa));

            const friendList = document.getElementById('friend-list');
            friendList.innerHTML = friends.map(friend => `
 <li class="friend-item">
                <a href="siswa.html?id=${friend.id_siswa}">
                     <img src="${friend.foto_profil}" alt="${friend.nama_lengkap}" class="friend-avatar">
                     <div class="friend-info">
                    <p class="friend-name">${friend.nama_lengkap}</p>
                    <p class="friend-status">${student.kelas}, ${student.jabatan_di_kelas}</p>
                </a>
            </li>

                
            `).join('');
        })
        .catch(error => {
            document.getElementById('friend-list-container').innerHTML = 'Terjadi kesalahan saat memuat data.';
            console.error('Error:', error);
        });
});