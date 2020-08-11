module.exports = {
    module: {
        Loaders:[
            {
              test: /\.(ttf)$/,
              loaders: [
                'url-loader'
              ]
            }
       ]
    }
  };