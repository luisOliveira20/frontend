module.exports = {
    restoreMocks: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css/less/scss)$': 'identity-obj-proxy',
    },
    testEnviroment: 'jsdom'
}