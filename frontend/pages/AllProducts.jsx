import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import Skeleton from "../components/Skeleton";

const AllProducts = () => {
  const categories = ["All", "Electronic", "Furniture", "Fashion", "Jewellery"];
  const sortMenu = [
    "Newest Arrivals",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const [active, setActive] = useState(categories[0]);
  const [sort, setSort] = useState(sortMenu[0]);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState(1000);
  const [filter, setFilter] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { products, setProducts } = useAuth();
  const [loading, setLoading] = useState(false);

  const productsPerPage = 6;
  const lastProductIndex = page * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let productsToRender = products.slice(firstProductIndex, lastProductIndex);
  if (filter || priceRange > 1000) {
    productsToRender = filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const result = await axiosInstance.get("/product");
        setLoading(false);
        setProducts(result.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    loadProduct();
  }, []);

  const clrFilter = () => {
    setPriceRange(1000);
    setActive(categories[0]);
    setFilteredProducts([]);
    setFilter(false);
    setPage(1);
  };

  const handleNext = () => {
    let pages = products.length / productsPerPage;
    if (filter) pages = filteredProducts.length / productsPerPage;
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSort = (productsToSort) => {
    let sortedProducts = [...productsToSort];

    if (sort == "Price: Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort == "Price: High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort == "Newest Arrivals") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return sortedProducts;
  };
  useEffect(() => {
    let filtered = products;

    // Category Filtering
    if (active.toLowerCase() !== "all") {
      filtered = filtered.filter((product) => product.category === active);
      setFilter(true);
    }

    // Price Filtering
    if (priceRange < 1000000) {
      filtered = filtered.filter((product) => product.price < priceRange);
    }

    filtered = handleSort(filtered);

    setFilteredProducts(filtered);
    setPage(1);
  }, [active, priceRange, products, sort]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/getproduct?search=${search}`
        );

        setFilteredProducts(response.data);
        setPage(1);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [search]);
  return (
    <>
      <Banner name={"Products"} />

      <div className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-12 flex flex-col md:flex-row gap-6">
        {/* Sidebar (Filters) */}
        <div className="w-full md:w-1/4 flex flex-col gap-y-5">
          {/* Categories Section */}
          <h1 className="font-bold text-lg">CATEGORIES</h1>
          <div className="flex flex-col gap-y-3 items-start w-full">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full text-left px-2 py-1 rounded transition-all ${
                  active === category
                    ? "border-l-4 border-success font-semibold "
                    : "border-l-4 border-transparent"
                }`}
                onClick={() => {
                  setActive(category);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Filter Section */}
          <div>
            <h1 className="font-bold text-lg">PRICE</h1>
            <p className="text-gray-600">₹{priceRange.toLocaleString()}</p>
            <input
              type="range"
              min={1000}
              max={1000000}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="range range-success w-full"
            />
          </div>

          {/* Clear Filters Button */}
          <button onClick={clrFilter} className="btn btn-error w-full">
            CLEAR FILTERS
          </button>
        </div>

        {/* Product Section */}
        <article className="flex-1 justify-center relative">
          <header className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b pb-2">
            {/* View Mode Buttons */}
            <div className="flex gap-2 items-center">
              <button className="p-2 rounded-md border hover:bg-gray-200 transition">
                <i className="fa-solid fa-grip"></i>
              </button>
              <button className="p-2 rounded-md border hover:bg-gray-200 transition">
                <i className="fa-solid fa-grip-lines"></i>
              </button>
              <h1>
                <span className="font-bold">
                  {filter || filteredProducts.length > 0
                    ? filteredProducts.length
                    : products.length}
                </span>
                -products found
              </h1>
            </div>
            {/* Search Bar */}
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full sm:w-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Sort By Dropdown */}
            <div className="flex gap-2 items-center">
              <p className="text-amber-50">Sort By:</p>
              <details className="dropdown">
                <summary className="btn">{sort}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow z-10">
                  <li>
                    <a onClick={() => setSort(sortMenu[1])}>
                      Price: Low to High
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSort(sortMenu[2])}>
                      Price: High to Low
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSort(sortMenu[0])}>Newest Arrivals</a>
                  </li>
                </ul>
              </details>
            </div>
          </header>
          <div className="m-1 grid grid-cols-2 gap-6">
            {loading ? (
              <Skeleton />
            ) : (
              productsToRender.map((product) => {
                return <Card key={product._id} product={product} />;
              })
            )}
          </div>
          <div className="join flex justify-center mt-5">
            <button onClick={handlePrev} className="join-item btn">
              «
            </button>
            <button className="join-item btn">Page {page}</button>
            <button onClick={handleNext} className="join-item btn">
              »
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default AllProducts;
