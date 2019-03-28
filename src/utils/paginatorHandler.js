/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
export const paginatorHandler = (items, page, per_page) => {
  const pg = page || 1;

  const perPage = per_page || 10;

  const offset = (pg - 1) * perPage;

  const paginatedItems = items.slice(offset).slice(0, perPage);

  const total_pages = Math.ceil(items.length / perPage);

  return {
    page: pg,
    per_page: perPage,
    pre_page: pg - 1 ? pg - 1 : null,
    next_page: total_pages > pg ? pg + 1 : null,
    count: items.length,
    total_pages,
    results: paginatedItems
  };
};
