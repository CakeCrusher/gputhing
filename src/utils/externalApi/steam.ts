// import getAppList_Trie from the json file that does not have an exported member
import appListTrieObj from './getAppList_Trie.json'

const searchAppListTrieObj = (searchStr: string): number | null => {
  const searchStrLength = searchStr.length
  searchStr = searchStr.toLowerCase()
  let currentObj = appListTrieObj as any
  for (let i = 0; i < searchStrLength; i++) {
    const char = searchStr[i]
    if (!currentObj[char]) {
      return null
    }
    currentObj = currentObj[char]
  }
  if (!currentObj.appId) {
    return null
  } else {
    return currentObj.appId
  }
}

export const getGameImage = (name: string): string => {
  // GET https://store.steampowered.com/api/appdetails?appids=<APP_ID> will provide an object that contains object.<APP_id>.data.header_image and object.<APP_id>.data.background_raw
  // GET https://cdn.akamai.steamstatic.com/steam/apps/<APP_ID>/header.jpg will provide the header_image
  // GET https://cdn.akamai.steamstatic.com/steam/apps/<APP_ID>/page.bg.jpg will provide the background_raw
  const appId = searchAppListTrieObj(name)
  if (!appId) {
    return "https://cdn.akamai.steamstatic.com/steam/apps/1091500/page_bg_generated_v6b.jpg"
  }
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/page.bg.jpg`
}