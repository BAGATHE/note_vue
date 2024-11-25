<template>
    <div class="student-list">
      <h3 class="text-center my-3">Liste des Étudiants</h3>
      <div class="table-responsive">
        <table class="table table-bordered text-center">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Numero etudiant</th>
              <th>Nom</th>
              <!-- Colonnes dynamiques pour les semestres -->
              <th v-for="semestre in semestres" :key="semestre.id">
                {{ semestre.semestre }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(etudiant, index) in etudiants" :key="etudiant.id_etudiant">
              <td>{{ index + 1 }}</td>
              <td>{{ etudiant.num_inscription }}</td>
              <td>{{ etudiant.nom }} {{ etudiant.prenom }}</td>
              <!-- Vérifie si l'étudiant est inscrit à un semestre -->
              <td v-for="semestre in semestres" :key="semestre.id">
               {{ semestre.semestre }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      etudiants: {
        type: Array,
        required: true,
      },
      semestres: {
        type: Array,
        required: true, 
      },
    },
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  </style>
  