export const isMobile = () => window.innerWidth <= 768;

export const mobileOptimizations = {
  reduceData: (data) => isMobile() ? data.slice(0, 3) : data,
  showLessColumns: (columns) => isMobile() ? columns.slice(0, 3) : columns
};