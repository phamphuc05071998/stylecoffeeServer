class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  exclude() {
    const exclusionFields = ["sort", "limit", "fields", "page"];
    let queryObj = { ...this.queryString };
    exclusionFields.forEach((el) => {
      delete queryObj[el];
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ");
      this.query.sort(sort);
    } else {
      this.query.sort("name");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    if (this.queryString.page) {
      const page = this.queryString.page || 1;
      const limit = this.queryString.limit || 100;
      const skip = (page - 1) * limit;
      this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
module.exports = APIfeature;
