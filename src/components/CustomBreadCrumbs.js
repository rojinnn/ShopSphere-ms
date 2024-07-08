import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

const CustomBreadcrumbs = ({ title, links }) => {
  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="breadcrumb-global">
        <Breadcrumbs aria-label="breadcrumb" separator=">">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{
                fontSize: "18px",
                textDecoration: "none",
                color: !link.active ? "#789867" : "#090909",
                pointerEvents: link.active ? "none" : "initial",
              }}
            >
              {link.title}/
            </Link>
          ))}
        </Breadcrumbs>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default CustomBreadcrumbs;
