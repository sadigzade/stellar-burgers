import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={640}
    height={375}
    viewBox="0 0 640 375"
    backgroundColor="#1C1C21"
    foregroundColor="#8585AD"
    {...props}>
    <circle cx="320" cy="120" r="75" />
    <rect x="60" y="256" rx="8" ry="8" width="520" height="30" />
    <rect x="60" y="318" rx="8" ry="8" width="114" height="56" />
    <rect x="194" y="318" rx="8" ry="8" width="114" height="56" />
    <rect x="328" y="318" rx="8" ry="8" width="114" height="56" />
    <rect x="462" y="318" rx="8" ry="8" width="114" height="56" />
  </ContentLoader>
);

export default Skeleton;
