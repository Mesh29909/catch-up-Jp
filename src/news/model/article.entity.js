import {Source} from "./source.entity.js";

export class Article {
    constructor({
        title = '',
        description = '',
        url = '',
        urlToImage = '',
        source = null,
        publishedAt = '',
                    author=''
    }) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.source = source ? new Source(source) : null;
        this.publishedAt = new Date(publishedAt);
        this.author = author;
    }
    getAuthor() {
        return this.author ? this.author : this.source.name;
    }
    getFormattedPublishedAt() {
        return this.publishedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',});
    }
}