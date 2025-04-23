from bs4 import BeautifulSoup
import requests
import re
import json
from googletrans import Translator, constants
import json
def count_nunique_fields(rackets_list):
    # Count number of appearances of each field in the list of rackets
    field_count = {}
    for racket in rackets_list:
        for field in racket["specs"].keys():
            if field in field_count:
                field_count[field] += 1
            else:
                field_count[field] = 1
    print(f"Field count: {field_count}")
def get_rackets_url(page_no):
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
    html_text_rackets = requests.get(f'https://shopvnb.com/vot-cau-long.html?page={page_no}').text
    soup = BeautifulSoup(html_text_rackets,'lxml')
    rackets = soup.find_all('div', class_='item_product_main')
    rackets_url_list = []
    for racket in rackets:
        url = racket.find('a').get('href')
        rackets_url_list.append(url)
    return rackets_url_list
def spec_value_translation(spec_value):
    # Translate using unique_value.json
    #read json file
    translated = ""
    with open('unique_value.json', 'r') as f:
        unique_value = json.load(f)
        translated = unique_value.get(spec_value)
    return translated
def translate_name_product(name):
    # given string like "Set Vợt Cầu Lông Kumpoo 99 Pro" translate it to "Kumpoo 99 Pro Badminton Racket Set"
    # capitialize first letter of each word
    name = name.title()
    translated_name = ""
    #switch case
    if "Set Vợt Cầu Lông" in name:
        translated_name = name.replace("Set Vợt Cầu Lông", "Badminton Racket Set")
    elif "Vợt Cầu Lông" in name:
        translated_name = name.replace("Vợt Cầu Lông", "Badminton Racket")
    elif "Vợt" in name:
        translated_name = name.replace("Vợt", "Badminton Racket")
    return translated_name
    return translated_name
def translate_all_json():
    #Read all rackets_page_n.json
    #Translate all value in specs
    #Write into new json file
    #change all value of ['Balance Point', 'Playing Style', 'Skill Level', 'Stiffness'] in specs

    with open(f'all_rackets.json', 'r') as f:
        rackets_list = json.load(f)
        for racket in rackets_list:
            #translate name
            racket['product_name'] = translate_name_product(racket['product_name'])
            for key in racket['specs'].keys():
                if key in ['Racket Length','Weight']:
                    continue
                racket['specs'][key] = spec_value_translation(racket['specs'][key])
        with open(f'all_rackets_translated.json', 'w') as f:
            json.dump(rackets_list, f, indent=4, ensure_ascii=False)
            

def specs_unique_value(no_page):
    #read json file
    all_value = []
    #get all value of ['Balance Point', 'Playing Style', 'Racket Length', 'Skill Level', 'Stiffness', 'Weight'] in specs
    for i in range(1,no_page+1):
        with open(f'rackets_page_{i}.json', 'r') as f:
            rackets_list = json.load(f)
            for racket in rackets_list:
                for key in racket['specs'].keys():
                    if key in ['Racket Length','Weight']:
                        continue
                    value = racket['specs'][key]
                    all_value.append(value)
    all_value = list(set(all_value))
    print(f"There is {len(all_value)} unique values")
    print("All value: {all_value}")
    #write into json file
    with open('unique_value.json', 'w') as f:
        json.dump(all_value, f, indent=4, ensure_ascii=False)

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
    #if product name has "COMBO" in it
    if "Combo" in product_name or "SET" in product_name:
        return None
    brand = soup.find('a', class_=re.compile(r'\ba-vendor\b')).text.strip()
    price = soup.find('span', class_=re.compile(r'\bprice product-price\b')).text.split()[1]
    description = None #TO DO AI summaraize the description
    state = "AVAILABLE"  if soup.find('span', class_=re.compile(r'\ba-stock\b')) == 'Còn hàng' else "UNAVAILABLE"
    stock = np.random.randint(24)+1 if soup.find('span', class_='a-stock').text == 'Còn hàng' else 0
    

    spec_table = soup.find('table', class_='table table-bordered')
    if spec_table == None:
        raise Exception("No spec table found")
    specs = {}
    CONST_SPECS = {
        'Trình Độ Chơi:': 'Skill Level',
        'Phong Cách Chơi:': 'Playing Style',
        'Độ Cứng Đũa:': 'Stiffness',
        'Điểm Cân Bằng:': 'Balance Point',
        'Trọng Lượng:': 'Weight',
        'Chiều dài vợt:': 'Racket Length'
    }
    #to do translate to english
    for spec in spec_table.find_all('tr')[:]:
        #TO DO translate to english
        spec_name = spec.b.text.strip()
        if spec_name not in CONST_SPECS.keys():
            continue
        spec_value = spec.find_all('td')[-1].text.strip()
        specs[CONST_SPECS[spec_name]] = spec_value
        spec_value = spec.find_all('td')[-1].text
    if specs.get('Racket Length') is None:
        specs['Racket Length'] = "675 mm"
    specs = dict(sorted(specs.items()))


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

def process_single_page(page_no):
    url_list = get_rackets_url(page_no)
    rackets_list = []
    for url in url_list:
        try:
           racket_info = get_racket_info(url)
           if racket_info is not None:
            rackets_list.append(racket_info)
        except Exception as e:
            print(f"Error: {e}")
            print(url)
            continue
    #find all unique key in list
    unique_keys = set()
    for racket in rackets_list:
        unique_keys.update(racket["specs"].keys())
    print(f"Unique keys in rackets_list: {unique_keys}")
    with open(f'rackets_page_{page_no}.json', 'w') as f:
        json.dump(rackets_list, f, indent=4,ensure_ascii = False)
    print(f"Total rackets: {len(rackets_list)}")
    count_nunique_fields(rackets_list)
def merge_all_json_list():
    # Merge all json files into one list
    all_rackets = []
    for i in range(1, 50):
        with open(f'rackets_page_{i}.json', 'r') as f:
            rackets_list = json.load(f)
            all_rackets.extend(rackets_list)
    with open('all_rackets.json', 'w') as f:
        json.dump(all_rackets, f, indent=4, ensure_ascii=False)
    print(f"Total rackets: {len(all_rackets)}")
def debugger(url_list):
    for url in url_list:
        print(url)
        print(get_racket_info(url))
        print(f"complete{url}")
if __name__ == "__main__":
    #bugged_urls = [ "vot-cau-long-vnb-carbon-training-150g.html", missing table]
    #debugger(bugged_urls)
    #print(spec_value_translation('Trung Bình'))
    #merge_all_json_list()
    translate_all_json()
    # for i in range(1,50):
    #     print(f"Processing page {i}")
    #     process_single_page(i)
    #get_racket_info('vot-cau-long-vnb-v200i-hong.html')