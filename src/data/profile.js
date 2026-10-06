/* =========================================================
   PROFILE / SITE CONTENT
   → modifiez ce fichier pour personnaliser le site
========================================================= */

import portrait from '../image/njaka.jpg'
import logo from '../image/logo njaka.jpg'

export const profile = {
  name: 'Njaka Niavo',

  logo,

  logoText: 'NJAKA NIAVO',

  role: 'Étudiant en informatique',

  tagline: 'J’apprends, je crée, j’évolue.',

  intro:
    "Je suis un jeune passionné par l’informatique, animé par la curiosité et l’envie constante d’apprendre. J’aime découvrir de nouvelles technologies, relever des défis et développer progressivement mes compétences à travers des projets concrets.",

  location: 'Antananarivo',

  email: 'njakaniavo5@gmail.com',

  phone: '037-68-649-33',

  portrait,

  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'IMDb', href: 'https://imdb.com' },
  ],

  /* ---------- À PROPOS ---------- */

  about: {
    paragraphs: [
      "Je suis un passionné d'informatique, animé par une grande curiosité et une volonté constante d'apprendre.",
      "J'apprécie particulièrement l'exploration de nouvelles technologies et l'acquisition de nouvelles compétences.",
      "Persévérant et désireux de progresser continuellement, je considère chaque difficulté comme une occasion d'apprendre, de développer mes connaissances et de repousser mes limites.",
    ],

    education: [
      {
        period: '2024',
        degree: 'Licence en Informatique, Gestion, Génie Logiciel',
        school: 'Institut Supérieur Polytechnique de Madagascar',
        schoolShort: 'ISPM',
      },
      {
        period: '2024 — 2025',
        degree: 'Master I en Informatique, Gestion, Génie Logiciel',
        school: 'Institut Supérieur Polytechnique de Madagascar',
        schoolShort: 'ISPM',
      },
      {
        period: '2025 — 2026',
        degree: 'Master II en Informatique, Gestion, Génie Logiciel',
        school: 'Institut Supérieur Polytechnique de Madagascar',
        schoolShort: 'ISPM',
      },
    ],
  },

  /* ---------- CONTACT ---------- */

  availability: 'Disponible pour des tournages à partir de mars 2026',
}

/* =========================================================
   NAVIGATION
========================================================= */

export const sections = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = sections.map((section) => section.id)
