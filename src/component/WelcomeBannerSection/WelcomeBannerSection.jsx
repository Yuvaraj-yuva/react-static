import client from "../../customhook/useContentful";
import { useEffect, useState } from "react";
import "./WelcomeBannerSection.css";

const Welcomebanner = ({ welcomedata }) => {
  // const [welcomedata, setdata] = useState(null);

  // const fetchWelcomeData = async () => {
  //   try {
  //     const data = await client.getEntries({
  //       content_type: "home",
  //       include: 2,
  //     });
  //     const sanitizedData = data?.items?.[0]?.fields;
  //     setdata(sanitizedData);
  //     //console.log(sanitizedData);
  //   } catch (error) {
  //     console.log(`Error fetching footer data: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   fetchWelcomeData();
  // }, []);
  if (!welcomedata) {
    return <div>Loading...</div>;
  }
  const { description, hometitle, image } = welcomedata;
  const logoUrl = `https:${image?.[0]?.fields?.file?.url}`;

  return (
    <div className="welcome-section">
      {/* Left side: Title and Description */}
      <div className="welcome-content">
        <h1>{hometitle}</h1>
        <p>{description}</p>
      </div>

      {/* Right side: Image */}
      <div className="welcome-image">
        <img src={logoUrl} alt="homepage food image" />
      </div>
    </div>
  );
};
export default Welcomebanner;
