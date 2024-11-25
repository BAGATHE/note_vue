<template>
  <layout-div>
    <div class="row justify-content-md-center">
      <div class="col-12">
        <student-list  v-if="etudiants.length" :etudiants="etudiants" :semestres="semestres" />
        <p v-else class="text-center text-muted mt-3">Aucun étudiant trouvé.</p>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import StudentList from './StudentList.vue';

export default {
  name: 'DashboardPage',
  components: {
    LayoutDiv,
    StudentList,
  },
  data() {
    return {
      etudiants: [],
      semestres: [],
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/'); // Redirection si aucun token
    } else {
      this.fetchEtudiants(token); // Appel de l'API pour récupérer les étudiants
    }
  },
  methods: {
    async fetchEtudiants(token) {
      try {
        const [etudiantResponse, semestreResponse] = await Promise.all([
          axios.get('/etudiants', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/semestres', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        this.etudiants = etudiantResponse.data.etudiants;
        this.semestres = semestreResponse.data.semestres;
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants :', error);
        // Gestion de la redirection ou affichage d'un message d'erreur
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
  },
};
</script>
