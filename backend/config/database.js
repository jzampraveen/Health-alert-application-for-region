if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://nandhu:nandhu123@ds119150.mlab.com:19150/products'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://nandhu:nandhu123@ds119150.mlab.com:19150/products'
    }
}