const Requisition = require("./models/Requisition");

async function getRequisitions(query) {
  const { isSorting, searchPhrase, page, limit } = query;
  let index = {};
  let sorting = {};

  if (searchPhrase.length && isSorting === "true") {
    index = { $text: { $search: searchPhrase } };
    sorting = { sort: { name: 1 } };
  } else if (searchPhrase.length) {
    index = { $text: { $search: searchPhrase } };
  } else if (isSorting === "true") {
    sorting = { sort: { name: 1 } };
  }

  return await Requisition.find(index, null, sorting)
    .limit(limit * 1)
    .skip((page - 1) * limit);
}

async function addRequisition(requisition) {
  const { date, name, phone, description } = requisition;

  return await Requisition.create({ date, name, phone, description });
}

async function getRequisitionsCount() {
  return await Requisition.countDocuments();
}

module.exports = {
  getRequisitions,
  addRequisition,
  getRequisitionsCount,
};
