const fs = require('fs');

const init = () => {
	if (!fs.existsSync('kioku-default.json')) {
		fs.writeFileSync('kioku-default.json', JSON.stringify([]));
	}
};

module.exports = init;