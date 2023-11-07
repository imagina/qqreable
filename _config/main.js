export default {
  moduleName: 'qqreable',
  //Entities
  entityNames: {
    qrs: 'qrs',    
  },
  //Quick Cards
  quickCards: [
    {
      active: true,
      permission: 'iblog.posts.manage',
      component: () => import('@imagina/qblog/_components/quick-cards/lastPosts')
    }
  ]
}
