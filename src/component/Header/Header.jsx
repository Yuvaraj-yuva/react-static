import { useState, useEffect } from "react";
import client from "../../customhook/useContentful";
import "./Header.css";

const Header = () => {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "headerSection",
        });

        //console.log("API Response:", response);
        setEntries(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!entries) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  const item = entries?.items?.length > 0 ? entries.items[0].fields : null;
  //console.log("Item Data:", item); // Log item to inspect the fetched fields

  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <img src={item.logo.fields.file.url} alt="Logo" />
        </div>
        <nav className="nav-menu">
          {item.subMenuLinks.map((link, index) => (
            <a key={index} href={link.fields.url}>
              {link.fields.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
