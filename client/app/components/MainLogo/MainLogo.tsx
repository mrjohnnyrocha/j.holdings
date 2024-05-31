import React, { forwardRef } from "react";
import Image from "next/image";

const MainLogo = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    ref={ref as React.RefObject<HTMLDivElement>}
    {...props}
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <Image src="/assets/j_logo.png" alt="J Logo" width={128} height={128} />
  </div>
));

MainLogo.displayName = "MainLogo";

export default MainLogo;
