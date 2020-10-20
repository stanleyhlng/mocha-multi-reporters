set +x #Don't echo the NPM key

NPMRC_FILE=.npmrc
echo "stanleyhlng:registry=https://registry.npmjs.org/" > $NPMRC_FILE
echo "//registry.npmjs.org/:_authToken=${NPM_KEY}" >> $NPMRC_FILE
echo "//registry.npmjs.org/:username=stanleyhlng" >> $NPMRC_FILE
echo "//registry.npmjs.org/:email=yousafn@gmail.com" >> $NPMRC_FILE
echo "//registry.npmjs.org/:always-auth=true" >> $NPMRC_FILE

set -x
