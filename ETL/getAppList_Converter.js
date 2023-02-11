// import getAppList_Raw.json from this folder
const fs = require('fs');
const path = require('path');
const appList = require('./getAppList_Raw.json');

const convertAppListToTrieObj = (appList) => {
  const appListAppsList = appList.applist.apps
  // const appListAppsList = [
  //   {
  //     "appid": 10,
  //     "name": "Counter-Strike"
  //   },
  //   {
  //     "appid": 20,
  //     "name": "Team Fortress Classic"
  //   },
  //   {
  //     "appid": 30,
  //     "name": "Team Fortress 2"
  //   },
  //   {
  //     "appid": 40,
  //     "name": "Team Fortress 2U"
  //   },
  // ]
  const appListTrieObj = {}
  const appListLength = appListAppsList.length
  // create a trie object based on the lowercase characters in the app names
  for (let i = 0; i < appListLength; i++) {
    const appName = appListAppsList[i].name.toLowerCase()
    const appNameLength = appName.length
    let currentObj = appListTrieObj
    // console every 10% of the way through the loop
    if (i % (appListLength / 10) === 0) {
      console.log(`${i / (appListLength / 100)}%`)
    }
    // map out each character in the app name
    for (let j = 0; j < appNameLength; j++) {
      const char = appName[j]
      if (!currentObj[char]) {
        currentObj[char] = {}
      }
      currentObj = currentObj[char]
    }
    currentObj.appId = appListAppsList[i].appid
  }
  return appListTrieObj
}

// write the trie object to a json file called getAppList_Trie.json
const appListTrieObj = convertAppListToTrieObj(appList)

const appListTrieObjString = JSON.stringify(appListTrieObj)

fs.writeFileSync(path.join(__dirname, 'getAppList_Trie.json'), appListTrieObjString)

  