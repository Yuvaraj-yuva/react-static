import React, { useEffect, useState } from "react";
import client from "../customhook/useContentful";
import Headers from "../component/Header/Header.jsx";
import Footer from "../component/Footer/Footer.jsx";
import Welcomebanner from "../component/WelcomeBannerSection/WelcomeBannerSection.jsx";
import CardSection from "../component/CardSection/CardSection.jsx";
import { useLocation } from "react-router-dom";

function Homepage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const currentPath = location.pathname;
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        console.log("slug:", currentPath);
        const entries = await client.getEntries({
          content_type: "page",
          "fields.slug": currentPath,
        });
        console.log("entires:", entries);
        if (entries.items.length > 0) {
          setPageData(entries.items[0].fields); // Set the page data
        } else {
          console.error("No content found for the given slug.");
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [currentPath]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageData) {
    return <div>Page not found</div>;
  }
  console.log("pagedata:", pageData);
  return (
    <div>
      <Headers />
      <Welcomebanner welcomedata={pageData.sections[1].fields} />
      <CardSection />
      <Footer />
    </div>
  );
}

export default Homepage;
