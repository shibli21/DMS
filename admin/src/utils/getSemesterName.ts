export const getSemesterName = (number: number) => {
  switch (number) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    case 5:
      return "5th";
    case 6:
      return "6th";
    case 7:
      return "7th";
    case 8:
      return "8th";

    default:
      return "unknown";
  }
};
