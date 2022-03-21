from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from collections import defaultdict
import time
import json

# ################################ Extracting Links ################################################
seed_url = 'https://www.maformation.fr/formation/recherche?query=achat_logistique&typesearch=10'
course_links = defaultdict(list)

option = Options()
option.add_argument("--incognito")
option.add_argument("--disable-extensions")
browser = webdriver.Edge(options=option)
browser.get(seed_url)

time.sleep(5)

categories = browser.find_element(by=By.XPATH, value='/html/body/header/div/div/div/div/div[3]/ul/li')
categories.click()
category_items = browser.find_elements(by=By.CLASS_NAME, value='xxl-category-item')

for i in range(len(category_items)):
    print(len(category_items))
    category_text = category_items[i].find_elements(by=By.TAG_NAME, value='span')[0].text
    course_links[category_text] = []
    category_items[i].click()
    lookup_courses = browser.find_element(by=By.CLASS_NAME, value='xxl-category-detail__footer').find_element(
        by=By.TAG_NAME,
        value='span')
    lookup_courses.click()

    course_items = browser.find_elements(by=By.CLASS_NAME, value='card-training--with-link')
    for j in range(len(course_items)):
        course_items[j].click()
        course_links[category_text].append(browser.current_url)
        # When switching context we must redefine the elements otherwise they will become stale
        browser.back()
        course_items = browser.find_elements(by=By.CLASS_NAME, value='card-training--with-link')
        time.sleep(1)

    categories = browser.find_element(by=By.XPATH, value='/html/body/header/div/div/div/div/div[3]/ul/li')
    categories.click()
    category_items = browser.find_elements(by=By.CLASS_NAME, value='xxl-category-item')
    time.sleep(1)
    print(i)


# Saving the links
with open('startingevolve/startingevolve/spiders/course_links.json', 'w', encoding='utf8') as outfile:
    json.dump(course_links, outfile, ensure_ascii=False)

browser.close()
