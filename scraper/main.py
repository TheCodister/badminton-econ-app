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
import json

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
    
    image_url = soup.find('img', class_=re.compile(r'\bimg-responsive\b')).get('src')
    product_name = soup.find('h1', class_=re.compile(r'\btitle-product\b')).text
    brand = soup.find('a', class_=re.compile(r'\ba-vendor\b')).text.strip()
    price = soup.find('span', class_=re.compile(r'\bprice product-price\b')).text.split()[1]
    description = None #TO DO AI summaraize the description
    state = "AVAILABLE"  if soup.find('span', class_=re.compile(r'\ba-stock\b')) == 'Còn hàng' else "UNAVAILABLE"
    stock = np.random.randint(24)+1 if soup.find('span', class_='a-stock').text == 'Còn hàng' else 0
    
    spec_table = soup.find('table', class_='table table-bordered')
    specs = {}
    print("break_point_1")
    for spec in spec_table.find_all('tr')[:-1]:
        #TO DO translate to english
        spec_name = spec.b.text.strip()
        spec_value = spec.find_all('td')[-1].text.strip()
        specs[spec_name] = spec_value
        spec_value = spec.find_all('td')[-1].text
    #print(specs)
    racket_info = {
        "image_url": image_url,
        "product_name": product_name,
        "brand": brand,
        "price": price, 
        "description": description,
        "status": state,
        "sales": False,  # Assuming no sales information is available
        "stock": stock,
        "specs" : specs
    }
    return racket_info

def process_single_page():
    url_list = get_rackets_url()
    rackets_list = []
    for url in url_list:
        try:
           rackets_list.append(get_racket_info(url))
        except Exception as e:
            print(f"Error: {e}")
            print(url)
            continue
    #find all unique key in list
    unique_keys = set()
    for racket in rackets_list:
        unique_keys.update(racket["specs"].keys())
    print(f"Unique keys in rackets_list: {unique_keys}")
    # with open('rackets.json', 'w') as f:
    #     json.dump(rackets_list, f, indent=4)
    # print(f"Total rackets: {len(rackets_list)}")
def debugger(url_list):
    for url in url_list:
        print(url)
        print(get_racket_info(url))
        print(f"complete{url}")
if __name__ == "__main__":
    bugged_urls = [ "vot-cau-long-vnb-carbon-training-150g.html", missing table]
    debugger(bugged_urls)
    #process_single_page()