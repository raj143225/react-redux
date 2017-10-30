import webpack  from 'webpack';
import webpackConfig  from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; // This assures the babel dev config(for hot reloading) doesn't apply.

console.log('Generating minified bundle for production via Webpack. This will take a moment' .blue);

webpack(webpackConfig).run((err, stats) => {
    if(err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
        return jsonStats.warnings.map(warning => console.log(warning.red));
    }

    console.log(`webpack stats: ${stats}`);

    //if we got this far, the build succeeded
    console.log('Your app has compiled in production mode and written to /dist. It\'s readt to toll!' .green);

    return 0;
});