import requests

url =   "https://shopee.vn"

re = requests.get(url)
print(re.text)
