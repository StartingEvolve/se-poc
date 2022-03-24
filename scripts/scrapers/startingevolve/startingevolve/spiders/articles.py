import json
import re

import scrapy


class ArticlesSpider(scrapy.Spider):
    name = 'articles'

    # start_urls = ['https://www.maformation.fr/actualites/formation-continue',
    #               'https://www.maformation.fr/actualites/formation-continue/2',
    #               'https://www.maformation.fr/actualites/formation-continue/3']

    def start_requests(self):
        with open('article_links.json', 'r', encoding='utf8') as articles_json:
            article_urls = json.load(articles_json)
            for url in article_urls:
                yield scrapy.Request(url=url, callback=self.parse)

    # Getting article data
    def parse(self, response):
        yield {
            'title': response.css('.article-detail__title-main::text').get().strip(),
            'description': response.css('div.article-detail__body .content-block__inner .content-block__content p::text').get().strip(),
            'content': re.sub('<a[^>]+formation.*?>*</a>|<img[^>]+formation.*?>', '',
                              response.css('.article-detail__body').get()),
            'editor': response.css('div.list-metas__inner .meta span span::text').getall()[1].strip().replace(
                "MaFormation", "StartingEvolve"),
            'createdAt': response.css('div.list-metas__inner .meta span span::text').getall()[0].strip()
        }

    # Getting article links
    # def parse(self, response):
    #     domain = 'https://www.maformation.fr'
    #     yield {'articles': [domain + article for article in
    #                         response.css('article.article-cat figure a::attr(href)').getall()]}
