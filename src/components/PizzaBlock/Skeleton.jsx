import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="318" rx="10" ry="10" width="280" height="77" />
    <rect x="0" y="409" rx="10" ry="10" width="100" height="35" />
    <rect x="122" y="405" rx="20" ry="20" width="156" height="45" />
  </ContentLoader>
);

export default Skeleton;
