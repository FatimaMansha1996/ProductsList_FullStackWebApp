Instruction for how to set up and run your API locally

Clone the repository
git clone https://github.com/FatimaMansha1996/ProductsList_FullStackWebApp.git
cd ProductsList_FullStackWebApp

Install dependencies for Backend
cd backend
npm install
node index.js
you should see Product Catalog API is running on http://localhost:5000  if its running
it should be running


Install dependencies for Frontend
open a new terminal 
then
cd frontend
npm install
npm run dev
follow the browser link


Instructions for how to test it on POSTMAN

Open Postman
paste this in the URL
 http://localhost:5000/products

choose GET http://localhost:5000/products  to retreive all the products. press send
       GET http://localhost:5000/products/id  to retreive single product by id
       POST http://localhost:5000/products  and add a new item in the body by selecting body and then raw and json 
       {
  "name": "New Product",
  "price": 100,
  "category": "Example"
}
PUT http://localhost:5000/products/id  to edit the product
make sure to write the changed item in the body

DELETE http://localhost:5000/products/id  to delete the item from the list

