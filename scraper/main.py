from bs4 import BeautifulSoup
import requests
import pandas as pd
import  lxml
import os
import re
import time
import random
import json
import logging
import sys
import datetime
import argparse
import traceback
import numpy as np

def get_rackets_url():
    # Get all rackets url from shopvnb.com
    # https://shopvnb.com/vot-cau-long.html
    # https://shopvnb.com/vot-cau-long.html?page=2
    # https://shopvnb.com/vot-cau-long.html?page=3
    # https://shopvnb.com/vot-cau-long.html?page=4
    # https://shopvnb.com/vot-cau-long.html?page=5
    # https://shopvnb.com/vot-cau-long.html?page=6
    # https://shopvnb.com/vot-cau-long.html?page=7
    # https://shopvnb.com/vot-cau-long.html?page=8
    # https://shopvnb.com/vot-cau-long.html?page=9
    # https://shopvnb.com/vot-cau-long.html?page=10
    html_text_rackets = requests.get('https://shopvnb.com/vot-cau-long.html').text
    soup = BeautifulSoup(html_text_rackets,'lxml')
    rackets = soup.find_all('div', class_='item_product_main')
    rackets_url_list = []
    for racket in rackets:
        url = racket.find('a').get('href')
        rackets_url_list.append(url)
    return rackets_url_list
def get_racket_info(racket_url):
    """
    Return following json object: id is no needed
        {
    "id": "uuid-6",
    "image_url": "https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-yonex-astrox-100zz-chinh-hang-1.webp",
    "product_name": "Yonex Astrox 100zz Navy",
    "brand": "YONEX",
    "price": 199.99,
    "description": "High-performance badminton racket for offensive players.",
    "status": "AVAILABLE",
    "sales": false,
    "stock": 15,
    "available_location": ["USA", "Japan", "Germany"],
    "racket": {
        "line": "Astrox",
        "stiffness": "Stiff",
        "weight": "3U - 4U",
        "balance": "Head heavy",
        "max_tension": "30 lbs",
        "length": 675.0,
        "technology": ["Rotational Generator System", "Namd"]
    }
    }
    """
    html_text_racket = requests.get('https://shopvnb.com/'+str(racket_url)).text
    soup = BeautifulSoup(html_text_racket,'lxml')
    
    image_url = soup.find('img', class_='img-responsive').get('src')
    product_name = soup.find('h1', class_='title-product bk-product-name').text
    brand = soup.find('a', class_='a-vendor').text.strip()
    price = soup.find('span', class_='price product-price').text.split()[1] #TO DO to dollar
    description = None #TO DO AI summaraize the description
    state = "AVAILABLE"  if soup.find('span', class_='a-stock ') == 'Còn hàng' else "UNAVAILABLE"
    stock = np.random.randint(24)+1 if soup.find('span', class_='a-stock').text == 'Còn hàng' else 0
    
    spec_table = soup.find('table', class_='table table-bordered')
    specs = {}
    for spec in spec_table.find_all('tr')[:-1]:
        #TO DO translate to english
        spec_name = spec.b.text.strip()
        spec_value = spec.find_all('td')[-1].text.strip()
        specs[spec_name] = spec_value
        spec_value = spec.find_all('td')[-1].text
    print(specs)
url = 'vot-cau-long-vnb-v88-xanh-chinh-hang.html'
get_racket_info(url)