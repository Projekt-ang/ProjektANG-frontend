module.exports = {
    devServer: {
        proxy: 'http://18.195.242.27:8088/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
    } 
}