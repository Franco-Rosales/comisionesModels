const navigation = () => {
  return [
    {
      title: 'Importar',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Historial de Cobranzas',
      path: '/acl',
      icon: 'tabler:users',
    },
    {
      title: 'Producto',
      path: '/second-page',
      icon: 'tabler:users',
    },
    {
      title: 'Servicio',
      path: '/misc/coming-soon',
      icon: 'tabler:file-report',
    },
    {
      title: 'Parametros',
      path: '/misc/coming-soon',
      icon: 'tabler:file-dollar',
      children: [
        {
          title: 'Porcentaje a aplicar',
          path: '/misc/coming-soon',
        },
        {
          title: 'Rentabilidad objetivo',
          path: '/misc/coming-soon',
        }
      ]
    }

  ]
}

export default navigation
