export default {
  '/': [
    {
      title: 'Dashboard',
    },
  ],
  '/news': [
    {
      title: 'Notícias',
    },
  ],
  '/news/create': [
    {
      path: '/news',
      title: 'Notícias',
    },
    {
      title: 'Criação',
    },
  ],
  '/news/:id/update': [
    {
      path: '/news',
      title: 'Notícias',
    },
    {
      title: 'Atualização',
    },
  ],
  '/news/:id/details': [
    {
      path: '/news',
      title: 'Notícias',
    },
    {
      title: 'Detalhes',
    },
  ],
};
