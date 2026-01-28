Instruction for how to set up and run your API locally

1) Clone the repository
2) git clone https://github.com/FatimaMansha1996/ProductsList_FullStackWebApp.git
3) cd ProductsList_FullStackWebApp





Install dependencies for Backend
1)cd backend
2)npm install
3)node index.js
4)you should see Product Catalog API is running on http://localhost:5000  if its running
it should be running



Install dependencies for Frontend
1)open a new terminal 
2)cd frontend
3)npm install
4)npm run dev
5)follow the browser link






Instructions for how to test it on POSTMAN

1)Open Postman
2)paste this in the URL  http://localhost:5000/products

3)choose GET http://localhost:5000/products  to retreive all the products. press send
     4)  GET http://localhost:5000/products/id  to retreive single product by id
    5)   POST http://localhost:5000/products  and add a new item in the body by selecting body and then raw and json 
       {
  "name": "New Product",
  "price": 100,
  "category": "Example"
}


6)PUT http://localhost:5000/products/id  to edit the product. make sure to write the changed item in the body

7) DELETE http://localhost:5000/products/id  to delete the item from the list

