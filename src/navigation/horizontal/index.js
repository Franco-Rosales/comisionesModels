const navigation = () => [
  {
    title: 'Importar',
    path: '/importar',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Servicios',
    path: '/servicios',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Parametros',
    path: '/parametros',
    icon: 'tabler:mail',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'tabler:shield',
  }
]

export default navigation
