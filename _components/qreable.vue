<template>
  <master-modal
      v-model="showModal"
      :title="modalTitle"
      :loading="loading"
      :actions="masterActions"
  >
    <div class="row">
      <!--Title-->
      <div class="col-12 text-center q-mb-md">
        <h5 class="text-h5 text-bold">{{ $tr('iqreable.cms.label.openMobile') }}</h5>
      </div>

      <div class="col-12 text-center">
        <img
            style="max-width: 200px; height: 200px; image-rendering: pixelated; display: inline-block;"
            :src="props.base64"
            class="q-ma-sm q-mb-lg"
        />
      </div>

      <!--description-->
      <div class="col-12 text-center q-mb-md">
        <p class="text-bold">{{ $tr('iqreable.cms.label.scanQrCodeWithCamera') }}</p>
      </div>

      <div class="col-12 text-center">
        <q-btn
            :label="$trp('iqreable.cms.label.openNewTab')"
            @click="$helper.openExternalURL(this.props.content, true)"
            unelevated
            rounded
            no-caps
            outline
            color="blue-grey"
        />
      </div>

      <div class="col-12 q-mt-md">
        <dynamic-field :field="dinamycConfig"/>
      </div>

    </div>

  </master-modal>
</template>
<script>
  export default {
    props: {},
    mounted() {},
    data() {
      return {
        loading: false,
        props: {},
        showModal: false,
        masterActions: [
          {
            props : {
              label : `${this.$tr('isite.cms.label.copy')} QR`,
              color: 'primary',
              outlined: true,
              icon : 'fa-light fa-copy'
            },
            action: () => this.$helper.copyBase64ToClipboard(this.props.base64)
          },
          {
            props: {
              label: this.$tr('isite.cms.label.download'),
              color: 'primary',
              outlined: true,
              icon: 'fa-light fa-download'
            },
            action: () => this.downloadFile(this.props)
          },
        ],
      }
    },
    computed:{
      modalTitle() {
        //Get Title of the page
        return this.props.title || this.$tr('iqreable.cms.form.title')
      },
      dinamycConfig() {
        return {
          value: this.props.content,
          type: 'copy',
          props: {
            label: this.$trp('isite.cms.label.copy')
          }
        }
      },
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
      //Show modal
      show(qr) {
        this.props = qr
        this.showModal = true
      },

      //Generate new QR
      generate(contentQR) {
        //Get content of QR
        const {title, zone, content} = contentQR;
        // Verify if the length is major than 2
        const verifyData = [title, zone, content].every(i => i?.length > 2)

        if(verifyData) {
          // Get all languages of the app
          const languages = this.$store.state?.qsiteApp?.selectedLocales
          const params = contentQR

          //Set all languages with the same title
          for (const lang of languages) {
            params[lang] = {
              title
            }
          }

          this.$crud.create('apiRoutes.qqreable.qrs', params)
              .then(response => {
                this.$emit('created')
                this.$alert.info({message: this.$tr('isite.cms.message.recordCreated') })
              })
              .catch(error => {
                this.$emit('created')
                this.$alert.error({message: this.$tr('isite.cms.message.recordNoCreated') })
              })
        }
        else {
          this.$emit('created')
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoCreated') })
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>
