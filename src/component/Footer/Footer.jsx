import { useState, useEffect } from "react";
import client from "../../customhook/useContentful";
import "./Footer.css";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const fetchFooterData = async () => {
    try {
      const data = await client.getEntries({
        content_type: "footerSection",
        include: 2,
      });
      const sanitizedData = data?.items?.[0]?.fields;
      setFooterData(sanitizedData);
      //console.log(sanitizedData);
    } catch (error) {
      console.log(`Error fetching footer data: ${error}`);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  if (!footerData) {
    return <footer>Loading...</footer>;
  }

  const { copyRights, disclaimer, icons, titleAndLinks, logo } = footerData;
  const logoUrl = logo?.fields?.file?.url;

  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        {/* Logo */}
        {logoUrl && (
          <img
            src={`https:${logoUrl}`}
            alt="Footer Logo"
            className="h-16 mb-4 object-contain"
          />
        )}

        {/* Disclaimer */}
        <p className="text-center text-sm mb-4 whitespace-pre-line max-w-2xl leading-relaxed">
          {disclaimer}
        </p>

        {/* Icons */}
        <div className="flex space-x-6 mb-4">
          {icons?.map((icon, index) => (
            <a
              key={index}
              href={`https://www.${icon.fields.url}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity duration-300"
            >
              <span className="sr-only">{icon.fields.name}</span>
              <i
                className={`fab fa-${icon.fields.name.toLowerCase()} fa-2x`}
              ></i>
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center space-x-12">
          {titleAndLinks?.map((linkGroup, index) => (
            <div key={index} className="text-center">
              <h4 className="font-semibold text-lg mb-2">
                {linkGroup.fields.name}
              </h4>
              <ul className="space-y-1">
                {linkGroup.fields.stateItems?.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`/${item.fields.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:underline"
                    >
                      {item.fields.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs mt-6 text-center border-t border-gray-700 pt-4">
          {copyRights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
