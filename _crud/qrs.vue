<template>
  <qreable ref="qreableComponent" />
</template>
<script>
import qreable from "modules/qqreable/_components/qreable.vue"

export default {
  components: {qreable},
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
        permission: 'iqreable.qrs',
        create: {
          title: this.$tr('iqreable.cms.label.new'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('iqreable.cms.form.id'),
              field: 'id',
              sortable: true
            },
            {
              name: 'qr', label: 'QR',
              align: 'left',
              format: val => '<i class="fa-light fa-qrcode" style="font-size: 20px">',
              tooltip: this.$tr('iqreable.cms.label.view'),
              action: (item) => this.$refs.qreableComponent.show(item)
            },
            {
              name: 'title', label: this.$tr('iqreable.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true
            },
            {
              name: 'content', label: this.$tr('iqreable.cms.form.content'),
              field: 'content',
              align: 'left',
              sortable: true,
            },
            {
              name: 'zone', label: this.$tr('iqreable.cms.form.zone'),
              field: 'zone',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entityType', label: this.$tr('iqreable.cms.form.entityType'),
              field: 'entityType',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entityId', label: this.$tr('iqreable.cms.form.entityId'),
              field: 'entityId',
              align: 'left',
              sortable: true,
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ]
        },
        update: {
          title: this.$tr('iqreable.cms.label.update'),
          customFormProps: {
            zone: {
              props: {
                readonly: true
              }
            },
            entityType: {
              props: {
                readonly: true
              }
            },
            entityId: {
              props: {
                readonly: true
              }
            }
          }
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          banner: {
            type: 'banner',
            props: {
              color: 'info',
              icon: 'fas fa-exclamation-triangle',
              message: `${this.$tr('iqreable.cms.form.bannerInfo')}`
            }
          },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('iqreable.cms.form.title')}*`,
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
              label: `${this.$tr('iqreable.cms.form.content')}*`,
            },
          },
          zone: {
            value: 'mainqr',
            type: 'input',
            isTranslatable: false,
            props: {
              label: `${this.$tr('iqreable.cms.form.zone')}*`,
              rules: [
                val => !!val || this.$tr('iqreable.cms.message.fieldRequired')
              ],
            },
          },
          entityType: {
            value: '',
            type: 'input',
            isTranslatable: false,
            props: {
              label: this.$tr('iqreable.cms.form.entityType')
            },
          },
          entityId: {
            value: '',
            type: 'input',
            isTranslatable: false,
            props: {
              label: this.$tr('iqreable.cms.form.entityId'),
            },
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods: {}
}
</script>
