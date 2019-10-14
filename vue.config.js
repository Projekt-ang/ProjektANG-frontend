module.exports = {
    devServer: {
        proxy: 'http://localhost:8088/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
    } 
}