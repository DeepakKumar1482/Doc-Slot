module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        plugins: [
            require('flowbite/plugin')
        ],
        content: [
            "./node_modules/flowbite/**/*.js"
        ]
    },
}