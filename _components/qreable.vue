<template>
  <master-modal
      v-model="showModal"
      :title="modalTitle"
      :loading="loading"
      :actions="[{
        props : {
          label : $tr('iqreable.cms.label.download'),
          color: 'primary',
          outlined: true,
          icon : 'fa-light fa-download'
        },
        action: () => downloadFile(props)
    }]"
  >
    <div class="row q-py-md">
      <div class="col-12 text-center">
        <img
            style="max-width: 200px; height: 200px; image-rendering: pixelated; display: inline-block;"
            :src="props.base64"
            class="q-ma-sm q-mb-lg"
        />
    </div>
      <div class="col-12 q-col-gutter-sm text-left" style="word-wrap: break-word">
        <p>
          <b class="text-blue-grey">{{ $tr('iqreable.cms.form.title') }}:</b> {{ props.title }}
        </p>
        <p>
          <b class="text-blue-grey">{{ $tr('iqreable.cms.form.zone') }}:</b> {{ props.zone }}
        </p>
        <p>
          <b class="text-blue-grey">{{ $tr('iqreable.cms.form.content') }}:</b> {{ props.content }}
        </p>
      </div>
    </div>

  </master-modal>
</template>
<script>
  import helper from "@imagina/qsite/_plugins/helper";

  export default {
    props: {},
    mounted() {},
    data() {
      return {
        loading: false,
        props: {},
        showModal: false,
      }
    },
    computed:{
      modalTitle() {
        //Get Title of the page
        return this.props.title || this.$tr('iqreable.cms.form.title')
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
        const {title, zone, content, entity_type, entity_id} = contentQR;
        const verifyData = [title, zone, content].every(i => i?.length > 2)

        if(verifyData) {
          const languages = this.$store.state?.qsiteApp?.selectedLocales
          const module = this.$helper.toCapitalize(entity_type.module)
          const entity = this.$helper.toCapitalize(entity_type.entity)
          const relationEntity = `Modules\\${module}\\Entities\\${entity}`;

          const params = {
            zone,
            content,
            entity_id,
            entity_type: relationEntity
          }

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
