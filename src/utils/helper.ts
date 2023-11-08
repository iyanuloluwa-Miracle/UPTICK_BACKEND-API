// /utils/helper.ts
export interface PaginationOptions {
  limit: number;
  offset: number;
}

export const getPaginationOptions = (
  page?: number,
  limit?: number,
): PaginationOptions => {
  // Set default values if page or limit are not provided
  const pageNumber = page ? page : 1;
  const limitNumber = limit ? limit : 10;

  // Calculate the offset based on the current page and limit
  const offset = (pageNumber - 1) * limitNumber;

  return {
    limit: limitNumber,
    offset,
  };
};
