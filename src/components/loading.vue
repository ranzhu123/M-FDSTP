<<template>
  <section v-show="loading" class="loading-container">
    <mt-spinner type="fading-circle" :size="size"></mt-spinner>
  </section>
</template>
<script>
import eventbus from '@/module/common/EventBus';
export default {
  data () {
    return {
      loading: false,
      size: document.querySelector('html').style.fontSize.replace('px', '') * 2
    };
  },
  created () {
    eventbus.on('loading-start', () => {
      this.loading = true;
    });
    eventbus.on('loading-close', () => {
      this.loading = false;
    });
  }
};
</script>
<<style lang="scss">
  .loading-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    .mint-spinner-fading-circle {
      position: absolute;
      left: 50%;
      margin-left: -50px;
      top: 50%;
      margin-top: -50px;
    }
  }
</style>


