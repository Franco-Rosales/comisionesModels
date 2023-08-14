const navigation = () => [
  {
    title: 'Importar',
    path: '/importar',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Historial de Cobranzas',
    path: '/cobranza',
    icon: 'tabler:users',
  },
  {
    title: 'Producto',
    path: '/producto',
    icon: 'tabler:users',
  },
  {
    title: 'Servicio',
    path: '/servicio',
    icon: 'tabler:file-report',
  },
  {
    title: 'Parametros',
    path: '/parametros',
    icon: 'tabler:file-dollar',
    children: [
      {
        title: 'Porcentaje a aplicar',
        path: '/apps/roles'
      },
      {
        title: 'Rentabilidad objetivo',
        path: '/apps/permissions'
      }
    ]
  }
]

export default navigation
