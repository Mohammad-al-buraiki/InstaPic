// import { useTranslation } from "react-i18next";

// export const timeAgo = timestamp => {
//   const { t } = useTranslation();
//   const now = Date.now();
//   const secondsAgo = Math.floor((now - timestamp) / 1000);

//   if (secondsAgo < 60) {
//     return `${secondsAgo}s ago`;
//   } else if (secondsAgo < 3600) {
//     const minutesAgo = Math.floor(secondsAgo / 60);
//     return `${minutesAgo}m ago`;
//   } else if (secondsAgo < 86400) {
//     const hoursAgo = Math.floor(secondsAgo / 3600);
//     return `${hoursAgo}h ago`;
//   } else if (secondsAgo < 604800) {
//     const daysAgo = Math.floor(secondsAgo / 86400);
//     return `${daysAgo}d ago`;
//   } else {
//     const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
//     return `${weeksAgo}w ago`;
//   }
// };

// Refactored to accept `t` as an argument
export const timeAgo = (timestamp, t) => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 60) {
    return t('time.secondsAgo', { count: secondsAgo }); // Use translation for seconds
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return t('time.minutesAgo', { count: minutesAgo }); // Use translation for minutes
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return t('time.hoursAgo', { count: hoursAgo }); // Use translation for hours
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return t('time.daysAgo', { count: daysAgo }); // Use translation for days
  } else {
    const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
    return t('time.weeksAgo', { count: weeksAgo }); // Use translation for weeks
  }
};
