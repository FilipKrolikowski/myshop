import { useState, useRef } from "react";
import { Product, Pagination } from "../components";
import { ProductProps } from "../types";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/features/productsSlice";
import "../styles/home.scss";
const Home = () => {
  const productsData = useSelector(selectProducts);
  const [itemsCurrentPage, setItemsCurrentPage] = useState(1);
  const limit = 10;
  const itemsPageCount = Math.ceil(productsData.items.length / limit);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPaginatedItems = (items: ProductProps[]) => {
    if (items.length < limit) {
      return items;
    } else {
      return items.slice((itemsCurrentPage - 1) * limit, (itemsCurrentPage - 1) * limit + limit);
    }
  };

  const handleUpdatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setItemsCurrentPage(value);
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="items-container" ref={containerRef}>
        {getPaginatedItems(productsData.items).map((item: ProductProps) => (
          <Product item={item} key={`product-${item.id}`} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination totalPages={itemsPageCount} page={itemsCurrentPage} onChange={handleUpdatePage} />
      </div>
    </div>
  );
};

export default Home;
