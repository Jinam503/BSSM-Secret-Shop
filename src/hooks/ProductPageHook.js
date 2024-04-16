import axios from "axios";

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
    }
  };

  const AddProductToCart = (item) => {
    const index = products.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      const updatedProducts = [...products];
      if (updatedProducts[index].amount < updatedProducts[index].maxStock) {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
      } else alert("재고 부족");
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
    }
    alert("장바구니에 " + item.name + " 추가");
  };

  return {
    fetchProducts,
    AddProductToCart,
  };
};
