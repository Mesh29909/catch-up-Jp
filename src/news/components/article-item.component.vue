<script>
import {Article} from "../model/article.entity.js";

export default {
  name: "article-item",
  emits: ['show-tooltip'],
  props: { article: { type: Article, required: true }},
  methods: {
    async shareArticle() {
      const articleInfo = { title: this.article.title, url: this.article.url};
      if(navigator.share) {
        try {
          await navigator.share(articleInfo);
          console.log('Article shared successfully');
        } catch (error) {
          console.error('Error sharing article:', error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(this.article.url);
          this.$emit('show-tooltip', this.article.url);
        } catch (error) {
          console.error('Error copying article URL:', error);
        }
      }
    }
  }
}
</script>

<template>
  <pv-card class="m-2">
    <template #header>
      <img :alt="article.title" :src="article.urlToImage" class="image-fit"/>
    </template>
    <template #title>
      <p>{{ article.title }}</p>
    </template>
    <template #subtitle>
      <p class="flex align-content-start flex-wrap">
        <span class="flex align-items-center justify-content-center mr-2">
          <pv-avatar :aria-label="article.source.name"
                     :image="article.source.urlToLogo"
                     shape="circle"/>
        </span>
        <span class="flex align-items-center justify-content-center">
          {{ article.source.name }}
        </span>
      </p>
      <p class="flex align-content-start flex-wrap">
        <span class="text-sm">{{article.getAuthor()}} on {{ article.getFormattedPublishedAt() }} </span>
      </p>
    </template>
    <template #content>
      <p class="flex align-content-start flex-wrap mt-4">
        {{ article.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content --webkit-box-sizing: border-box; justify-content: space-between;">
        <a :href="article.url" target="_blank">{{ $t('read-more')}}</a>
        <span class="p-spacer"></span>
        <pv-button
          :label="$t('article.share')"
          icon="pi pi-share-alt"
          class="p-button-text p-button-sm"
          @click="shareArticle()"
          aria-label="Share article"
          pv-tooltip="$t('article.copy-to-clipboard')"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
  .p-button-sm {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
  .p-spacer {
    flex: 1 1 auto;
  }
  .image-fit {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>