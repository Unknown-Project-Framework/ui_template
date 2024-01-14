fx_version 'cerulean'
game 'gta5'

name "Characters"
description "Characters Script"
author "unknown"
version "0.0.1"

shared_scripts {
	'shared/*.lua'
}

client_scripts {
	'client/*.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'server/*.lua'
}

ui_page 'html/dist/index.html'
files {
	'html/dist/*.html',
	'html/dist/*.*',
	'html/dist/assets/*.js',
	'html/dist/assets/*.css',
}
