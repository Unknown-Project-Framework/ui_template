fx_version 'cerulean'
game 'gta5'

name "template"
description "Template Script"
author "unknown"
version "0.0.1"

shared_scripts {
	'shared/*.lua'
}

client_scripts {
	'client/*.lua'
}

server_scripts {
	'server/*.lua'
}

ui_page 'html/dist/index.html'
files {
	'html/dist/*.html',
	'html/dist/*.js',
	'html/dist/*.css',
}