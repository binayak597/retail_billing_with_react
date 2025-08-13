import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { addItem } from "../../service/itemService";

const ItemForm = () => {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const { categories, setItems, setCategories } = useContext(AppContext);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!image) {
      toast.error("Select an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addItem(formData);

      if (response.status === 201) {
        setItems((items) => [...items, response.data]);

        setCategories((categories) => {
          return categories.map((category) => {
            
            return category.categoryId === data.categoryId
              ? { ...category, items: category.items + 1 }
              : category;
          });
        });

        toast.success("Item added successfully");

        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });

        setImage(null);
      } else {
        toast.error("Unable to add an item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add an item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt="item_img"
                      width={40}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(ev) => setImage(ev.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Item
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                    onChange={handleChange}
                    value={data.categoryId}
                    required
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    {categories &&
                      categories.map((category, idx) => (
                        <option key={idx} value={category.categoryId}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200"
                    onChange={handleChange}
                    value={data.price}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here..."
                    onChange={handleChange}
                    value={data.description}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Loading" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
