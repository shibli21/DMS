export const getDayName = (day: string) => {
  switch (day) {
    case "1":
      return "saturday";
    case "2":
      return "sunday";
    case "3":
      return "monday";
    case "4":
      return "tuesday";
    case "5":
      return "wednesday";
    case "6":
      return "thursday";
    case "7":
      return "friday";

    default:
      return "unknown";
  }
};
