<script setup lang="ts">
import { ref } from 'vue';
import BarChartComponent from '../components/charts/BarChartComponent.vue';
import RadarChartComponent from '../components/charts/RadarChartComponent.vue';
import LineChartComponent from '../components/charts/LineChartComponent.vue';
import DoughnutChartComponent from '../components/charts/DoughnutChartComponent.vue';

const performanceData = ref({
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [{ 
    data: [40, 20, 12, 35, 28, 15, 8],
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: 'rgb(99, 102, 241)',
    borderWidth: 2
  }]
});

const weeklyData = ref({
  labels: ['Cardio', 'Force', 'Flexibilité', 'Endurance', 'Vitesse'],
  datasets: [{ 
    data: [65, 59, 90, 81, 56],
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderColor: 'rgb(236, 72, 153)',
    borderWidth: 2
  }]
});

const progressData = ref({
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{ 
    data: [30, 45, 60, 75, 85, 90],
    borderColor: 'rgb(16, 185, 129)',
    tension: 0.4
  }]
});

const goalsData = ref({
  labels: ['Atteints', 'En cours', 'À venir'],
  datasets: [{ 
    data: [3, 2, 1],
    backgroundColor: [
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(99, 102, 241, 0.8)'
    ]
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- En-tête avec statistiques rapides -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-night-500">Sessions cette semaine</p>
            <p class="text-2xl font-semibold text-night-900">12</p>
          </div>
          <div class="rounded-full bg-primary-50 p-3">
            <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-night-500">Objectifs atteints</p>
            <p class="text-2xl font-semibold text-night-900">3/5</p>
          </div>
          <div class="rounded-full bg-secondary-50 p-3">
            <svg class="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-night-500">Calories brûlées</p>
            <p class="text-2xl font-semibold text-night-900">2,450</p>
          </div>
          <div class="rounded-full bg-green-50 p-3">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-night-500">Temps d'entraînement</p>
            <p class="text-2xl font-semibold text-night-900">8.5h</p>
          </div>
          <div class="rounded-full bg-blue-50 p-3">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques principaux -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Performance quotidienne -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-night-900">Performance quotidienne</h2>
          <button class="text-sm text-primary-600 hover:text-primary-700">Voir plus</button>
        </div>
        <div class="h-80">
          <BarChartComponent :data="performanceData" :options="chartOptions" />
        </div>
      </div>

      <!-- Progression -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-night-900">Progression</h2>
          <button class="text-sm text-primary-600 hover:text-primary-700">Voir plus</button>
        </div>
        <div class="h-80">
          <LineChartComponent :data="progressData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Graphiques secondaires -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Performance de la semaine -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-night-900">Performance de la semaine</h2>
          <button class="text-sm text-primary-600 hover:text-primary-700">Voir plus</button>
        </div>
        <div class="h-80">
          <RadarChartComponent :data="weeklyData" :options="chartOptions" />
        </div>
      </div>

      <!-- Objectifs -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-night-900">Objectifs</h2>
          <button class="text-sm text-primary-600 hover:text-primary-700">Voir plus</button>
        </div>
        <div class="h-80">
          <DoughnutChartComponent :data="goalsData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
