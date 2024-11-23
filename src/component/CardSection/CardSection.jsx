import client from "../../customhook/useContentful";
import { useEffect, useState } from "react";
import "./CardSection.css";
const CardSection = () => {
  const [viewdata, setdata] = useState(null);

  const fetchData = async () => {
    try {
      const data = await client.getEntries({
        content_type: "brandSection",
        include: 2,
      });
      const sanitizedData = data?.items?.[0]?.fields;
      setdata(sanitizedData);
      //console.log(sanitizedData);
    } catch (error) {
      console.log(`Error fetching footer data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (!viewdata) {
    return <div>Loading...</div>;
  }
  const { title, description, productReference } = viewdata;
  //const logoUrl = productReference?.fields?.image?.fields?.file?.url;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="product-cards">
        {productReference?.map((product, index) => {
          const { productTitle, slug, description, image } = product.fields;
          const imageUrl = `https:${image?.fields?.file?.url}`;

          return (
            <div key={index} className="product-card">
              <h2>{productTitle}</h2>
              <p>{description}</p>
              {imageUrl && <img src={imageUrl} alt={productTitle} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;
