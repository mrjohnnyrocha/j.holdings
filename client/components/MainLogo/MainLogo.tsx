import React, { forwardRef } from "react";
import Image from "next/image";

const MainLogo = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref as React.RefObject<HTMLDivElement>} {...props}>
    <Image src="/assets/j_logo.png" alt="j Logo" width={13} height={54} />
  </div>
));

MainLogo.displayName = "MainLogo";
export default MainLogo;
