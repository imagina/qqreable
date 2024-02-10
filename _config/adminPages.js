export default {
  qrs: {
    permission: 'iqreable.qrs.manage',
    activated: true,
    authenticated: true,
    path: '/qreable/qrs',
    name: 'iqreable.qrs',
    crud : import('modules/qqreable/_crud/qrs'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'qrs',
    icon: 'fa-light fa-qrcode',
    subHeader: {
      refresh: true,
    }
  }
}
