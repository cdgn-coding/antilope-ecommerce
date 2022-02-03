import fetch from "cross-fetch";
import faker from "@faker-js/faker";

export interface Product {
  name: string;
  price: number;
  description: string;
  sku: string;
  stock: number;
  category: string;
}

export const createProduct = (): Product => {
  const productName = faker.commerce.productName();
  return {
    name: productName,
    description: faker.commerce.productDescription(),
    category: faker.random.arrayElement([
      "WHITE",
      "BROWN",
      "GRAY",
      "SMALL_APPS",
    ]),
    sku: faker.helpers.slugify(productName),
    price: Number(faker.commerce.price()),
    stock: faker.datatype.number({ min: 0, max: 100 }),
  };
};

export const uploadProduct = async (product: Product) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(product);
  const url = `${process.env.BACKEND_API_BASE_URL}/products/${product.sku}`;
  const response = await fetch(url, { method: "PUT", headers, body });
  return response.json();
};

export const populateProducts = async (total: number) => {
  for (let i = 0; i < total; i++) {
    const product = createProduct();
    console.log(product);
    await uploadProduct(product);
  }
};
