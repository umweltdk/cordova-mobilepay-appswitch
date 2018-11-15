PLUGIN_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

clean:
	rm -rf /tmp/testapp

/tmp/testapp:
	cd /tmp && npx cordova create testapp umw.dev testapp

/tmp/testapp/platforms/ios: /tmp/testapp
	cd /tmp/testapp && npx cordova platforms add ios

/tmp/testapp/platforms/android: /tmp/testapp
	cd /tmp/testapp && npx cordova platforms add android

/tmp/testapp/platforms/browser: /tmp/testapp
	cd /tmp/testapp && npx cordova platforms add browser

/tmp/testapp/plugins/cordova-mobilepay-appswitch: www src plugin.xml
	# cd /tmp/testapp && npx cordova plugins remove cordova-mobilepay-appswitch
	cd /tmp/testapp && npx cordova plugins add cordova-mobilepay-appswitch \
		--searchpath $(PLUGIN_DIR) \
		--variable WIDGET_ID=umw.dev \
		--variable URL_SCHEME=umwdev

test: /tmp/testapp/platforms/ios

run-ios: /tmp/testapp/platforms/ios /tmp/testapp/plugins/cordova-mobilepay-appswitch
	cd /tmp/testapp && npx cordova run --browserify ios

run-android: /tmp/testapp/platforms/android /tmp/testapp/plugins/cordova-mobilepay-appswitch
	cd /tmp/testapp && npx cordova run --browserify android

run-browser: /tmp/testapp/platforms/browser /tmp/testapp/plugins/cordova-mobilepay-appswitch
	cd /tmp/testapp && npx cordova run --browserify browser

open-ios:
	open /tmp/testapp/platforms/ios/testapp.xcworkspace

open-android:
	open /tmp/testapp/platforms/ios/testapp.xcworkspace
