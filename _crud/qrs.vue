<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qqreable.entityNames.qrs"),
        apiRoute: 'apiRoutes.qqreable.qrs',
        permission: 'iblog.posts',
        create: {
          title: this.$tr('iqreable.cms.newQrCode'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'),
              field: 'id',
              sortable: true,
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
            },
            {
              name: 'zone', label: this.$tr('isite.cms.form.zone'),
              field: 'zone',
              align: 'left',
              sortable: true,
            },
            {
              name: 'content', label: this.$tr('isite.cms.form.content'),
              field: 'content',
              align: 'left',
              sortable: true,
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
        },
        update: {
          title: this.$tr('iqreable.cms.updatePost'),
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          zone: {
            value: 'mainqr',
            type: 'input',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.zone')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          content: {
            value: '',
            type: 'input',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.content')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
