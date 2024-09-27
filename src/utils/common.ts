import { format } from "date-fns"; // Importing the format function

export const formatDate = (
  dateString: string,
  formatStr = "MMM dd, yyyy HH:mm"
) => {
  return dateString ? format(new Date(dateString), formatStr) : null;
};
