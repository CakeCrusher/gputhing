// import getAppList_Trie from the json file that does not have an exported member
// import appListTrieObj from './getAppList_Trie.json'
import axios from "axios"

const getAppId = async (gameName: string): Promise<number | null> => {
  const response = await axios.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
  const appList = response.data.applist.apps
  const game = appList.find((app: any) => app.name.toLowerCase() === gameName.toLowerCase())
  if (!game) {
    return null
  }
  return game.appid
}

// const searchAppListTrieObj = (searchStr: string): number | null => {
//   const searchStrLength = searchStr.length
//   searchStr = searchStr.toLowerCase()
//   let currentObj = appListTrieObj as any
//   for (let i = 0; i < searchStrLength; i++) {
//     const char = searchStr[i]
//     if (!currentObj[char]) {
//       return null
//     }
//     currentObj = currentObj[char]
//   }
//   if (!currentObj.appId) {
//     return null
//   } else {
//     return currentObj.appId
//   }
// }

export const getGameImage = async (name: string): Promise<string> => {
  // GET https://store.steampowered.com/api/appdetails?appids=<APP_ID> will provide an object that contains object.<APP_id>.data.header_image and object.<APP_id>.data.background_raw
  // GET https://cdn.akamai.steamstatic.com/steam/apps/<APP_ID>/header.jpg will provide the header_image
  // GET https://cdn.akamai.steamstatic.com/steam/apps/<APP_ID>/page.bg.jpg will provide the background_raw
  // const appId = searchAppListTrieObj(name)
  const appId = await getAppId(name)
  if (!appId) {
    return "https://cdn.akamai.steamstatic.com/steam/apps/1091500/page_bg_generated_v6b.jpg"
  }
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/page.bg.jpg`
}