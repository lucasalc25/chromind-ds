import { useEffect, useState } from "react";

const BP = { sm: 480, md: 768, lg: 1024, xl: 1280 };

export function useBreakpoints() {
  const [w, setW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : BP.xl
  );

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const lt = (n: number) => w < n;
  const gte = (n: number) => w >= n;

  return {
    width: w,
    isMobile: lt(BP.md),
    isTablet: w >= BP.md && lt(BP.lg),
    isDesktop: gte(BP.lg),
    // atalhos úteis
    ltSm: lt(BP.sm),
    ltMd: lt(BP.md),
    ltLg: lt(BP.lg),
    ltXl: lt(BP.xl),
    gteSm: gte(BP.sm),
    gteMd: gte(BP.md),
    gteLg: gte(BP.lg),
    gteXl: gte(BP.xl),
    BP,
  };
}
