class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const { keyword } = this.queryStr || '';
        const searchQuery = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

        this.query = this.query.find({ ...searchQuery });
        return this;
    }


    filter() {
        // Make a copy of queryStr
        const queryCopy = { ...this.queryStr }; // Change this.queryStr to this.queryParams

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Convert queryCopy to MongoDB query syntax
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        console.log(queryCopy);
        // Parse the modified query string and apply the filter
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }


}

module.exports = APIFeatures;
