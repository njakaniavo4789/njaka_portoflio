/* =========================================================
   PROJETS
   → les captures d'écran vivent dans src/image/ et sont
     importées pour que Vite les optimise et les hashe
========================================================= */

import cropgptCover from '../image/project-cropgpt.jpg'
import hanonCover from '../image/project-hanon.jpg'
import aceServiceCover from '../image/project-aceservice.jpg'

export const projects = [
  {
    title: 'CROPGPT',
    subtitle: 'Agriculture Madagascar',

    url: 'https://cropmg.netlify.app/',
    domain: 'cropmg.netlify.app',

    category: 'APPLICATION WEB',
    year: '2026',

    cover: cropgptCover,

    description:
      "Application web consacrée à l'agriculture à Madagascar, avec une page d'authentification et un espace dédié aux utilisateurs. Déployée sur Netlify.",

    stack: [],
  },

  {
    title: 'HANON',
    subtitle: 'Le pianiste virtuose',

    url: 'https://rad-tartufo-7f90c1.netlify.app/',
    domain: 'rad-tartufo-7f90c1.netlify.app',

    category: 'SITE VITRINE',
    year: '2026',

    cover: hanonCover,

    description:
      'Site éditorial consacré à Hanon, le pianiste virtuose. Déployé sur Netlify.',

    stack: [],
  },

  {
    title: 'ACE SERVICE',
    subtitle: 'Application de service',

    url: 'https://ace-two-sable.vercel.app/',
    domain: 'ace-two-sable.vercel.app',

    category: 'APPLICATION WEB',
    year: '2026',

    cover: aceServiceCover,

    description:
      'Application web full-stack déployée sur Vercel. Interface et fonctions en développement.',

    stack: [],
  },
]
