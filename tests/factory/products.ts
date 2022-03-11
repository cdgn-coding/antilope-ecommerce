import fetch from "cross-fetch";
import faker from "@faker-js/faker";
import FormData from "form-data";
import { getItem, searchItems, MercadoLibreItem } from "./mercadolibre";

export interface Product {
  name: string;
  price: number;
  description: string;
  sku: string;
  stock: number;
  category: string;
}

export const createImage = async (url: string): Promise<Response> => {
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

export const uploadImages = async ({
  product,
  mercadoLibreItem,
}: {
  product: Product;
  mercadoLibreItem: MercadoLibreItem;
}) => {
  for (let picture of mercadoLibreItem.pictures) {
    const pictureContent = await createImage(picture.url);
    await uploadImage(product.sku, pictureContent);
  }
};

export const createProduct = async ({
  mercadoLibreItem,
  category,
}: {
  mercadoLibreItem: MercadoLibreItem;
  category: string;
}): Promise<Product> => {
  const productName = mercadoLibreItem.title;
  const sku = faker.helpers.slugify(productName);
  return {
    name: productName,
    description: mercadoLibreItem.description.plain_text,
    category,
    sku: sku,
    price: mercadoLibreItem.price,
    stock: mercadoLibreItem.available_quantity,
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

const scrapePlans = [
  {
    category: "WHITE",
    terms: ["lavarropas", "secarropas", "heladeras"],
    limitEach: 10,
  },
  {
    category: "BROWN",
    terms: ["televisor", "parlantes", "home theater"],
    limitEach: 10,
  },
  {
    category: "GRAY",
    terms: ["celulares", "notebook", "tablet"],
    limitEach: 10,
  },
  {
    category: "SMALL_APPS",
    terms: ["plancha", "aspiradora", "ventilador"],
    limitEach: 4,
  },
];

export const populateProducts = async (total: number) => {
  for (let plan of scrapePlans) {
    const { category, terms, limitEach } = plan;
    for (let term of terms) {
      const searchResponse = await searchItems(term, limitEach);
      const items = await Promise.all(
        searchResponse.map((result) => getItem(result.id))
      );
      for (let item of items) {
        const product = await createProduct({
          mercadoLibreItem: item,
          category,
        });
        await uploadProduct(product);
        await uploadImages({ product, mercadoLibreItem: item });
      }
    }
  }
};
