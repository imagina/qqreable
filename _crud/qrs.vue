<template>
  <master-modal
    v-model="modal.show"
    :title="modal.item.title || $tr('iqreable.cms.form.title')"
    customPosition
  >
    <div class="row">
      <div class="col-12 text-center">
        <div class="row q-pa-xs q-ma-xs">
          <div class="col-12">
            <img
              style="max-width: 200px; height: 200px; image-rendering: pixelated; display: inline-block;"
              :src="modal.item.base64"
              class="q-ma-sm"
            />
          </div>
          <div class="col-12 q-col-gutter-sm text-center q-mt-xs text-body1">
            <p>
              <b>{{ $tr('iqreable.cms.form.title')}}:</b> {{ modal.item.title}}
            </p>
            <p>
              <b>{{ $tr('iqreable.cms.form.zone')}}:</b> {{ modal.item.zone}}
            </p>
            <p>
              <b>{{ $tr('iqreable.cms.form.content')}}:</b>
            </p>
            <p>
              {{ modal.item.content}}
            </p>
          </div>
        </div>
        <q-btn
          :label="$tr('iqreable.cms.label.download')"
          @click="downloadFile(modal.item)"
          icon="fa-light fa-download"
          no-caps
          rounded
          unelevated
          color="primary"
          class="q-my-md"
          v-if="modal.item.base64"
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
        permission: 'iqreable.qrs',
        create: {
          title: this.$tr('iqreable.cms.label.new'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('iqreable.cms.form.id'),
              field: 'id',
              sortable: true,
              action: (item) => this.showModal(item)
            },
            {
              name: 'qr', label: 'QR',
              align: 'left',
              format: val => '<i class="fa-light fa-qrcode">',
              tooltip: this.$tr('iqreable.cms.label.view'),
              action: (item) => this.showModal(item)
            },
            {
              name: 'title', label: this.$tr('iqreable.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
              action: (item) => this.showModal(item)
            },
            {
              name: 'content', label: this.$tr('iqreable.cms.form.content'),
              field: 'content',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entity_type', label: this.$tr('iqreable.cms.form.entityType'),
              field: 'entity_type',
              align: 'left',
              sortable: true,
            },
            {
              name: 'entity_id', label: this.$tr('iqreable.cms.form.entityId'),
              field: 'entity_id',
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
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          actions: [
            {
              name: 'viewCode',
              icon: 'fa-light fa-qrcode',
              color: 'info',
              tooltip: this.$tr('iqreable.cms.label.view'),
              action: (item) => this.showModal(item)
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
    showModal(item){
      this.modal.item = item
      this.modal.show = true
    }
  }
}
</script>
