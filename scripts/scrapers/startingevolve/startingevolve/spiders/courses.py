import scrapy
import json


class CoursesSpider(scrapy.Spider):
    name = 'courses'

    def start_requests(self):
        self.success_rate = ''
        self.category = None
        with open('course_links.json', 'r', encoding='utf8') as courses_json:
            course_urls = json.load(courses_json)
            i = 0
            for category, urls in course_urls.items():
                self.category = category
                i += 1
                for url in urls:
                    yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        self.eligibility = []
        if response.css("div.index-formation__modalities-primary__price-wrapper").xpath("./div[contains(., 'Finançable CPF')]/div/text()").get() != None :
            self.eligibility.append('Éligible CPF')
        if response.xpath("//div[contains(., 'VAE')]").get() != None:
            self.eligibility.append('Éligible VAE')
        if response.xpath("//span[contains(., 'Taux de réussite')]/../../../div[2]/text()").get() != None:
            self.success_rate = response.xpath("//span[contains(., 'Taux de réussite')]/../../../div[2]/text()").get().strip()

        yield {
            'title': response.css('span.index-formation__header__title::text').get().strip(),
            'goals': response.css('div#objectifs').get().strip(),
            'prerequisites': response.xpath("//span[contains(., 'Pré-requis')]/../../../div[2]").get(),
            'program': response.css('div#programme').get().strip(),
            'category': self.category,
            'certifications': [dict(image=image) for image in response.css('div.list-certification__inner figure img::attr(src)').getall()],
            'overview': dict(public_admitted=[public for public in response.css('li.accepted *::text').getall() if public.strip()],
                             price=dict(value=response.css('div.index-formation__modalities-primary__price::text').get().strip()),
                             eligibility=self.eligibility,
                             location=dict(address=response.css('div.index-formation__locations__item ul li *::text').getall()),
                             duration=response.xpath('//div[contains(@data-cy, "duration")]/text()').get().strip(),
                             learning_mode=[mode for mode in response.xpath("//span[contains(., 'Type d’enseignement')]/../../../div[2]/ul").css(' *::text').getall() if mode.strip()],
                             success_rate=self.success_rate),
            'organisation': dict(name=response.css("div#informations-centre .index-formation__content-block__header__title::text").get().strip(),
                                 image=response.css("div#informations-centre .index-formation__content-block__logo img::attr(src)").get(),
                                 description=response.css("div#informations-centre .index-formation__content-block__body").get())
        }

