const {AlertDialog, Button, ui} = require('tabris');

module.exports = () => {
	app.on('backNavigation', (event) => {
		event.preventDefault();
		new AlertDialog({
			message: '한번더 뒤로가기를 누르시면 앱이 종료됩니다.',
			buttons: {ok: 'Acknowledge'}
		}).open();
	});
};