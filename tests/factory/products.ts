import fetch from "cross-fetch";
import faker from "@faker-js/faker";
import FormData from "form-data";

export interface Product {
  name: string;
  price: number;
  description: string;
  sku: string;
  stock: number;
  category: string;
}

export const createImage = async (): Promise<Response> => {
  const url = faker.image.lorempicsum.imageRandomSeeded();
  const response = await fetch(url);
  return await response;
};

export const uploadImage = async (productSku: string, image: Response) => {
  const formData = new FormData();
  formData.append("image", image.body, {
    contentType: "image/jpeg",
    filename: "imageFileName.jpg",
  });

  const url = `${process.env.BACKEND_API_BASE_URL}/products/${productSku}/images`;

  await new Promise((resolve, reject) => {
    formData.submit(url, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

export const uploadImages = async (product: Product) => {
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 4 }); i++) {
    const image = await createImage();
    await uploadImage(product.sku, image);
  }
};

export const createProduct = (): Product => {
  const productName = faker.commerce.productName();
  const sku = faker.helpers.slugify(productName);
  return {
    name: productName,
    description: faker.commerce.productDescription(),
    category: faker.random.arrayElement([
      "WHITE",
      "BROWN",
      "GRAY",
      "SMALL_APPS",
    ]),
    sku: sku,
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
    await uploadProduct(product);
    await uploadImages(product);
  }
};
