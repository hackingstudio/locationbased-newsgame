module.exports = {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('awesome-typescript-loader'),
                },
            ],
        },
    ]
}