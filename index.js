document.addEventListener('DOMContentLoaded', function() {
    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('studentList');
            const kelasFilter = document.getElementById('kelasFilter');
            const kelaminFilter = document.getElementById('kelaminFilter');
            const searchInput = document.getElementById('searchInput');

            // Populate the filter with unique classes
            const classes = new Set();
            data.forEach(student => classes.add(student.kelas));
            classes.forEach(klass => {
                const option = document.createElement('option');
                option.value = klass;
                option.textContent = klass;
                kelasFilter.appendChild(option);
            });

            // Shuffle array function
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            function renderStudents(students) {
                const studentList = document.getElementById('studentList');
                studentList.innerHTML = '';
                students.forEach(student => {
                    const div = document.createElement('div');
                    div.classList.add('student-card');
                    div.innerHTML = `
                        <a href="siswa.html?id=${student.id_siswa}" class="student-link">
                            <div class="student-card-header">
                                <img src="${student.foto_profil}" alt="${student.nama_panggilan}" class="profile-pic">
                                <h2 class="student-name">${student.nama_lengkap}</h2>
                            </div>
                        </a>
                    `;
                    studentList.appendChild(div);
                });
            }
            
            
            function filterStudents() {
                const searchValue = searchInput.value.toLowerCase();
                const kelasValue = kelasFilter.value;
                const kelaminValue = kelaminFilter.value;

                const filteredData = data.filter(student => {
                    return (student.nama_lengkap.toLowerCase().includes(searchValue) || student.nama_panggilan.toLowerCase().includes(searchValue)) &&
                           (kelasValue === '' || student.kelas === kelasValue) &&
                           (kelaminValue === '' || student.kelamin === kelaminValue);
                });

                shuffleArray(filteredData); // Shuffle data before rendering
                renderStudents(filteredData);
            }

            searchInput.addEventListener('input', filterStudents);
            kelasFilter.addEventListener('change', filterStudents);
            kelaminFilter.addEventListener('change', filterStudents);

            filterStudents(); // Initial render
        });
});
