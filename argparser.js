// verifies the port number is an integer value
// prior to listening at the port
function verifyPort() {
    if (process.argv.length === 3) {
        const portArg = process.argv[2].trim();
        // strips trailing non-int characters
        const port = parseInt(portArg);
        if (port !== 'NaN') {
            return port;
        }
        else {
            console.error("port argument is not an int value!");
            process.exit(1);
        }
    }
    console.error("Did not receive exactly 3 arguments from the command line");
    process.exit(1);
};

module.exports = verifyPort;