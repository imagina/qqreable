<template>
  <master-modal
    v-model="modal.show"
    :title="modal.item.title"
    width="600px"
  >
    <div class="row">
      <div class="col-12 text-center">
        <q-card class="row q-pa-md q-ma-sm">
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
      },
      bannerMsg: '<p>Los prefijos facilitan la definición del tipo de contenido que contiene cada código QR.  Aquí hay ejemplos comunes que puedes usar al ingresar tu contenido: <br><br><li>Dirección web:  ingresa <b>http://</b> o <b>https://</b> seguido de la direccion web. Ejemplo: <b>https://www.imaginacolombia.com/</b></li><li>Correo electrónico:  ingresa "<b>mailto:</b>" seguido de la direccion de correo.  Ejemplo: <b>mailto:support@imaginacolombia.com</b></li><li>Número de teléfono: Ingresa "<b>tel:</b>" seguido del numero telefonico.  Ejemplo: <b>tel:555-555-5555</b></li><li>Mensaje de texto (SMS) con mensaje y número predefinidos:   Utiliza "<b>sms:</b>"  Combina número "<b>:</b>" mensaje.   Ejemplo: <b>sms:555-555-5555:yo soy el mensaje</b></li><li>Ubicacion geográfica: Utiliza "<b>geo:</b>".  Ejemplo: <b>geo:-78.400364,-85.916993</b></li><li>Tarjeta MeCard: Emplea "<b>mecard:</b>".  Ejemplo: <b>MECARD:Simple, Software;Some Address, Somewhere, 20430;TEL:555-555-5555;EMAIL:support@imaginacolombia.com</b></li>'
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
              action: (item) => this.showModal(item)
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
              action: (item) => this.showModal(item)
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
              action: (item) => this.showModal(item)
            }
          ]
        },
        update: false,
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
          banner: {
            type: 'banner',
            props: {
              color: 'info',
              icon: 'fas fa-exclamation-triangle',
              message: this.bannerMsg,
            }
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
    showModal(item){
      this.modal.item = item
      this.modal.show = true
    }
  }
}
</script>
