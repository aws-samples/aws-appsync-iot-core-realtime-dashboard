#!/usr/bin/env bash

if [ "$AWS_EXPORTS" ];
then
    echo $AWS_EXPORTS > ./src/aws-exports.js
fi

if [ "$APP_SETTINGS" ];
then
    echo $APP_SETTINGS > ./src/settings.json
fi

if [ "$APPCENTER_APPSECRET" ];
then
    plutil -replace AppSecret -string $APPCENTER_APPSECRET $APPCENTER_SOURCE_DIRECTORY/mobile/ios/AppCenter-Config.plist
fi
