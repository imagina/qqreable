<template>
  <master-modal
    v-model="modal.show"
    :title="modal.item.title"
    width="600px"
  >
    <div class="row">
      <div class="col-12 text-center">
        <q-card class="row q-pa-md">
          <div class="col-5">
            <div style="width: 160px; height: 160px">
              <avatar-image
                size="160px"
                :src="modal.item.base64"
                style="image-rendering: pixelated;"
              />
            </div>
          </div>
          <div class="col-7">
            <p class="text-left">
              {{ modal.item.content}}
            </p>
          </div>
        </q-card>
        <q-btn
          :label="$tr('isite.cms.label.download')"
          @click="downloadFile(modal.item)"
          icon="fa-light fa-download"
          no-caps
          rounded
          color="primary"
          class="q-my-md"
        />
      </div>
    </div>
  </master-modal>
</template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
      modal: {
        show: false,
        item: false
      }
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
              action: (item) => {
                this.modal.item = item
                this.modal.show = true
              }
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
              action: (item) => {
                this.modal.item = item
                this.modal.show = true
              }
            },
            {
              name: 'content', label: this.$tr('isite.cms.form.content'),
              field: 'content',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entity_type', label: this.$tr('isite.cms.form.entity_type'),
              field: 'entity_type',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entity_id', label: this.$tr('isite.cms.form.entity_id'),
              field: 'entity_id',
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
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          actions: [
            {
              name: 'viewCode',
              icon: 'fas fa-eye',
              color: 'info',
              tooltip: this.$tr('isite.cms.label.view'),
              action: (item) => {
                this.modal.item = item
                this.modal.show = true
              }
            }
          ]
        },
        update: false,
        delete: true,
        formLeft: {          
          id: {value: ''},
          banner: {
          type: 'banner',
          props: {
            color: 'info',
            icon: 'fas fa-exclamation-triangle',
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aperiam cupiditate deleniti dolore, dolores explicabo, impedit labore molestiae optio pariatur placeat quis similique soluta unde? Expedita nesciunt obcaecati quia!",
            actions: [
              {
                props: {
                  label: this.$tr('isite.cms.label.home')
                },
                action: () => {
                  this.$helper.openExternalURL(this.$store.state.qsiteApp.baseUrl, true)
                }
              }
            ]
          }
        },
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
          content: {
            value: '',
            type: 'input',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.content')}*`,
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
              vIf: false,
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
  methods: {
    downloadFile(file) {
      const fileUrl = file.base64;
      const fileName = file.title;
      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.download = fileName;
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        document.body.removeChild(downloadLink);
      }, 100);
    },
  }
}
</script>
