const path = require('path');

module.exports = {
    entry: {
        creator: './src/creator.js',
        room: './src/room.js',
        list: './src/list.jsx',
        login: './src/login.jsx',
        signup: './src/signup.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};