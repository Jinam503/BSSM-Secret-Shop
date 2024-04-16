import axios from "axios";
import Toast, { notify } from "../components/Toast";

export const useProductPage = (setItems, products, setProducts) => {
  const fetchProducts = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_SERVER_URL + "api/products")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
      notify({
        type: "error",
        text: "제품 정보를 가져오는데 실패했습니다.",
      });
    }
  };

  const AddProductToCart = (item) => {
    const index = products.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      const updatedProducts = [...products];
      if (updatedProducts[index].amount < updatedProducts[index].maxStock) {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
        notify({
          type: "success",
          text: "장바구니에 " + item.name + "를 추가했습니다.",
        });
      } else
        notify({
          type: "error",
          text: "재고가 부족합니다.",
        });
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        checked: true,
        category: item.category,
        description: item.description,
        url: item.imageUrl,
        price: item.price,
        amount: 1,
        maxStock: item.stock,
      };
      setProducts([...products, newItem]);
      notify({
        type: "success",
        text: "장바구니에 " + item.name + "를 추가했습니다.",
      });
    }
  };

  return {
    fetchProducts,
    AddProductToCart,
    Toast,
  };
};
