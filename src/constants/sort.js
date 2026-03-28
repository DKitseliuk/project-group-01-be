const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
};

const DEFAULT_SORT_ORDER = SORT_ORDERS.DESC;

const LOCATION_SORT_FIELDS = {
  name: 'name',
  rate: 'rate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

const DEFAULT_LOCATION_SORT_FIELD = LOCATION_SORT_FIELDS.createdAt;

export {
  SORT_ORDERS,
  DEFAULT_SORT_ORDER,
  LOCATION_SORT_FIELDS,
  DEFAULT_LOCATION_SORT_FIELD,
};
